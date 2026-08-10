import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// A real favicon generated from the actual brand logo (assets/Logo.png) —
// rendered at request time via Next's built-in image-generation API rather
// than a hand-drawn stand-in. `contain` (not `cover`) so nothing from the
// source art ever gets clipped — the whole mark is always visible, just
// small, the same tradeoff any detailed logo has at favicon size.
//
// ImageResponse (Satori) can't load a Next-optimized static-import path
// like "/_next/static/media/Logo.xxxx.png" — it needs an absolute URL or a
// data URI. So instead of a static `import logo from "@/assets/Logo.png"`,
// read the source file straight off disk and inline it as a base64 data
// URI at request time.
const logoDataUrl = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "assets", "Logo.png"))
  .toString("base64")}`;

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf8f4",
        }}
      >
        <img
          src={logoDataUrl}
          width={size.width}
          height={size.height}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
