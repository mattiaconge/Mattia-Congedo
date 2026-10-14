import type { CSSProperties, ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
};

export type ImageProps = Props;

export default function Image({ fill, priority, style, ...rest }: Props) {
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : undefined;
  return <img loading={priority ? "eager" : "lazy"} decoding="async" style={{ ...fillStyle, ...style }} {...rest} />;
}
