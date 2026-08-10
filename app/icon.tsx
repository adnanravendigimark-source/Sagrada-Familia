import { ImageResponse } from "next/og";
import logo from "@/assets/Logo.png";

// A real favicon generated from the actual brand logo (assets/Logo.png) —
// rendered at request time via Next's built-in image-generation API rather
// than a hand-drawn stand-in. `contain` (not `cover`) so nothing from the
// source art ever gets clipped — the whole mark is always visible, just
// small, the same tradeoff any detailed logo has at favicon size.
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
          src={logo.src}
          width={size.width}
          height={size.height}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
