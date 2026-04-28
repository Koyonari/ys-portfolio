"use client";

import { useEffect, useRef } from "react";
import type { BlogPost } from "@/types/blog";

interface PatternCanvasProps {
  type: BlogPost["patternType"];
  color: string;
}

export default function PatternCanvas({ type, color }: PatternCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const toRgb = (h: string) => ({
      r: parseInt(h.slice(1, 3), 16),
      g: parseInt(h.slice(3, 5), 16),
      b: parseInt(h.slice(5, 7), 16),
    });
    const { r, g, b } = toRgb(color);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = tRef.current;

      if (type === "grid") {
        const spacing = 28;
        ctx.lineWidth = 0.6;
        for (let x = 0; x <= W; x += spacing) {
          for (let y = 0; y <= H; y += spacing) {
            const dist = Math.sqrt((x - W / 2) ** 2 + (y - H / 2) ** 2);
            const alpha = 0.08 + 0.1 * Math.sin(dist / 25 - t * 0.04);
            ctx.strokeStyle = `rgba(${r},${g},${b},${Math.max(0, alpha)})`;
            ctx.beginPath();
            ctx.arc(x + Math.sin(t * 0.03 + y / 40) * 2, y, 1.2, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      } else if (type === "wave") {
        for (let row = 0; row < 8; row++) {
          ctx.beginPath();
          ctx.lineWidth = 0.8;
          for (let x = 0; x <= W; x += 2) {
            const y =
              (H / 9) * (row + 1) +
              Math.sin((x / W) * Math.PI * 4 + t * 0.05 + row * 0.6) * 14;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.04 + row * 0.015})`;
          ctx.stroke();
        }
      } else if (type === "noise") {
        const size = 5;
        for (let x = 0; x < W; x += size) {
          for (let y = 0; y < H; y += size) {
            const n = Math.sin(x * 0.05 + t * 0.02) * Math.cos(y * 0.05 + t * 0.015);
            const alpha = Math.max(0, n * 0.12);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.fillRect(x, y, size, size);
          }
        }
      } else if (type === "circuit") {
        const nodes: [number, number][] = [];
        for (let i = 0; i < 12; i++) {
          nodes.push([
            (W / 12) * i + W / 24,
            H / 2 + Math.sin(i * 1.3 + t * 0.02) * (H * 0.3),
          ]);
        }
        ctx.lineWidth = 0.7;
        for (let i = 0; i < nodes.length - 1; i++) {
          const [x1, y1] = nodes[i];
          const [x2, y2] = nodes[i + 1];
          const alpha = 0.06 + 0.08 * Math.sin(t * 0.04 + i);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1, y2);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 1.5})`;
          ctx.beginPath();
          ctx.arc(x1, y1, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === "dots") {
        const cols = 18;
        const rows = 6;
        for (let c = 0; c < cols; c++) {
          for (let rw = 0; rw < rows; rw++) {
            const x = (W / cols) * c + W / (cols * 2);
            const y = (H / rows) * rw + H / (rows * 2);
            const pulse = Math.sin(t * 0.06 + c * 0.4 + rw * 0.7);
            const radius = 1.5 + pulse * 1.5;
            const alpha = 0.05 + Math.max(0, pulse) * 0.12;
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, Math.max(0.3, radius), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (type === "lines") {
        const count = 12;
        ctx.lineWidth = 0.6;
        for (let i = 0; i < count; i++) {
          const y = (H / count) * i + (H / count) * 0.5;
          const offset = Math.sin(t * 0.03 + i * 0.5) * 20;
          const alpha = 0.04 + 0.06 * Math.abs(Math.sin(t * 0.025 + i * 0.4));
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(0, y + offset);
          for (let x = 0; x <= W; x += 4) {
            ctx.lineTo(x, y + Math.sin(x / 60 + t * 0.03 + i) * 8 + offset);
          }
          ctx.stroke();
        }
      } else if (type === "helix") {
        ctx.lineWidth = 0.8;
        for (let strand = 0; strand < 2; strand++) {
          ctx.beginPath();
          for (let x = 0; x <= W; x += 2) {
            const phase = strand * Math.PI;
            const y =
              H / 2 +
              Math.sin((x / W) * Math.PI * 6 + t * 0.04 + phase) * (H * 0.35);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(${r},${g},${b},${strand === 0 ? 0.12 : 0.07})`;
          ctx.stroke();
        }
        for (let i = 0; i < 10; i++) {
          const x = (W / 10) * i + W / 20;
          const y1 =
            H / 2 + Math.sin((x / W) * Math.PI * 6 + t * 0.04) * (H * 0.35);
          const y2 =
            H / 2 +
            Math.sin((x / W) * Math.PI * 6 + t * 0.04 + Math.PI) * (H * 0.35);
          ctx.strokeStyle = `rgba(${r},${g},${b},0.05)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }
      } else if (type === "morse") {
        const rows = 5;
        const dashW = 16;
        const dotR = 3;
        const gap = 8;
        const patterns = [
          [1, 0, 1, 1, 1, 0, 1],
          [1, 1, 1, 0, 1, 1, 1],
          [1, 0, 1, 0, 1, 1, 1, 0, 1],
          [1, 1, 1, 0, 1, 0, 1, 1, 1],
          [1, 0, 0, 1, 1, 1, 0, 1],
        ];
        for (let rw = 0; rw < rows; rw++) {
          const y = (H / rows) * rw + H / (rows * 2);
          const pat = patterns[rw % patterns.length];
          let x = 12;
          const rowOffset = Math.sin(t * 0.02 + rw * 1.1) * 10;
          for (let pi = 0; pi < pat.length; pi++) {
            const alpha = 0.07 + 0.1 * Math.abs(Math.sin(t * 0.04 + pi + rw));
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            if (pat[pi] === 1) {
              const w = pat[pi + 1] === 1 ? dashW : dotR * 2;
              if (w === dotR * 2) {
                ctx.beginPath();
                ctx.arc(x + dotR + rowOffset, y, dotR, 0, Math.PI * 2);
                ctx.fill();
                x += dotR * 2 + gap;
              } else {
                ctx.fillRect(x + rowOffset, y - 1.5, dashW, 3);
                x += dashW + gap;
                pi++;
              }
            } else {
              x += gap * 2;
            }
          }
        }
      }

      tRef.current += 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [type, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
