import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useSpring } from "framer-motion";
import NeuralField from "./components/NeuralField";
import CodeCard from "./components/CodeCard";
import CommandPalette from "./components/CommandPalette";
import {
  profile, stats, interests, projects,
  experience, education, service, skills,
} from "./data";

const SECTIONS = [
  ["about", "About"],
  ["research", "Research"],
  ["work", "Work"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];

export default function App() {
  const [theme, setTheme] = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState("");
  const active = useActiveSection(SECTIONS.map(([id]) => id));
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const notify = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }, []);

  const copyEmail = useCallback(async () => {
    try { await navigator.clipboard.writeText(profile.email); notify("Email copied to clipboard"); }
    catch { window.location.href = `mailto:${profile.email}`; }
  }, [notify]);

  const actions = useMemo(() => [
    ...SECTIONS.map(([id, label]) => ({
      icon: "#", label: `Go to ${label}`, hint: id,
      run: () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    })),
    { icon: "↗", label: "Open résumé (PDF)", hint: "cv", run: () => window.open(profile.links.resume, "_blank") },
    { icon: "@", label: "Copy email address", hint: profile.email, run: copyEmail },
    { icon: "↗", label: "Open GitHub", hint: "github", run: () => window.open(profile.links.github, "_blank") },
    { icon: "↗", label: "Open LinkedIn", hint: "linkedin", run: () => window.open(profile.links.linkedin, "_blank") },
    { icon: "◐", label: "Toggle light / dark theme", hint: "theme", run: () => setTheme(theme === "dark" ? "light" : "dark") },
  ], [copyEmail, setTheme, theme]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <Nav active={active} theme={theme} setTheme={setTheme} openPalette={() => setPaletteOpen(true)} />
      <main id="main">
        <Hero copyEmail={copyEmail} />
        <Stats />
        <About />
        <Research />
        <Work />
        <Experience />
        <Contact copyEmail={copyEmail} />
      </main>
      <Footer openPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} actions={actions} />
      <div className={`toast ${toast ? "is-on" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}

/* ---------------- hooks ---------------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme") || "dark"; } catch { return "dark"; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
  }, [theme]);
  return [theme, setTheme];
}

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

/* ---------------- layout pieces ---------------- */

function Nav({ active, theme, setTheme, openPalette }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a href="#top" className="brand mono" aria-label="Back to top">
          nabin<span className="accent">.</span>adhikari
        </a>
        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Sections">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "is-active" : ""} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav__tools">
          <button className="kbd-btn" onClick={openPalette} aria-label="Open command palette">
            <span className="mono">{isMac ? "⌘" : "Ctrl"} K</span>
          </button>
          <button
            className="icon-btn" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="icon-btn nav__menu" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className="burger" data-open={open} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Section({ id, index, title, kicker, children }) {
  return (
    <section id={id} className="section wrap">
      <motion.header
        className="section__head"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
      >
        <span className="section__index mono">{index}</span>
        <h2>{title}</h2>
        {kicker && <p className="section__kicker">{kicker}</p>}
      </motion.header>
      {children}
    </section>
  );
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

/* ---------------- sections ---------------- */

function Hero({ copyEmail }) {
  return (
    <section id="top" className="hero">
      <NeuralField />
      <div className="hero__fade" />
      <div className="wrap hero__inner">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mono">
            <span className="pulse" /> {profile.available}
          </p>
          <h1>
            Nabin <em>Adhikari</em>
          </h1>
          <p className="hero__role mono">
            {profile.role} <span className="muted">@</span> {profile.affiliation}
          </p>
          <p className="hero__tagline">{profile.tagline}</p>
          <div className="hero__cta">
            <a className="btn btn--primary" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              Résumé <ArrowIcon />
            </a>
            <a className="btn" href="#work">Selected work</a>
            <div className="socials">
              <a className="icon-btn" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
              <a className="icon-btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
              <button className="icon-btn" onClick={copyEmail} aria-label="Copy email address"><MailIcon /></button>
            </div>
          </div>
          <p className="hero__hint muted mono">
            tip: move your cursor — the field <em>attends</em> to it · press <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>
            <kbd>K</kbd> to navigate
          </p>
        </motion.div>

        <motion.div
          className="hero__side"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="portrait">
            <img src="/Nabin_Adhikari.webp" alt="Portrait of Nabin Adhikari" width="320" height="320" />
            <span className="portrait__tag mono">Blacksburg, VA</span>
          </div>
          <CodeCard />
        </motion.div>
      </div>
    </section>
  );
}

function Counter({ value, decimals = 0, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{prefix}{v.toFixed(decimals)}{suffix}</span>;
}

function Stats() {
  return (
    <div className="wrap">
      <ul className="stats">
        {stats.map((s) => (
          <li key={s.label}>
            <b className="mono"><Counter {...s} /></b>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="about">
        <motion.div {...reveal} className="about__text">
          {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
        </motion.div>
        <motion.aside {...reveal} className="about__edu">
          <h3 className="mono label">education</h3>
          <ol className="edu">
            {education.map((e) => (
              <li key={e.degree}>
                <span className="mono muted">{e.period}</span>
                <b>{e.degree}</b>
                <span>{e.school}</span>
                <small className="muted">{e.note}</small>
              </li>
            ))}
          </ol>
        </motion.aside>
      </div>
    </Section>
  );
}

function Research() {
  return (
    <Section
      id="research" index="02" title="Research interests"
      kicker="I work on making learning systems robust, efficient and useful outside the lab."
    >
      <div className="interests">
        {interests.map((it, k) => (
          <motion.article key={it.id} {...reveal} transition={{ delay: k * 0.06 }} className="interest">
            <span className="mono interest__id">{it.id}</span>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
            <div className="tags">{it.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Pipeline({ steps }) {
  return (
    <div className="pipeline mono" aria-label={`Pipeline: ${steps.join(" to ")}`}>
      {steps.map((s, i) => (
        <span key={s} className="pipeline__step">
          <span className="pipeline__node">{s}</span>
          {i < steps.length - 1 && <span className="pipeline__edge" />}
        </span>
      ))}
    </div>
  );
}

function Work() {
  const featured = projects.filter((p) => p.metric);
  const rest = projects.filter((p) => !p.metric);
  return (
    <Section id="work" index="03" title="Selected work" kicker="Research code and systems I've designed, trained and shipped.">
      <div className="featured">
        {featured.map((p) => (
          <motion.a key={p.title} {...reveal} href={p.link} target="_blank" rel="noopener noreferrer" className="feature">
            <div className="feature__top mono">
              <span className="tag tag--accent">{p.kind}</span>
              <span className="muted">{p.year}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            {p.pipeline && <Pipeline steps={p.pipeline} />}
            <div className="feature__metric">
              <b className="mono">{p.metric.value}</b>
              <span>{p.metric.label}</span>
            </div>
            <div className="tags">{p.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            <span className="feature__go mono">view code <ArrowIcon /></span>
          </motion.a>
        ))}
      </div>
      <div className="projects">
        {rest.map((p, k) => (
          <motion.a key={p.title} {...reveal} transition={{ delay: k * 0.05 }} href={p.link} target="_blank" rel="noopener noreferrer" className="project">
            <div className="project__top mono">
              <span>{p.kind}</span><span className="muted">{p.year}</span>
            </div>
            <h3>{p.title} <ArrowIcon /></h3>
            <p>{p.summary}</p>
            <div className="tags">{p.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" index="04" title="Experience" kicker="From founding companies to teaching graduate ML.">
      <ol className="timeline">
        {experience.map((e) => (
          <motion.li key={e.role + e.org} {...reveal}>
            <span className="timeline__dot" />
            <div className="timeline__when mono muted">{e.period}</div>
            <div className="timeline__body">
              <h3>{e.role}</h3>
              <p className="timeline__org">{e.org} <span className="muted">· {e.place}</span></p>
              <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="split">
        <motion.div {...reveal}>
          <h3 className="mono label">teaching · service</h3>
          <ul className="service">
            {service.map((s) => (
              <li key={s.what}><b>{s.what}</b><span className="muted">{s.where}</span></li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...reveal}>
          <h3 className="mono label">toolbox</h3>
          <div className="skills">
            {skills.map((g) => (
              <div key={g.group}>
                <span className="skills__group mono muted">{g.group}</span>
                <div className="tags">{g.items.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Contact({ copyEmail }) {
  return (
    <section id="contact" className="section wrap contact">
      <motion.div {...reveal}>
        <span className="section__index mono">05</span>
        <h2 className="contact__title">Let's build something <em>robust</em>.</h2>
        <p className="contact__text">
          I'm happy to talk about research collaborations, internships, trustworthy ML, or anything you saw here.
        </p>
        <div className="contact__row">
          <button className="btn btn--primary btn--lg mono" onClick={copyEmail}>
            {profile.email} <CopyIcon />
          </button>
          <a className="btn btn--lg" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a>
          <a className="btn btn--lg" href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon /></a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer({ openPalette }) {
  return (
    <footer className="footer wrap mono">
      <span>© {new Date().getFullYear()} Nabin Adhikari</span>
      <span className="muted">Hand-built with React, Vite &amp; a canvas. No templates.</span>
      <button className="link" onClick={openPalette}>{isMac ? "⌘" : "Ctrl"}K</button>
    </footer>
  );
}

/* ---------------- icons ---------------- */

const I = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p} />;
const ArrowIcon = () => <I width="14" height="14"><path d="M7 17 17 7M8 7h9v9" /></I>;
const MailIcon = () => <I><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></I>;
const CopyIcon = () => <I width="16" height="16"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></I>;
const SunIcon = () => <I><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></I>;
const MoonIcon = () => <I><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></I>;
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.95c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4z" />
  </svg>
);
