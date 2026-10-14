// Router minimale basato su hash (#/percorso?query) per l'anteprima in file singolo.
import { useSyncExternalStore } from "react";

export interface Route {
  path: string;
  query: URLSearchParams;
  key: string;
}

const parse = (hash: string): Route => {
  const raw = hash.replace(/^#/, "") || "/";
  const [pathPart, queryPart = ""] = raw.split("?");
  const path = pathPart.length > 1 ? pathPart.replace(/\/$/, "") : "/";
  return { path, query: new URLSearchParams(queryPart), key: raw };
};

let current = parse(typeof window === "undefined" ? "" : window.location.hash);
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

if (typeof window !== "undefined") {
  window.addEventListener("hashchange", () => {
    const next = parse(window.location.hash);
    if (next.key !== current.key) {
      current = next;
      emit();
      window.scrollTo({ top: 0 });
    }
  });
}

const scrollToFragment = (fragment: string | undefined, toTop: boolean) => {
  // attende il render della nuova pagina
  setTimeout(() => {
    const el = fragment ? document.getElementById(fragment) : null;
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else if (toTop) window.scrollTo({ top: 0 });
  }, 60);
};

export function navigate(href: string, opts: { replace?: boolean; scroll?: boolean } = {}) {
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    window.open(href, "_blank");
    return;
  }
  const [target, fragment] = href.split("#");
  const next = parse("#" + (target || "/"));
  const changed = next.key !== current.key;
  if (changed) {
    current = next;
    emit();
    try {
      if (opts.replace) window.history.replaceState(null, "", "#" + next.key);
      else window.location.hash = next.key;
    } catch {
      // alcuni visualizzatori (iframe sandbox) non permettono di cambiare l'URL: si ignora
    }
  }
  scrollToFragment(fragment, changed && opts.scroll !== false);
}

export const hrefFor = (href: string) => (/^(https?:|mailto:|tel:)/.test(href) ? href : "#" + href.split("#")[0]);

export function useRoute() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => current,
  );
}
