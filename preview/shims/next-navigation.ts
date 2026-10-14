import { navigate, useRoute } from "../router";

export const useRouter = () => ({
  push: (href: string, opts?: { scroll?: boolean }) => navigate(href, opts),
  replace: (href: string, opts?: { scroll?: boolean }) => navigate(href, { ...opts, replace: true }),
  back: () => window.history.back(),
});

export const useSearchParams = () => useRoute().query;
export const usePathname = () => useRoute().path;

export function notFound(): never {
  throw new Error("NOT_FOUND");
}
