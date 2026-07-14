import { ImageResponse } from "next/og";
import { SITE } from "@/constants/content";

export const alt = `${SITE.name} · Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(at 80% 20%, rgba(2,87,122,0.6) 0%, rgba(0,0,0,0) 70%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#94a3b8", letterSpacing: 6, textTransform: "uppercase" }}>
          Portfolio
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, marginTop: 16, color: "#89d6fb" }}>
          {SITE.name}
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 20, color: "#02a9f7" }}>
          Full Stack · AI · Quantitative Finance
        </div>
        <div style={{ display: "flex", fontSize: 24, marginTop: 48, color: "#64748b" }}>
          {SITE.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
