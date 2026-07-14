import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          background: "#000",
          color: "#02a9f7",
          fontSize: 20,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        D
      </div>
    ),
    { ...size },
  );
}
