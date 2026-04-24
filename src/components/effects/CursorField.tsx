"use client";

import { useEffect, useRef } from "react";

type Mode =
  | "constellation"
  | "ripples"
  | "gridwarp"
  | "magnetic"
  | "halftone"
  | "topo"
  | "crosshatch";

interface Props {
  mode?: Mode;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Dot {
  x: number;
  y: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  life: number;
}

export function CursorField({ mode = "constellation" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<Mode>(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    let INK: [number, number, number] = [46, 42, 38];
    let ACC: [number, number, number] = [206, 140, 70];
    let BG: [number, number, number] = [245, 240, 232];

    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const parse = (v: string): [number, number, number] | null => {
        const m = v.trim().match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
        return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : null;
      };
      const ink = parse(cs.getPropertyValue("--rgb-ink"));
      const acc = parse(cs.getPropertyValue("--rgb-accent"));
      const bg = parse(cs.getPropertyValue("--rgb-bg"));
      if (ink) INK = ink;
      if (acc) ACC = acc;
      if (bg) BG = bg;
    };

    const mouse = { x: -9999, y: -9999, ex: -9999, ey: -9999, active: false };
    const started = performance.now();
    let lastT = 0;
    let raf = 0;

    let nodes: Node[] = [];
    let dots: Dot[] = [];
    let ripples: Ripple[] = [];
    let magPoints: Dot[] = [];
    let htDots: Dot[] = [];
    let lastRippleT = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      initMode();
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      const t = "touches" in e ? e.touches[0] : (e as MouseEvent);
      mouse.x = t.clientX;
      mouse.y = t.clientY;
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
    };

    const initConstellation = () => {
      const count = Math.max(80, Math.min(220, Math.floor(W * H * 0.00011)));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: 0.7 + Math.random() * 0.9,
        });
      }
    };

    const initRipples = () => {
      dots = [];
      const S = 28;
      const cols = Math.ceil(W / S) + 2;
      const rows = Math.ceil(H / S) + 2;
      const ox = (W - (cols - 1) * S) / 2;
      const oy = (H - (rows - 1) * S) / 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          dots.push({ x: ox + i * S, y: oy + j * S });
        }
      }
      ripples = [];
    };

    const initMagnetic = () => {
      magPoints = [];
      const S = 38;
      const cols = Math.ceil(W / S) + 1;
      const rows = Math.ceil(H / S) + 1;
      const ox = (W - (cols - 1) * S) / 2;
      const oy = (H - (rows - 1) * S) / 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          magPoints.push({ x: ox + i * S, y: oy + j * S });
        }
      }
    };

    const initHalftone = () => {
      htDots = [];
      const S = 22;
      const cols = Math.ceil(W / S) + 2;
      const rows = Math.ceil(H / S) + 2;
      const ox = (W - (cols - 1) * S) / 2;
      const oy = (H - (rows - 1) * S) / 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          htDots.push({ x: ox + i * S, y: oy + j * S });
        }
      }
    };

    const initMode = () => {
      readPalette();
      const m = modeRef.current;
      if (m === "constellation") initConstellation();
      else if (m === "ripples") initRipples();
      else if (m === "magnetic") initMagnetic();
      else if (m === "halftone") initHalftone();
    };

    const mix = (tint: number) => {
      const R = Math.round(INK[0] + (ACC[0] - INK[0]) * tint);
      const G = Math.round(INK[1] + (ACC[1] - INK[1]) * tint);
      const B = Math.round(INK[2] + (ACC[2] - INK[2]) * tint);
      return { R, G, B };
    };

    const drawConstellation = (elapsed: number) => {
      const CR = 240;
      const LR = 130;
      if (mouse.active) {
        const R = 320;
        const g = ctx.createRadialGradient(
          mouse.ex,
          mouse.ey,
          0,
          mouse.ex,
          mouse.ey,
          R,
        );
        g.addColorStop(0, `rgba(${ACC[0]},${ACC[1]},${ACC[2]},0.08)`);
        g.addColorStop(1, `rgba(${ACC[0]},${ACC[1]},${ACC[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(mouse.ex - R, mouse.ey - R, R * 2, R * 2);
      }
      for (const n of nodes) {
        const ang =
          Math.sin(n.x * 0.0022 + elapsed * 0.18) +
          Math.cos(n.y * 0.0024 + elapsed * 0.22);
        n.vx += Math.cos(ang) * 0.006;
        n.vy += Math.sin(ang) * 0.006;
        if (mouse.active) {
          const dx = mouse.ex - n.x;
          const dy = mouse.ey - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CR * CR) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / CR;
            n.vx += (dx / d) * f * f * 0.5;
            n.vy += (dy / d) * f * f * 0.5;
          }
        }
        n.vx *= 0.94;
        n.vy *= 0.94;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LR * LR) {
            const d = Math.sqrt(d2);
            let alpha = (1 - d / LR) * 0.1;
            let tint = 0;
            if (mouse.active) {
              const mx = (a.x + b.x) * 0.5 - mouse.ex;
              const my = (a.y + b.y) * 0.5 - mouse.ey;
              const md2 = mx * mx + my * my;
              if (md2 < CR * CR) {
                const f = 1 - Math.sqrt(md2) / CR;
                alpha += f * f * 0.5;
                tint = f * f;
              }
            }
            if (alpha < 0.02) continue;
            const { R, G, B } = mix(tint);
            ctx.strokeStyle = `rgba(${R},${G},${B},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        let tint = 0;
        let boost = 0;
        if (mouse.active) {
          const d2 = (n.x - mouse.ex) ** 2 + (n.y - mouse.ey) ** 2;
          if (d2 < CR * CR) {
            const f = 1 - Math.sqrt(d2) / CR;
            tint = f * f;
            boost = 1.2 * f * f;
          }
        }
        const { R, G, B } = mix(tint);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + boost, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},${0.35 + 0.5 * tint})`;
        ctx.fill();
      }
    };

    const drawRipples = (t: number) => {
      if (mouse.active && t - lastRippleT > 650) {
        ripples.push({ x: mouse.ex, y: mouse.ey, r: 0, life: 1 });
        lastRippleT = t;
      }
      for (const r of ripples) {
        r.r += 1.3;
        r.life = Math.max(0, r.life - 0.0045);
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (ripples[i].life <= 0) ripples.splice(i, 1);
      }

      for (const d of dots) {
        let tint = 0;
        let alpha = 0.28;
        let sz = 1.0;
        for (const rp of ripples) {
          const dd = Math.hypot(d.x - rp.x, d.y - rp.y);
          const band = Math.exp(-Math.pow((dd - rp.r) / 22, 2));
          if (band > 0.01) {
            tint = Math.max(tint, band * rp.life);
            alpha += band * rp.life * 0.6;
            sz += band * rp.life * 1.2;
          }
        }
        if (mouse.active) {
          const dd = Math.hypot(d.x - mouse.ex, d.y - mouse.ey);
          if (dd < 160) {
            const f = 1 - dd / 160;
            alpha += f * f * 0.3;
            tint = Math.max(tint, f * 0.4);
          }
        }
        const { R, G, B } = mix(tint);
        ctx.beginPath();
        ctx.arc(d.x, d.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},${Math.min(1, alpha)})`;
        ctx.fill();
      }

      for (const rp of ripples) {
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACC[0]},${ACC[1]},${ACC[2]},${0.2 * rp.life})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const drawGridWarp = (elapsed: number) => {
      const S = 44;
      const cols = Math.ceil(W / S) + 2;
      const rows = Math.ceil(H / S) + 2;
      const ox = -S;
      const oy = -S;
      ctx.lineWidth = 1;
      for (let j = 0; j < rows; j++) {
        const y0 = oy + j * S;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 8) {
          let yy = y0;
          if (mouse.active) {
            const dx = x - mouse.ex;
            const dy = y0 - mouse.ey;
            const d = Math.hypot(dx, dy);
            if (d < 260) {
              const f = 1 - d / 260;
              yy += (-dy / (d || 1)) * f * f * 30;
            }
          }
          yy += Math.sin(x * 0.008 + elapsed * 0.4 + j * 0.2) * 1.2;
          if (x === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        let alpha = 0.1;
        let tint = 0;
        if (mouse.active) {
          const dy = Math.abs(y0 - mouse.ey);
          if (dy < 200) {
            const f = 1 - dy / 200;
            alpha += f * f * 0.35;
            tint = f * f;
          }
        }
        const { R, G, B } = mix(tint);
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha})`;
        ctx.stroke();
      }
      for (let i = 0; i < cols; i++) {
        const x0 = ox + i * S;
        ctx.beginPath();
        for (let y = 0; y <= H; y += 8) {
          let xx = x0;
          if (mouse.active) {
            const dx = x0 - mouse.ex;
            const dy = y - mouse.ey;
            const d = Math.hypot(dx, dy);
            if (d < 260) {
              const f = 1 - d / 260;
              xx += (-dx / (d || 1)) * f * f * 30;
            }
          }
          xx += Math.cos(y * 0.008 + elapsed * 0.35 + i * 0.2) * 1.2;
          if (y === 0) ctx.moveTo(xx, y);
          else ctx.lineTo(xx, y);
        }
        let alpha = 0.1;
        let tint = 0;
        if (mouse.active) {
          const dx = Math.abs(x0 - mouse.ex);
          if (dx < 200) {
            const f = 1 - dx / 200;
            alpha += f * f * 0.35;
            tint = f * f;
          }
        }
        const { R, G, B } = mix(tint);
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha})`;
        ctx.stroke();
      }
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (t - lastT) / 1000 || 0.016);
      lastT = t;
      const elapsed = (t - started) / 1000;
      if (mouse.active) {
        const k = 1 - Math.pow(0.001, dt);
        mouse.ex =
          mouse.ex === -9999 ? mouse.x : mouse.ex + (mouse.x - mouse.ex) * k;
        mouse.ey =
          mouse.ey === -9999 ? mouse.y : mouse.ey + (mouse.y - mouse.ey) * k;
      }

      ctx.clearRect(0, 0, W, H);
      // keep BG used (suppress unused var)
      void BG;

      const m = modeRef.current;
      if (m === "constellation") drawConstellation(elapsed);
      else if (m === "ripples") drawRipples(t);
      else if (m === "gridwarp") drawGridWarp(elapsed);
      else if (m === "magnetic" || m === "halftone") {
        // simplified fallbacks — render as constellation if needed
        drawConstellation(elapsed);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return <canvas id="cursor-field" ref={canvasRef} />;
}
