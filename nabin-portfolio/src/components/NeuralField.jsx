import { useEffect, useRef } from "react";

/**
 * A drifting point cloud drawn on <canvas>. Nearby points link like a sparse
 * graph; points near the cursor "attend" to it — lines are weighted by a
 * softmax-ish falloff over distance. Pauses when off-screen, static under
 * prefers-reduced-motion.
 */
export default function NeuralField({ density = 0.00009 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    let pts = [];
    const mouse = { x: -1e4, y: -1e4, active: false };
    let colors = readColors();

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      return {
        dot: cs.getPropertyValue("--field-dot").trim() || "rgba(255,255,255,.5)",
        line: cs.getPropertyValue("--field-line").trim() || "255,255,255",
        accent: cs.getPropertyValue("--accent-rgb").trim() || "124,242,196",
      };
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(28, Math.min(140, Math.round(w * h * density)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    }

    const LINK = 120, ATTN = 190;

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
      }
      // sparse links
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const t = 1 - Math.sqrt(d2) / LINK;
            ctx.strokeStyle = `rgba(${colors.line},${t * 0.18})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // attention to cursor
      if (mouse.active) {
        const scored = [];
        let z = 0;
        for (const p of pts) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < ATTN) { const s = Math.exp(-d / 60); scored.push([p, s]); z += s; }
        }
        for (const [p, s] of scored) {
          const wgt = s / (z || 1);
          ctx.strokeStyle = `rgba(${colors.accent},${Math.min(0.85, 0.15 + wgt * 2)})`;
          ctx.lineWidth = 0.6 + wgt * 3;
          ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(p.x, p.y); ctx.stroke();
          p.hot = wgt;
        }
        ctx.fillStyle = `rgba(${colors.accent},0.9)`;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2); ctx.fill();
      }
      for (const p of pts) {
        ctx.fillStyle = p.hot ? `rgba(${colors.accent},${0.5 + p.hot})` : colors.dot;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + (p.hot ? 1.2 : 0), 0, Math.PI * 2); ctx.fill();
        p.hot = 0;
      }
      if (!reduce && visible) raf = requestAnimationFrame(frame);
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      mouse.active = mouse.y >= 0 && mouse.y <= r.height;
      if (reduce) frame();
    }
    function onLeave() { mouse.active = false; }

    const io = new IntersectionObserver(([en]) => {
      const was = visible;
      visible = en.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    const mo = new MutationObserver(() => { colors = readColors(); if (reduce) frame(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const ro = new ResizeObserver(() => { resize(); if (reduce) frame(); });
    ro.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); mo.disconnect(); ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [density]);

  return <canvas ref={ref} className="neural-field" aria-hidden="true" />;
}
