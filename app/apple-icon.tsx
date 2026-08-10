import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// iOS home-screen icon — same real-logo approach as app/icon.tsx, just at
// Apple's expected size with no transparency (iOS ignores/blackens alpha).
// Same base64 data-URI approach as app/icon.tsx — Satori can't resolve a
// Next-optimized static-import path at request time.
const logoDataUrl = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "assets", "Logo.png"))
  .toString("base64")}`;

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          style={{ width: "82%", height: "82%", objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
