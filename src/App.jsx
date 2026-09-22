import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Code2, Github, Terminal, Shield, Cpu, Sparkles, ExternalLink, MessageCircle } from "lucide-react";

const projects = [
  { n:"01", title:"Lumen", type:"منصة أتمتة وتوليد", text:"منصة متكاملة لإنشاء واستضافة بوتات تيليجرام من داخل المحادثة. يفهم Lumen متطلبات المستخدم بالعربية أو الإنجليزية، ثم يحولها إلى مشروع برمجي حقيقي داخل بيئة معزولة. يعتمد على وكيل برمجي متعدد الأدوات يمر بمراحل التخطيط والتنفيذ والمراجعة والإصلاح، مع نظام موحد لاختيار نماذج الذكاء الاصطناعي، جلسات مدعومة بـ Redis، متابعة مباشرة لتقدم البناء، واختبارات تشغيل قبل تسليم المشروع. كما يدعم الاستضافة المستمرة عبر Lumen Pro، وإدارة الاستخدام والفوترة وواجهة API مخصصة للأعمال.", tags:["Python","Telegram","وكلاء AI","Redis","API","Docker"], href:"https://t.me/lum9n_ai_bot" }
];

const stack = ["JavaScript","TypeScript","Node.js","Python","Discord.js","Git","Linux","APIs","Automation","Cybersecurity"];

function ScrollRevealText({ children, className = "", start = 0.92, end = 0.38 }) {
  const text = String(children);
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isArabic = /[\u0600-\u06FF]/.test(text);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;

      // The reveal follows the user's scroll continuously:
      // starts as the block enters the lower part of the viewport,
      // and finishes as the block moves toward the upper/middle area.
      const startY = viewport * start;
      const endY = viewport * end;
      const distance = Math.max(320, startY - endY);
      const raw = (startY - rect.top) / distance;
      const next = Math.max(0, Math.min(1, raw));

      setProgress(prev => Math.abs(prev - next) > 0.001 ? next : prev);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [start, end]);

  const clip = isArabic
    ? `inset(0 0 0 ${Math.round((1 - progress) * 100)}%)`
    : `inset(0 ${Math.round((1 - progress) * 100)}% 0 0)`;

  return (
    <span
      ref={ref}
      className={`scroll-reveal ${className}`}
      dir={isArabic ? "rtl" : "ltr"}
      style={{ clipPath: clip, WebkitClipPath: clip }}
      aria-label={text}
    >
      {text}
    </span>
  );
}

function App() {
  const [time, setTime] = useState(new Date());
  const [intro, setIntro] = useState(true);
  const [introLetters, setIntroLetters] = useState(0);
  const [nameStyle, setNameStyle] = useState(0);
  useEffect(() => {
    const revealEls = document.querySelectorAll(".section, .red-break, .skill-matrix");
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
    const onMove = (e) => {
      const portrait = document.querySelector(".hero-portrait");
      if (!portrait || window.matchMedia("(max-width: 850px)").matches) return;
      const x = (e.clientX / window.innerWidth - .5) * 10;
      const y = (e.clientY / window.innerHeight - .5) * 8;
      portrait.style.setProperty("--mx", `${x}px`); portrait.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("pointermove", onMove); };
  }, []);
  useEffect(() => {
    const id=setInterval(()=>setTime(new Date()),1000);
    const nameId=setInterval(()=>setNameStyle(v => (v + 1) % 6),2600);
    const sequence=[];
    for(let i=1;i<=5;i++) sequence.push(setTimeout(()=>setIntroLetters(i),260+(i-1)*300));
    for(let i=4;i>=0;i--) sequence.push(setTimeout(()=>setIntroLetters(i),2140+(4-i)*270));
    const reveal=setTimeout(()=>setIntro(false),3600);
    document.body.classList.add("intro-lock");
    const unlock=setTimeout(()=>document.body.classList.remove("intro-lock"),3450);

    return()=>{clearInterval(id);clearInterval(nameId);sequence.forEach(clearTimeout);clearTimeout(reveal);clearTimeout(unlock);document.body.classList.remove("intro-lock");};
  }, []);

  return <main className={intro ? "site intro-active" : "site"}>
    <div className={intro ? "intro-screen" : "intro-screen intro-screen-out"} aria-hidden="true"><div className="intro-name">{[..."HATEM"].slice(0, introLetters).map((letter, i) => <span key={letter + i}>{letter}</span>)}</div></div>
    <div className="noise" /><div className="scroll-progress" aria-hidden="true"><i/></div>
    <nav>
      <a className="brand" href="#top"><span>H</span>ATEM<span className="dot">.</span></a>
      <div className="navlinks"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div>
    </nav>

    <section id="top" className="hero">
      <div className="hero-grid"/>
      <div className="hero-copy">
        <h1><ScrollRevealText>I build things</ScrollRevealText><br/><em><ScrollRevealText>that feel alive.</ScrollRevealText></em></h1>
        <p className="lead"><ScrollRevealText className="hero-name-mark">Hatem Mokhtar</ScrollRevealText><span className="hero-name-sep"> — </span><ScrollRevealText>a developer focused on bots, software engineering and the craft of turning ambitious ideas into real systems.</ScrollRevealText></p>
        <div className="actions"><a className="primary" href="#work">Explore my work <ArrowUpRight size={17}/></a><a className="secondary whatsapp-handle" href="https://wa.me/h_a_t_e_m_7" aria-label="WhatsApp @h_a_t_e_m_7"><MessageCircle size={17}/> @h_a_t_e_m_7</a></div><div className="hero-tags"><span><ScrollRevealText>BOTS</ScrollRevealText></span><span><ScrollRevealText>SOFTWARE</ScrollRevealText></span><span><ScrollRevealText>SECURITY</ScrollRevealText></span></div><div className="hero-coordinates"><ScrollRevealText>29.98° N / 31.13° E</ScrollRevealText> <span>—</span> <ScrollRevealText>BUILD MODE</ScrollRevealText></div>
      </div>
      <div className="hero-portrait" data-depth>
        <div className="portrait-frame"><img src="/hatem-face.webp" alt="Hatem visual portrait" /></div>
      </div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="core"><Code2 size={38}/><span>BUILD</span></div><span className="float f1">JS</span><span className="float f2">NODE</span><span className="float f3">SEC</span></div>
      <div className="scroll">SCROLL TO DISCOVER <span>↓</span></div>
    </section>

    <section id="work" className="projects-section">
      <div className="projects-heading">
        <div>
          <span className="section-kicker">SELECTED WORK / 01</span>
          <h2><ScrollRevealText>المشاريع</ScrollRevealText><span>.</span></h2>
        </div>
        <p><ScrollRevealText start={0.90} end={0.32}>أفكار تتحول إلى أنظمة حقيقية — من البوتات والأتمتة إلى البرمجيات والهندسة الأمنية.</ScrollRevealText></p>
      </div>
      <div className="project-list">
        {projects.map((project) => {
          return (
            <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.n}>
              <span className="project-number">{project.n}</span>
              <div className="project-main">
                <span className="project-type"><ScrollRevealText>{project.type}</ScrollRevealText></span>
                <h3><ScrollRevealText>{project.title}</ScrollRevealText><ArrowUpRight size={22}/></h3>
                <p><ScrollRevealText start={0.86} end={0.30}>{project.text}</ScrollRevealText></p>
                <div className="project-tags">{project.tags.map(tag => <span key={tag}><ScrollRevealText>{tag}</ScrollRevealText></span>)}</div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  </main>
}

export default App;
