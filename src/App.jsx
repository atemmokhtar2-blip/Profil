import React, { useEffect, useState } from "react";
import { ArrowUpRight, Code2, Github, Terminal, Shield, Cpu, Sparkles, ExternalLink, MessageCircle } from "lucide-react";

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
  const [nameStyle, setNameStyle] = useState(0);
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
        <h1>I build things<br/><em>that feel alive.</em></h1>
        <p className="lead"><span className="hero-name-mark">Hatem Mokhtar</span><span className="hero-name-sep"> — </span>a developer focused on bots, software engineering and the craft of turning ambitious ideas into real systems.</p>
        <div className="actions"><a className="primary" href="#work">Explore my work <ArrowUpRight size={17}/></a><a className="secondary whatsapp-handle" href="https://wa.me/h_a_t_e_m_7" aria-label="WhatsApp @h_a_t_e_m_7"><MessageCircle size={17}/> @h_a_t_e_m_7</a></div><div className="hero-tags"><span>BOTS</span><span>SOFTWARE</span><span>SECURITY</span></div><div className="hero-coordinates">29.98° N / 31.13° E <span>—</span> BUILD MODE</div>
      </div>
      <div className="hero-portrait" data-depth>
        <div className="portrait-frame"><img src="/hatem-face.webp" alt="Hatem visual portrait" /></div>
        <div className={`portrait-name-wrap name-style-${nameStyle}`} aria-label="Hatem"><span className="portrait-name-live">{["HΛTEM","HATΞM","HATEM","H·A·T·E·M","H4TEM","HATEM."][nameStyle]}</span><span className="portrait-name-arrow" aria-hidden="true">↗</span><span className="portrait-name-track" aria-hidden="true"/></div>
      </div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="core"><Code2 size={38}/><span>BUILD</span></div><span className="float f1">JS</span><span className="float f2">NODE</span><span className="float f3">SEC</span></div>
      <div className="scroll">SCROLL TO DISCOVER <span>↓</span></div>
    </section>
  </main>
}

export default App;
