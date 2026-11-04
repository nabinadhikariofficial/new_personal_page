// All site content lives here. Edit this file to update the page.

export const profile = {
  name: "Nabin Adhikari",
  role: "Ph.D. Student · Computer Science",
  affiliation: "Virginia Tech",
  location: "Blacksburg, VA",
  email: "nabinadhikari@vt.edu",
  github: "nabinadhikariofficial",
  links: {
    github: "https://github.com/nabinadhikariofficial",
    linkedin: "https://www.linkedin.com/in/nabinadhikariofficial/",
    resume: "/Nabin_Adhikari_Resume.pdf",
    cv: "/CV_Nabin_Adhikari_One_Page.pdf",
  },
  tagline:
    "I build machine-learning systems that hold up under pressure — LLMs that harden themselves against attack, vision models that read the planet from LiDAR, and the engineering that gets them out of the notebook.",
  bio: [
    "I'm a Ph.D. student in the Department of Computer Science at Virginia Tech (starting Spring 2027), after an M.S. in Computer Engineering at VT. I work where trustworthy machine learning meets real systems. My recent work closes the loop between red-teaming and defense for large language models, and uses geospatial deep learning to correct national-scale tree-canopy maps.",
    "Before research, I co-founded Laxmi Soft and shipped enterprise software used by 50+ hotels and major schools in Nepal, and was the founding engineer at BuildSupply, an MIT-funded startup. That background is why I care about ML that is measurable, reproducible, and deployable — not just state-of-the-art on a leaderboard.",
  ],
  available: "Open to research collaborations & internships",
};

export const stats = [
  { value: 22, prefix: "−", suffix: "%", label: "Unseen prompt-attack exposure" },
  { value: 0.686, decimals: 3, prefix: "R² ", label: "Tree-canopy correction" },
  { value: 270, suffix: "+", label: "AI-assisted patent briefs" },
  { value: 50, suffix: "+", label: "Hotels on software I built" },
];

export const interests = [
  {
    id: "01",
    title: "Trustworthy ML & LLM Security",
    body: "Adversarial robustness, jailbreak and prompt-injection defense, and self-improving guardrails that adapt to attacks they have never seen.",
    tags: ["red-teaming", "LoRA", "DeBERTa guards"],
  },
  {
    id: "02",
    title: "Foundation Models & Agents",
    body: "Efficient fine-tuning, inference with vLLM and llama.cpp, and agentic systems built on LangGraph and AutoGen — with evaluation as a first-class citizen.",
    tags: ["PEFT", "vLLM", "agents", "evals"],
  },
  {
    id: "03",
    title: "Geospatial & Scientific Deep Learning",
    body: "Earth-observation models that fuse raster, LiDAR and environmental data, using geospatial foundation models like Prithvi ViT.",
    tags: ["U-Net", "Prithvi ViT", "LiDAR"],
  },
  {
    id: "04",
    title: "Multimodal & Generative Models",
    body: "Learning jointly from video, audio and text, and diffusion-style generative models built from first principles.",
    tags: ["BERT", "ResNet", "self-attention"],
  },
];

export const projects = [
  {
    title: "Autonomous Hardening of LLM Defenses via Adversarial Feedback",
    year: "2025",
    kind: "Trustworthy ML",
    summary:
      "A closed-loop system where an attacker LLM continuously probes a target, a DeBERTa-based detector flags successful attacks, and LoRA updates patch the defense in near real time.",
    metric: { value: "≈22%", label: "less exposure to unseen prompt attacks" },
    stack: ["PyTorch", "HF Transformers", "PEFT / LoRA", "Llama 3.1 8B/70B", "DeBERTa", "W&B", "NVIDIA H200"],
    link: "https://github.com/nabinadhikariofficial/TML_LLM_Defense_via_Feedback",
    pipeline: ["attack", "detect", "patch", "re-eval"],
  },
  {
    title: "Temporal Tree Canopy Correction with Geospatial Deep Learning",
    year: "2026",
    kind: "Geospatial DL",
    summary:
      "A spatial deep-learning pipeline that corrects 30 m tree-canopy estimates by fusing environmental rasters with LiDAR, beating Random Forest and the NLCD baseline.",
    metric: { value: "0.686 R²", label: "25.76 RMSE vs. NLCD baseline" },
    stack: ["PyTorch", "U-Net", "Prithvi ViT", "LiDAR", "Raster processing"],
    link: "https://github.com/nabinadhikariofficial/tree_canopy_project",
    pipeline: ["raster", "LiDAR", "U-Net", "canopy %"],
  },
  {
    title: "Time-Aware U-Net Image Generator",
    year: "2025",
    kind: "Generative",
    summary:
      "A diffusion-style generator written from scratch: a time-conditioned U-Net with ResNet blocks and self-attention, trained on Oxford-IIIT Pets.",
    stack: ["TensorFlow", "Keras", "Self-attention", "Oxford-IIIT Pet"],
    link: "https://github.com/nabinadhikariofficial/Image-Generator-project",
  },
  {
    title: "Multimodal Emotion Classification",
    year: "2025",
    kind: "Multimodal",
    summary:
      "Emotion recognition that fuses video, audio and transcript signals using pre-trained BERT and ResNet encoders.",
    stack: ["PyTorch", "BERT", "ResNet", "Late fusion"],
    link: "https://github.com/nabinadhikariofficial/emotion-recognition-project",
  },
  {
    title: "Face-Recognition Attendance System",
    year: "2022",
    kind: "Computer Vision",
    summary:
      "End-to-end automated attendance: RetinaFace detection, FaceNet embeddings, a Flask backend and a NoSQL store.",
    stack: ["RetinaFace", "FaceNet", "Flask", "NoSQL"],
    link: "https://github.com/nabinadhikariofficial/Automated-Face-Recognition-Based-Attendance-System",
  },
  {
    title: "YouTube Video Q&A Chrome Extension",
    year: "2024",
    kind: "LLM Apps",
    summary:
      "A Chrome extension that lets you chat with any YouTube video, backed by a Flask service and Gemini for real-time answers.",
    stack: ["Chrome Extensions", "Flask", "Gemini", "JavaScript"],
    link: "https://github.com/nabinadhikariofficial/Chrome_Extension_Youtube_VIDEO_Q-A",
  },
];

export const experience = [
  {
    role: "AI for Technology Licensing & Discovery Intern",
    org: "Virginia Tech — Office of Research & Innovation",
    place: "Blacksburg, VA",
    period: "Mar 2025 – Aug 2026",
    points: [
      "Produced 270+ AI-assisted patent marketing briefs supporting filing, licensing and commercialization.",
      "Improved the Tech Publisher platform with AI models and patent-intelligence tooling to streamline workflows.",
    ],
  },
  {
    role: "Graduate Teaching Assistant",
    org: "Virginia Tech — Bradley Dept. of ECE",
    place: "Blacksburg, VA",
    period: "2025 – present",
    points: [
      "Applications of Machine Learning (ECE 5464) and Introduction to Software Design.",
      "Labs, office hours and project mentoring for graduate and undergraduate students.",
    ],
  },
  {
    role: "Software Engineering Intern",
    org: "Virginia Tech — Vet Med Research & Graduate Studies",
    place: "Blacksburg, VA",
    period: "May 2025 – Aug 2025",
    points: [
      "Built automated PDF-formatting tools and enhanced departmental web pages.",
      "Owned CMS validation, content updates and internal web development.",
    ],
  },
  {
    role: "Co-founder & CEO",
    org: "Laxmi Soft Pvt. Ltd.",
    place: "Kathmandu, Nepal",
    period: "Sep 2022 – present (academic leave)",
    points: [
      "Launched Laxminn, a hotel-management system running at 50+ hotels, and SchoolsIE, adopted by a major school in Nepal.",
      "Led AI-driven product design, hiring and company strategy.",
    ],
  },
  {
    role: "Founding Software Engineer",
    org: "BuildSupply (MIT-funded)",
    place: "Boston, MA",
    period: "Aug 2022 – May 2023",
    points: [
      "Designed and built the core AI-powered e-commerce platform end-to-end — backend services, databases and APIs.",
      "Integrated ML for supplier discovery and pricing optimization.",
    ],
  },
];

export const education = [
  {
    degree: "Ph.D., Computer Science",
    school: "Virginia Tech — Department of Computer Science",
    period: "Starting Spring 2027",
    note: "Research in trustworthy ML, foundation models and geospatial deep learning.",
  },
  {
    degree: "M.S., Computer Engineering",
    school: "Virginia Tech",
    period: "Jan 2025 – Dec 2026",
    note: "Advanced ML, Foundation Models to AI Agents, Deep Learning, Trustworthy ML, Algorithms for Big Data, Nonlinearity & Predictability.",
  },
];

export const service = [
  { what: "Review Committee, LAUNCH Proof-of-Concept Grant", where: "Virginia Tech · $50k translational research fund" },
  { what: "Course Instructor — Data Science & ML in Python", where: "Deerwalk Institute of Technology" },
  { what: "Invited Speaker — “AI and Blockchain”", where: "Esatya" },
  { what: "President, CS Club", where: "Led workshops, events and student initiatives" },
  { what: "10+ certifications in AI, ML, DL & applied math", where: "MIT · Harvard · Coursera" },
];

export const skills = [
  { group: "Deep learning", items: ["PyTorch", "TensorFlow", "CUDA", "Hugging Face", "PEFT / LoRA", "scikit-learn", "OpenCV"] },
  { group: "LLMs & agents", items: ["vLLM", "llama.cpp", "LangChain", "LangGraph", "AutoGen", "LlamaIndex"] },
  { group: "Languages", items: ["Python", "C", "C++", "JavaScript", "Java", "SQL", "Solidity"] },
  { group: "MLOps & infra", items: ["Docker", "Kubernetes", "AWS", "MLflow", "Airflow", "GitHub Actions", "W&B", "FastAPI"] },
];
