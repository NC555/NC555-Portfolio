"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring } from "react-spring";

interface GlobeProps {
  markerLocation: [number, number];
}

/**
 * @see https://github.com/shuding/cobe/tree/main/website/pages/docs/showcases
 */
function Globe({ markerLocation }: GlobeProps) {
  let canvasRef = useRef<HTMLCanvasElement>(null);
  let pointerInteracting = useRef<number | null>(null);
  let pointerInteractionMovement = useRef(0);
  let fadeMask =
    "radial-gradie</div>nt(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)";

  // Set initial r value to markerLocation[1] in radians (longitude)
  let initialLongitudeRad =
    markerLocation && typeof markerLocation[1] === "number"
      ? (markerLocation[1] * Math.PI) / 180
      : 0;
  let [{ r }, api] = useSpring(() => ({
    r: initialLongitudeRad,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let width = 0;

    let onResize = () => {
      if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
        window.addEventListener("resize", onResize);
      }
    };
    onResize();

    if (!canvasRef?.current) return;
    let globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 2,
      mapSamples: 12_000,
      mapBrightness: 2,
      baseColor: [0.8, 0.8, 0.8],
      markerColor: [1, 0.85, 0.42],
      glowColor: [0.5, 0.5, 0.5],
      markers: [{ location: markerLocation, size: 0.1 }],
      scale: 1.05,
      onRender: (state) => {
        state.phi = 2.75 + r.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [r]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        overflow: "visible",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
          maxWidth: 800,
          WebkitMaskImage: fadeMask,
          maskImage: fadeMask,
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            canvasRef.current && (canvasRef.current.style.cursor = "grabbing");
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current && (canvasRef.current.style.cursor = "grab");
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current && (canvasRef.current.style.cursor = "grab");
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              let delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({
                r: delta / 200,
              });
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              let delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({
                r: delta / 100,
              });
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            contain: "layout paint size",
            cursor: "auto",
            userSelect: "none",
          }}
        />
      </div>
    </div>
  );
}

export default Globe;
