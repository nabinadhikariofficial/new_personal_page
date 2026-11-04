import { useEffect, useMemo, useState } from "react";

const SOURCE = `from research import Researcher

class Nabin(Researcher):
    focus = ["trustworthy ML", "LLM security",
             "foundation models", "geospatial DL"]
    stack = ["PyTorch", "CUDA", "vLLM", "HF"]

    def step(self, idea: str) -> Paper:
        model = self.build(idea)     # write it
        model.fit(gpus="H200")       # train it
        assert self.attack(model)    # break it
        return self.ship(model)      # ship it`;

const KW = new Set(["from", "import", "class", "def", "return", "assert", "self"]);

// Tiny Python highlighter: good enough for a hero card, no dependencies.
function tokenize(src) {
  const re = /(#[^\n]*)|("[^"]*")|(\b\d+\b)|(\b[A-Za-z_]\w*\b)|(\s+)|([^\w\s])/g;
  const out = [];
  let m, prev = "";
  while ((m = re.exec(src))) {
    const [t, com, str, num, word] = m;
    let c = "";
    if (com) c = "tk-com";
    else if (str) c = "tk-str";
    else if (num) c = "tk-num";
    else if (word) {
      if (KW.has(word)) c = "tk-kw";
      else if (prev === "class" || prev === "def") c = "tk-fn";
      else if (/^[A-Z]/.test(word)) c = "tk-cls";
      prev = word;
    }
    out.push([c, t]);
  }
  return out;
}

export default function CodeCard() {
  const tokens = useMemo(() => tokenize(SOURCE), []);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [n, setN] = useState(reduce ? SOURCE.length : 0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setN(Math.min(i, SOURCE.length));
      if (i >= SOURCE.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [reduce]);

  let left = n;
  const shown = [];
  for (const [c, t] of tokens) {
    if (left <= 0) break;
    const s = t.slice(0, left);
    left -= s.length;
    shown.push(<span key={shown.length} className={c}>{s}</span>);
  }

  return (
    <div className="code-card" aria-label="Code snippet describing Nabin's research loop">
      <div className="code-card__bar">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="code-card__file">nabin.py</span>
      </div>
      <pre aria-hidden="true">
        <code>
          {shown}
          <span className="caret" />
        </code>
      </pre>
    </div>
  );
}
