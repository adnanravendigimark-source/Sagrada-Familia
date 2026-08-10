import { ImageResponse } from "next/og";
import logo from "@/assets/Logo.png";

// iOS home-screen icon — same real-logo approach as app/icon.tsx, just at
// Apple's expected size with no transparency (iOS ignores/blackens alpha).
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
          src={logo.src}
          width={size.width}
          height={size.height}
          style={{ width: "82%", height: "82%", objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
