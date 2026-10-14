import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { hrefFor, navigate } from "../router";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | { pathname?: string };
  children?: ReactNode;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
};

export default function Link({ href, onClick, prefetch: _p, scroll, replace, children, ...rest }: Props) {
  const to = typeof href === "string" ? href : href.pathname ?? "/";
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    navigate(to, { replace, scroll });
  };
  return (
    <a href={hrefFor(to)} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
