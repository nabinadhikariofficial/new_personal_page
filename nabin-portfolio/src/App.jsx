import { motion } from "framer-motion";

/* =========================
   MAIN APP
========================= */
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SEO />
      <NavBar />
      <Hero />
      <Education />
      <Experience />
      <Company />
      <Projects />
      {/* <Publications />
      <Certifications />
      <Teaching />
      <Leadership />
      <Skills /> */}
      <Footer />
    </div>
  );
}

/* =========================
   SEO
========================= */
function SEO() {
  return (
    <>
      <title>Nabin Adhikari | Machine Learning Engineer</title>
      <meta
        name="description"
        content="Machine Learning Engineer, Researcher, and Founder specializing in LLM security, multimodal AI, computer vision, and production ML systems."
      />
      <meta
        name="keywords"
        content="Machine Learning Engineer, Data Scientist, LLMs, Multimodal AI, Virginia Tech, PyTorch, TensorFlow"
      />
    </>
  );
}

/* =========================
   NAVBAR
========================= */
function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-slate-900">
          Nabin Adhikari
        </span>
        <span className="text-sm text-slate-500">
          Blacksburg, VA · United States
        </span>
      </div>
    </nav>
  );
}

/* =========================
   HERO
========================= */

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-6xl mx-auto px-6 pt-36 pb-28"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-extrabold mb-6 text-slate-900">
            Nabin Adhikari
          </h1>
          <p className="text-lg text-slate-600 max-w-xl">
            Machine Learning Engineer, Researcher, and Founder.
            Graduate Teaching Assistant at Virginia Tech
            with hands-on experience building real-world AI systems
            across LLM security, multimodal learning, computer vision,
            and MLOps.
          </p>

          <div className="flex gap-4 mt-8 items-center">
            {/* GitHub Icon */}
            <a
              href="https://github.com/nabinadhikariofficial"
              target="_blank"
              className="p-1"
              aria-label="GitHub"
            >
              <svg
                className="w-5 h-5 text-gray-800 hover:text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.58 0-.287-.011-1.244-.016-2.253-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.304-5.467-1.334-5.467-5.933 0-1.31.468-2.381 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.323 3.3 1.23a11.51 11.51 0 013.003-.404c1.018.004 2.043.138 3.003.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.653.244 2.873.12 3.176.77.841 1.234 1.912 1.234 3.222 0 4.61-2.807 5.625-5.479 5.922.43.371.814 1.102.814 2.222 0 1.605-.014 2.898-.014 3.293 0 .321.218.696.825.578C20.565 21.796 24 17.303 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/nabinadhikariofficial/"
              target="_blank"
              className="p-1"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5 text-blue-700 hover:text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.983 3.5C3.343 3.5 2 4.843 2 6.483c0 1.641 1.343 2.983 2.983 2.983 1.642 0 2.983-1.342 2.983-2.983C7.966 4.843 6.625 3.5 4.983 3.5zM2.4 21h5.166V9.75H2.4V21zM9.583 9.75V21h5.166v-5.75c0-3.166 3.833-3.417 3.833 0V21h5.166v-6.5c0-6.167-6.5-5.933-7.833-2.9V9.75H9.583z" />
              </svg>
            </a>

            {/* Email Icon */}
            <a
              href="mailto:nabinadhikari@vt.edu"
              className="p-1"
              aria-label="Email"
            >
              <svg
                className="w-5 h-5 text-red-600 hover:text-red-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12.713l11.985-9.713H0L12 12.713zm0 2.574L0 5.715V20h24V5.715l-12 9.572z" />
              </svg>
            </a>

            {/* View CV Button */}
            <a
              href="/CV_Nabin_Adhikari_One_Page.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
            >
              View CV
            </a>
          </div>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="flex justify-center">
          <img src="/Nabin_Adhikari.png" className="w-60 h-60 rounded-full object-cover" /> 
          </div> 
          </div> 
          </motion.section> );
}



/* =========================
   SECTION WRAPPER
========================= */
function Section({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto px-6 py-6"
    >
      <h2 className="text-3xl font-bold mb-8 text-slate-900">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

/* =========================
   EDUCATION
========================= */
function Education() {
  return (
    <Section title="Education">
      <Card title="Virginia Tech — M.S. in Computer Engineering">
        Relevant Coursework: Advanced Machine Learning, Introduction
        to Deep Learning, Trustworthy Machine Learning, Algorithms for
        Big Data, Nonlinearity & Predictability.
      </Card>
    </Section>
  );
}

/* =========================
   EXPERIENCE
========================= */
function Experience() {
  return (
    <Section title="Experience">
      <Grid>
        <Card title="Graduate Teaching Assistant — Virginia Tech">
          Teaching assistant for Applications of Machine Learning
          (ECE 5464). Supporting instruction, mentoring, and applied
          ML research.
        </Card>

        <Card title="AI Intern — VT Office of Research & Innovation">
          Created 180+ AI-assisted patent marketing briefs and
          improved AI-driven technology commercialization workflows.
        </Card>

        <Card title="Software Engineering Intern — VT Vet Med">
          Developed automated PDF tools, improved CMS workflows,
          and supported internal web systems.
        </Card>
      </Grid>
    </Section>
  );
}

/* =========================
   COMPANY
========================= */
function Company() {
  return (
    <Section title="Startup & Industry Impact">
      <Grid>
        <Card title="Co-founder & CEO — Laxmi Soft Pvt. Ltd.">
          Founded AI-driven enterprise software company. Built
          Laxminn (hotel management system serving 50+ hotels) and
          SchoolsIE (school management platform adopted by major
          institutions in Nepal).
        </Card>

        <Card title="Founding Software Engineer — BuildSupply (MIT Funded)">
          Designed and built AI-powered e-commerce platform end-to-end,
          including scalable backend services, APIs, databases, and
          ML-driven supplier discovery and pricing optimization.
        </Card>
      </Grid>
    </Section>
  );
}

/* =========================
   PROJECTS
========================= */
function Projects() {
  return (
    <Section title="Projects">
      <Grid>
        <Project
          title="Autonomous LLM Defense via Adversarial Feedback"
          link="https://github.com/nabinadhikariofficial/TML_LLM_Defense_via_Feedback"
        >
          Closed-loop adversarial system to detect and patch LLM
          vulnerabilities in real time, reducing unseen prompt
          attacks by ~22%.
        </Project>

        <Project
          title="Multimodal Emotion Classification"
          link="https://github.com/nabinadhikariofficial/emotion-recognition-project"
        >
          Emotion recognition system combining video, audio, and
          text using BERT and ResNet.
        </Project>

        <Project
          title="Time-Aware U-Net Image Generator"
          link="https://github.com/nabinadhikariofficial/Image-Generator-project"
        >
          Custom U-Net with ResNet blocks and self-attention trained
          on the Oxford-IIIT Pet dataset.
        </Project>

        <Project
          title="Face Recognition Attendance System"
          link="https://github.com/nabinadhikariofficial/Automated-Face-Recognition-Based-Attendance-System"
        >
          RetinaFace + FaceNet based automated attendance system
          with Flask backend and NoSQL database.
        </Project>
      </Grid>
    </Section>
  );
}

/* =========================
   PUBLICATIONS
========================= */
function Publications() {
  return (
    <Section title="Publications">
      <ul className="list-disc pl-6 text-slate-600 space-y-3">
        <li>
          Over Speed Surveillance System Using Deep Learning and
          Distributed Systems — Journal of Engineering (Under Review)
        </li>
        <li>
          Towards Energy Equity: Technological Interventions for
          Reliable Electricity in the Himalayas — Next Energy
          (Under Review)
        </li>
      </ul>
    </Section>
  );
}

/* =========================
   CERTIFICATIONS
========================= */
function Certifications() {
  return (
    <Section title="Certifications">
      <p className="text-slate-600">
        Completed 10+ certifications in AI, Machine Learning,
        Deep Learning, and Applied Mathematics
        (MIT, Harvard, Coursera).
      </p>
    </Section>
  );
}

/* =========================
   TEACHING
========================= */
function Teaching() {
  return (
    <Section title="Teaching & Speaking">
      <ul className="list-disc pl-6 text-slate-600 space-y-3">
        <li>
          Course Instructor: Data Science and Machine Learning
          in Python — Deerwalk Institute of Technology
        </li>
        <li>Speaker on AI and Blockchain — Esatya</li>
      </ul>
    </Section>
  );
}

/* =========================
   LEADERSHIP
========================= */
function Leadership() {
  return (
    <Section title="Leadership & Achievements">
      <ul className="list-disc pl-6 text-slate-600 space-y-3">
        <li>President, CS Club — Led technical events and workshops</li>
        <li>Winner, DeerHack National Hackathon</li>
        <li>2nd Runner-up, Line Tracking Robot Competition</li>
      </ul>
    </Section>
  );
}

/* =========================
   SKILLS
========================= */
function Skills() {
  return (
    <Section title="Technical Skills">
      <Card>
        <strong>Languages:</strong> Python, C/C++, Java, JavaScript,
        SQL, NoSQL
        <br />
        <strong>Frameworks:</strong> PyTorch, TensorFlow, Keras,
        Hugging Face, Scikit-learn, FastAPI, Flask
        <br />
        <strong>Tools:</strong> Docker, Kubernetes, AWS, MLflow,
        Airflow, Git, Streamlit
      </Card>
    </Section>
  );
}

/* =========================
   UI HELPERS
========================= */
function Grid({ children }) {
  return <div className="grid md:grid-cols-2 gap-6">{children}</div>;
}

function Card({ title, children }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      {title && (
        <h3 className="font-semibold text-xl mb-3 text-slate-900">
          {title}
        </h3>
      )}
      <p className="text-slate-600">{children}</p>
    </motion.div>
  );
}

function Project({ title, link, children }) {
  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      href={link}
      target="_blank"
      className="block bg-white p-6 rounded-xl shadow-sm"
    >
      <h3 className="font-semibold text-xl mb-2 text-slate-900">
        {title}
      </h3>
      <p className="text-slate-600">{children}</p>
    </motion.a>
  );
}

/* =========================
   FOOTER
========================= */
function Footer() {
  return (
    <footer className="text-center text-slate-500 py-12">
      © 2026 Nabin Adhikari · Machine Learning Engineer · Built for
      real-world impact
    </footer>
  );
}
