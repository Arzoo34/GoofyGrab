import { ImageResponse } from "next/og";

export const alt = "Goofygrab — grab the signal. leave the noise.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0F",
          color: "#F7F7F4",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#B8FF00",
          }}
        >
          Independent tech press
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            Goofy<span style={{ color: "#B8FF00" }}>grab</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#8A8A92" }}>
            Grab the signal. Leave the noise.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
