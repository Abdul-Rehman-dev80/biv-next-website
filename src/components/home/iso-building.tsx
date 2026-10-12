import type { CSSProperties } from "react";

/*
 * An isometric strata building drawn from simple boxes. Floors sit apart when
 * the scene's --t is 0 and settle into place as it reaches 1.
 */

const C = Math.cos(Math.PI / 6);
const A = 150; // width along x
const B = 100; // depth along y
const H = 24; // floor height
const FLOORS = 7;
const GAP = 22; // extra spacing per floor when exploded

type P3 = [number, number, number];
const iso = ([x, y, z]: P3) => `${((x - y) * C).toFixed(1)},${((x + y) / 2 - z).toFixed(1)}`;
const poly = (pts: P3[]) => pts.map(iso).join(" ");

/** A window on the left (y = B) face, spanning x0..x1 and z0..z1. */
const leftWindow = (x0: number, x1: number, z0: number, z1: number) =>
  poly([
    [x0, B, z0],
    [x1, B, z0],
    [x1, B, z1],
    [x0, B, z1],
  ]);

/** A window on the right (x = A) face, spanning y0..y1 and z0..z1. */
const rightWindow = (y0: number, y1: number, z0: number, z1: number) =>
  poly([
    [A, y0, z0],
    [A, y1, z0],
    [A, y1, z1],
    [A, y0, z1],
  ]);

function Floor({ index }: { index: number }) {
  const ground = index === 0;
  const z = index * H;
  const top = z + H;
  const offset = index - (FLOORS - 1) / 2;
  const leftBays = 5;
  const rightBays = 3;
  return (
    <g
      style={
        {
          transform: `translate3d(0, calc((1 - var(--t)) * ${(-offset * GAP).toFixed(1)}px), 0)`,
          opacity: "calc(0.35 + var(--t) * 0.65)",
        } as CSSProperties
      }
    >
      <polygon points={poly([[0, B, z], [A, B, z], [A, B, top], [0, B, top]])} fill="#c3cbe0" />
      <polygon points={poly([[A, 0, z], [A, B, z], [A, B, top], [A, 0, top]])} fill="#8e9bbf" />
      <polygon points={poly([[0, 0, top], [A, 0, top], [A, B, top], [0, B, top]])} fill="#eef1fa" />
      {Array.from({ length: leftBays }, (_, i) => {
        const w = A / leftBays;
        return (
          <polygon
            key={`l${i}`}
            points={leftWindow(i * w + 5, (i + 1) * w - 5, z + (ground ? 2 : 6), top - 4)}
            fill={ground ? "#6d85cc" : "#27335c"}
            opacity={ground ? 0.85 : 1}
          />
        );
      })}
      {Array.from({ length: rightBays }, (_, i) => {
        const w = B / rightBays;
        return (
          <polygon
            key={`r${i}`}
            points={rightWindow(i * w + 5, (i + 1) * w - 5, z + (ground ? 2 : 6), top - 4)}
            fill={ground ? "#4f69b8" : "#1b2548"}
            opacity={ground ? 0.85 : 1}
          />
        );
      })}
      {!ground && (
        <polyline
          points={poly([
            [0, B + 6, z + 2],
            [A + 6, B + 6, z + 2],
            [A + 6, 0, z + 2],
          ])}
          fill="none"
          stroke="#eef1fa"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
}

/** The BIV diamonds laid flat on the roof. */
function RoofMark({ z }: { z: number }) {
  const cx = A / 2;
  const cy = B / 2;
  const d = 11;
  const gems: Array<[number, number, string]> = [
    [cx - d * 1.1, cy - d * 1.1, "#3f56a2"],
    [cx - d * 1.1, cy + d * 1.1, "#599b51"],
    [cx + d * 1.1, cy - d * 1.1, "#e7c733"],
    [cx + d * 1.1, cy + d * 1.1, "#cc222e"],
  ];
  return (
    <g>
      {gems.map(([x, y, fill]) => (
        <polygon
          key={fill}
          points={poly([
            [x - d, y, z],
            [x, y - d, z],
            [x + d, y, z],
            [x, y + d, z],
          ])}
          fill={fill}
        />
      ))}
    </g>
  );
}

export function IsoBuilding({ className }: { className?: string }) {
  const roofZ = FLOORS * H;
  const spread = ((FLOORS - 1) / 2) * GAP;
  const minX = -B * C - 8;
  const maxX = (A + 6) * C + 8;
  const minY = -roofZ - 6 - spread - 10;
  const maxY = (A + B + 12) / 2 + spread + 10;
  return (
    <svg
      viewBox={`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <ellipse cx={((A - B) / 2) * C} cy={(A + B) / 2 - 4} rx={(A + B) * 0.55} ry={(A + B) * 0.16} fill="#000" opacity="0.35" />
      {Array.from({ length: FLOORS }, (_, i) => (
        <Floor key={i} index={i} />
      ))}
      <g
        style={
          {
            transform: `translate3d(0, calc((1 - var(--t)) * ${(-(FLOORS / 2) * GAP - 30).toFixed(1)}px), 0)`,
            opacity: "var(--t)",
          } as CSSProperties
        }
      >
        <polygon points={poly([[-4, B + 4, roofZ], [A + 4, B + 4, roofZ], [A + 4, B + 4, roofZ + 6], [-4, B + 4, roofZ + 6]])} fill="#dde3f4" />
        <polygon points={poly([[A + 4, -4, roofZ], [A + 4, B + 4, roofZ], [A + 4, B + 4, roofZ + 6], [A + 4, -4, roofZ + 6]])} fill="#93a6dc" />
        <polygon points={poly([[-4, -4, roofZ + 6], [A + 4, -4, roofZ + 6], [A + 4, B + 4, roofZ + 6], [-4, B + 4, roofZ + 6]])} fill="#f5f6fa" />
        <RoofMark z={roofZ + 6} />
      </g>
    </svg>
  );
}
