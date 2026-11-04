import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** ⌘K / Ctrl+K command palette with fuzzy filtering and keyboard navigation. */
export default function CommandPalette({ open, setOpen, actions }) {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !open && !/input|textarea/i.test(e.target.tagName)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          {/* Mounted only while open, so query/selection reset on every open. */}
          <PaletteBody close={() => setOpen(false)} actions={actions} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PaletteBody({ close, actions }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef(null);

  useEffect(() => { input.current?.focus(); }, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return actions;
    // subsequence match, ranked by how compact the match is
    return actions
      .map((a) => {
        const hay = (a.label + " " + (a.hint || "")).toLowerCase();
        let pos = -1, start = -1;
        for (const ch of s) {
          pos = hay.indexOf(ch, pos + 1);
          if (pos < 0) return null;
          if (start < 0) start = pos;
        }
        return [a, pos - start + start * 0.1];
      })
      .filter(Boolean)
      .sort((x, y) => x[1] - y[1])
      .map(([a]) => a);
  }, [q, actions]);

  const run = (a) => { close(); setTimeout(() => a.run(), 0); };

  const onKeyDown = (e) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(v + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); }
    else if (e.key === "Enter" && results[i]) run(results[i]);
  };

  return (
    <motion.div
      className="palette" role="dialog" aria-modal="true" aria-label="Command palette"
      initial={{ y: -12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -12, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="palette__input">
        <span className="mono muted">›</span>
        <input
          ref={input} value={q} placeholder="Jump to a section, open the CV, copy email…"
          onChange={(e) => { setQ(e.target.value); setI(0); }} onKeyDown={onKeyDown}
          aria-label="Search commands"
        />
        <kbd>esc</kbd>
      </div>
      <ul className="palette__list" role="listbox">
        {results.length === 0 && <li className="palette__empty">No matches.</li>}
        {results.map((a, k) => (
          <li
            key={a.label} role="option" aria-selected={k === i}
            className={k === i ? "is-active" : ""}
            onMouseEnter={() => setI(k)} onClick={() => run(a)}
          >
            <span className="palette__icon mono">{a.icon}</span>
            <span>{a.label}</span>
            {a.hint && <span className="palette__hint mono">{a.hint}</span>}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
