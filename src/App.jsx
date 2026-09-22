import React, { useEffect, useState } from "react";
import { ArrowUpRight, Code2, Github, Terminal, Shield, Cpu, Sparkles, ExternalLink } from "lucide-react";

const projects = [
  { n:"01", title:"Lumen", type:"Ecosystem / Automation", text:"A large-scale bot ecosystem built around automation, intelligent interactions and a modular architecture.", tags:["Node.js","Bots","Architecture"], href:"https://github.com/atemmokhtar2-blip" },
  { n:"02", title:"Bot Systems", type:"Engineering", text:"Custom bots and backend systems designed to turn repetitive workflows into reliable software.", tags:["JavaScript","APIs","Backend"], href:"https://github.com/atemmokhtar2-blip" },
  { n:"03", title:"Security Lab", type:"Research / Learning", text:"Experiments around application security, defensive engineering and understanding how systems break.", tags:["Security","Linux","Web"], href:"https://github.com/atemmokhtar2-blip" }
];

const stack = ["JavaScript","TypeScript","Node.js","Python","Discord.js","Git","Linux","APIs","Automation","Cybersecurity"];

function App() {
  const [time, setTime] = useState(new Date());
  const [intro, setIntro] = useState(true);
  const [introLetters, setIntroLetters] = useState(0);
  useEffect(() => {
    const revealEls = document.querySelectorAll(".section, .red-break, .skill-matrix, .project");
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
    const sequence=[];
    for(let i=1;i<=5;i++) sequence.push(setTimeout(()=>setIntroLetters(i),260+(i-1)*300));
    for(let i=4;i>=0;i--) sequence.push(setTimeout(()=>setIntroLetters(i),2140+(4-i)*270));
    const reveal=setTimeout(()=>setIntro(false),3600);
    document.body.classList.add("intro-lock");
    const unlock=setTimeout(()=>document.body.classList.remove("intro-lock"),3450);
    return()=>{clearInterval(id);sequence.forEach(clearTimeout);clearTimeout(reveal);clearTimeout(unlock);document.body.classList.remove("intro-lock");};
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
      <div className="hero-portrait" data-depth>
        <div className="portrait-frame"><img src="/hatem-face.webp" alt="Hatem visual portrait" /></div>
        <div className="portrait-name-spin" aria-label="Hatem">Hatem</div>
      </div>
      <div className="hero-copy">
        <h1>I build things<br/><em>that feel alive.</em></h1>
        <p className="lead"><span className="hero-name-mark">Hatem Mokhtar</span><span className="hero-name-sep"> — </span>a developer focused on bots, software engineering and the craft of turning ambitious ideas into real systems.</p>
        <div className="actions"><a className="primary" href="#work">Explore my work <ArrowUpRight size={17}/></a><a className="secondary" href="https://github.com/atemmokhtar2-blip"><Github size={17}/> GitHub</a></div><div className="hero-tags"><span>BOTS</span><span>SOFTWARE</span><span>SECURITY</span></div><div className="hero-coordinates">29.98° N / 31.13° E <span>—</span> BUILD MODE</div>
      </div>
      
      <div className="portrait-name-spin" aria-label="Hatem">Hatem</div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="core"><Code2 size={38}/><span>BUILD</span></div><span className="float f1">JS</span><span className="float f2">NODE</span><span className="float f3">SEC</span></div>
      <div className="scroll">SCROLL TO DISCOVER <span>↓</span></div>
    </section>

    <section className="ticker" aria-label="skills ticker"><div>{stack.concat(stack).map((x,i)=><span key={i}>{x} <b>✦</b></span>)}</div></section><section className="red-break" aria-hidden="true"><div>BUILD SOMETHING <em>THAT SHOULDN’T EXIST.</em></div><span>HM / 002 — SYSTEMS IN MOTION</span></section>

    <section id="about" className="about section">
      <div className="section-label">02 — ABOUT</div>
      <div className="about-grid">
        <div><h2>Not just code.<br/><span>Systems.</span></h2></div>
        <div className="about-text"><p>I’m a developer who likes going deeper than the interface. I care about architecture, automation, performance and the details that make software dependable.</p><p>From Discord bots to larger software ideas, I enjoy taking a blank repository and turning it into something people can actually use.</p><div className="mini-stats"><div><strong>01</strong><span>Mindset<br/>Build from zero</span></div><div><strong>∞</strong><span>Curiosity<br/>Always learning</span></div><div><strong>24/7</strong><span>Ideas<br/>Never offline</span></div></div></div>
      </div>
    </section>

    <section id="work" className="work section">
      <div className="section-head"><div className="section-label">03 — SELECTED WORK</div><span>03 PROJECTS / 2026</span></div><p className="section-intro">Selected systems, experiments and software built around automation, architecture and curiosity.</p>
      <div className="projects">{projects.map(p=><a className="project" href={p.href} target="_blank" rel="noreferrer" key={p.n}><div className="project-top"><span>{p.n}</span><ArrowUpRight size={20}/></div><div><small>{p.type}</small><h3>{p.title}</h3><p>{p.text}</p></div><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></a>)}</div>
    </section>

    <section className="capabilities section"><div className="skill-matrix"><span>TECHNICAL MATRIX / 04</span><div className="matrix-grid"><b>LANGUAGES</b><i>JS <u></u></i><i>PYTHON <u></u></i><i>TS <u></u></i><b>SYSTEMS</b><i>NODE <u></u></i><i>LINUX <u></u></i><i>APIs <u></u></i></div></div>
      <div className="section-label">04 — CAPABILITIES</div>
      <div className="cap-grid">
        <article><Code2/><span>01</span><h3>Software</h3><p>Clean, scalable applications and APIs with a focus on maintainability.</p></article>
        <article><Cpu/><span>02</span><h3>Automation</h3><p>Bots and systems that remove repetitive work and connect services together.</p></article>
        <article><Shield/><span>03</span><h3>Security</h3><p>Security-minded engineering with curiosity for how systems behave under pressure.</p></article>
      </div>
    </section>

    <section id="contact" className="contact section">
      <div className="contact-glow"/><Sparkles className="spark"/>
      <div className="section-label">05 — CONTACT</div>
      <h2>Have an idea?<br/><em>Let’s build it.</em></h2>
      <p>Open to interesting projects, collaborations and conversations about software.</p>
      <a className="primary big" href="https://github.com/atemmokhtar2-blip"><Github size={18}/> Start a conversation <ArrowUpRight size={18}/></a>
    </section>

    <footer><div><b>HATEM.</b><span>Digital Architect</span></div><div className="footer-code">HM / 001<br/>BUILD — SHIP — REPEAT</div><div className="clock">{time.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})} · EGYPT</div><div className="social"><a href="https://github.com/atemmokhtar2-blip"><Github size={17}/></a><a href="#top"><ExternalLink size={17}/></a></div></footer>
  </main>
}

export default App;
