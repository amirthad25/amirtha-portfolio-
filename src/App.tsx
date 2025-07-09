import { FC, useEffect, useCallback, useState } from 'react';
import ContactForm from './ContactForm';
import './App.css';
import TypeWriter from './components/TypeWriter';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import FloatingLaptop from './components/FloatingLaptop';

// Import react-icons
import { AiOutlineHome, AiOutlineUser, AiOutlineProject, AiOutlineTrophy, AiOutlineMail } from 'react-icons/ai';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaGraduationCap, FaCalendarAlt, FaUniversity, FaStar } from 'react-icons/fa';
import CodingIllustration from './components/CodingIllustration';

const accomplishments = [
  {
    title: '🏆 IEEE Conference Paper Publication',
    short: 'Presented a research paper on drone-based pest detection at ICCMC 2025.',
    full: (
      <ul>
        <li>📄 Presented the research paper titled <b>“Drone-Based Pest Control: Lite Depthwise Net Stem Borer Detection on Jetson Nano”</b> at the <b>8th International Conference on Computing Methodologies and Communication (ICCMC 2025)</b>.</li>
        <li>💡 The work focused on real-time agricultural pest detection using edge AI hardware (Jetson Nano) and lightweight neural networks for improved crop safety.</li>
      </ul>
    )
  },
  {
    title: '🏢 Internship – Wheels India Ltd (June–July 2024)',
    short: 'Interned in R&D, applying ML and data science for performance analysis.',
    full: (
      <ul>
        <li>👨‍🔬 Worked in the <b>R&D Department</b>, gaining hands-on experience with <b>machine learning and data science tools</b>.</li>
        <li>📊 Contributed to performance analysis and optimization tasks by applying predictive models and data-driven solutions.</li>
      </ul>
    )
  },
  {
    title: '🎓 IEEE Computer Society – Active Member',
    short: 'Organized “DATA VISTA” workshop on data visualization for students.',
    full: (
      <ul>
        <li>🧠 As an active member, I <b>organized “DATA VISTA”</b>, a one-day data visualization workshop for my department students.</li>
        <li>📈 The event introduced tools like Tableau, Power BI, and Python Dash to promote analytical thinking and practical data storytelling.</li>
      </ul>
    )
  },
  {
    title: '🏓 Sports Achievement – Table Tennis',
    short: 'Secured 2nd place in an inter-department Table Tennis tournament.',
    full: (
      <ul>
        <li>🥈 Secured <b>2nd place</b> in an inter-department <b>Table Tennis tournament</b>, showcasing discipline, focus, and competitive spirit.</li>
      </ul>
    )
  },
];

const App: FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [visibleSections, setVisibleSections] = useState({
    home: true,
    about: true,
    contact: true,
    projects: false,
    education: false,
    accomplishments: false,
  });

  const handleNavClick = (section: string) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: true
    }));
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="App">
      {/* Video Background */}
      <video autoPlay muted loop id="background-video">
        <source src="/video/background.mp4" type="video/mp4" />
      </video>

      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ff69b4",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
            },
            number: {
              value: 80,
              density: {
                enable: true,
              },
            },
            opacity: {
              value: 0.5,
            },
            size: {
              value: 3,
            },
          },
        }}
      />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-links">
          <a href="#home" className="nav-item" onClick={e => { e.preventDefault(); handleNavClick('home'); }}>
            <AiOutlineHome /> Home
          </a>
          <a href="#about" className="nav-item" onClick={e => { e.preventDefault(); handleNavClick('about'); }}>
            <AiOutlineUser /> About
          </a>
          <a href="#projects" className="nav-item" onClick={e => { e.preventDefault(); handleNavClick('projects'); }}>
            <AiOutlineProject /> Projects
          </a>
          <a href="#accomplishments" className="nav-item" onClick={e => { e.preventDefault(); handleNavClick('accomplishments'); }}>
            <AiOutlineTrophy /> Accomplishments
          </a>
          <a href="#education" className="nav-item" onClick={e => { e.preventDefault(); handleNavClick('education'); }}>
            <FaGraduationCap /> Education
          </a>
          <a href="#contact" className="nav-item" onClick={e => { e.preventDefault(); handleNavClick('contact'); }}>
            <AiOutlineMail /> Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      {visibleSections.home && (
        <section className="hero-container" id="home">
          <div className="hero-content">
            <h2 className="hero-greeting">Hey <span className="wave-emoji">👋</span></h2>
            <h1 className="hero-name">I'M AMIRTHA</h1>
            <h2 className="hero-role">AI & ML Developer</h2>
            <TypeWriter 
              text="Passionate about creating intelligent systems"
              speed={35}
              deleteSpeed={25}
              pauseDuration={1500}
              className="typewriter-text"
            />
          </div>
          <div className="hero-illustration">
            <CodingIllustration />
          </div>
        </section>
      )}

      {/* About Section */}
      {visibleSections.about && (
        <section id="about" className="section about-section">
          <div className="content">
            <h2>INTRODUCTION</h2>
            <h3>TO MY PROFESSIONAL PORTFOLIO</h3>
            
            <div className="about-content">
              <div className="profile-image">
                <img 
                  src="/assets/images/profile.png"
                  alt="Amirtha - AI & ML Developer"
                  className="portrait-image"
                />
              </div>
              <div className="about-text">
                <p>An aspiring AI & ML Developer with a growing passion for turning data into intelligence.</p>
                <p>🌟 Over time, coding has evolved from a skill to a genuine love — especially as I explore the world of Artificial Intelligence and Machine Learning.</p>
                <p>🧠 I've gained hands-on experience in essential technologies like Python, TensorFlow, PyTorch, and Scikit-learn, and I enjoy working with powerful Data Science tools to uncover insights and build smart solutions.</p>
                <p>🚀 Whether it's developing intelligent systems or experimenting with models, I'm always excited to learn, innovate, and make a meaningful impact with technology.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {visibleSections.projects && (
        <section id="projects" className="section projects-section">
          <div className="content">
            <h2>MY PROJECTS</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3>💬 YouTube AI Comment Moderator</h3>
                <p>Automatically detects and removes harassment or toxic comments on YouTube videos using NLP and Agentic AI approaches.</p>
                <div className="project-links">
                  <a href="https://github.com/amirthad25/Youtube-Ai-Comment-Moderator" target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>

              <div className="project-card">
                <h3>😴 AI Sleep and Stress Monitor</h3>
                <p>A personalized assistant that uses behavior patterns and mood cues to recommend relaxation techniques and sleep improvement routines.</p>
                <div className="project-links">
                  <a href="https://github.com/amirthad25/sleep-and-stress-monitoring-AI-assistant" target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>

              <div className="project-card">
                <h3>🌕 Lunar Crater Detection</h3>
                <p>Automated geological analysis system using YOLOv9 to detect and measure lunar craters from high-resolution orbiter images. Supports space research and terrain exploration.</p>
                <div className="project-links">
                  <a href="https://github.com/amirthad25/Moon-Crater-Detection" target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>

              <div className="project-card">
                <h3>🔍 Dark Web Monitoring</h3>
                <p>A tool to monitor and track dark web activity using scraped data. Helps identify suspicious or leaked content by crawling and analyzing unindexed web sources.</p>
                <div className="project-links">
                  <a href="https://github.com/amirthad25/Dark-Web-Monitoring" target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>

              <div className="project-card">
                <h3>🦠 Malware File Scanner</h3>
                <p>Scans local files using known malware signatures and behavior analysis techniques to detect threats. Useful for basic cybersecurity diagnostics.</p>
                <div className="project-links">
                  <a href="https://github.com/amirthad25/Malware-File-Scanner" target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>

              <div className="project-card">
                <h3>🔐 Network Security Scanner</h3>
                <p>A command-line tool that scans and reports vulnerabilities in open ports and running services within a network. Enhances local network security awareness.</p>
                <div className="project-links">
                  <a href="https://github.com/amirthad25/Network-Security-Scanner" target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>

              <div className="project-card">
                <h3>🧠 Password Strength Checker</h3>
                <p>Evaluates user-generated passwords based on entropy, length, and character variety. Guides users toward stronger password creation habits.</p>
                <div className="project-links">
                  <a href="https://github.com/amirthad25/Password-Strength-Checker" target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>

              <div className="project-card">
                <h3>🎣 Phishing URL Detector</h3>
                <p>Detects suspicious links using machine learning models trained on real phishing datasets. Enhances email and web browsing safety.</p>
                <div className="project-links">
                  <a href="https://github.com/amirthad25/Phishing-Link-Detector" target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>

              <div className="project-card">
                <h3>🎯 CyberShield Chatbot API</h3>
                <p>A FastAPI-powered chatbot backend that provides users with information about cybersecurity tools like Phishing URL Detector, Password Strength Checker, and Network Security Scanner. Features predefined responses and easy integration for web/mobile interfaces.</p>
                <div className="project-links">
                  <a href="https://github.com/amirthad25/Cyber-Sheild-Chatbot" target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {visibleSections.education && (
        <section id="education" className="section education-section">
          <div className="content">
            <h2>EDUCATION</h2>
            <div className="education-timeline">
              <div className="education-card">
                <div className="education-icon">
                  <FaGraduationCap />
                </div>
                <div className="education-details">
                  <h3>B.Tech in Artificial Intelligence & Data Science</h3>
                  <p className="institution"><FaUniversity /> Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology</p>
                  <p className="timeline"><FaCalendarAlt /> 2021 - 2025</p>
                  <p className="cgpa"><FaStar /> CGPA: 8.09</p>
                  <p className="description">🎓 Recently graduated, specializing in core areas like AI, Machine Learning, Deep Learning, and Data Science with practical exposure and research-based learning.</p>
                </div>
              </div>

              <div className="education-card">
                <div className="education-icon">
                  <FaGraduationCap />
                </div>
                <div className="education-details">
                  <h3>Higher Secondary Education (Class 12)</h3>
                  <p className="institution"><FaUniversity /> Sethu Bhaskara Matriculation Higher Secondary School</p>
                  <p className="timeline"><FaCalendarAlt /> 2021</p>
                  <p className="cgpa"><FaStar /> Percentage: 82.5%</p>
                  <p className="description">📘 Specializing in PCMB – Physics, Chemistry, Mathematics, and Biology, which laid the groundwork for advanced scientific studies.</p>
                </div>
              </div>

              <div className="education-card">
                <div className="education-icon">
                  <FaGraduationCap />
                </div>
                <div className="education-details">
                  <h3>Secondary Education (Class 10)</h3>
                  <p className="institution"><FaUniversity /> Kendriya Vidyalaya, HVF, Avadi</p>
                  <p className="timeline"><FaCalendarAlt /> 2019</p>
                  <p className="cgpa"><FaStar /> Percentage: 80.8%</p>
                  <p className="description">📚 Successfully completed secondary education under CBSE, building a strong academic foundation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Accomplishments Section */}
      {visibleSections.accomplishments && (
        <section id="accomplishments" className="section accomplishments-section">
          <div className="content">
            <h2>ACCOMPLISHMENTS</h2>
            <div className="accomplishments-grid">
              {accomplishments.map((acc, idx) => (
                <div
                  className={`accomplishment-card${expanded === idx ? ' expanded' : ''}`}
                  key={acc.title}
                  style={{ cursor: 'pointer', transition: 'box-shadow 0.3s, background 0.3s, max-height 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                >
                  <h3>{acc.title}</h3>
                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: expanded === idx ? 500 : 48,
                      transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)',
                      opacity: expanded === idx ? 1 : 0.85
                    }}
                  >
                    {expanded === idx ? acc.full : <p>{acc.short}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {visibleSections.contact && (
        <section id="contact" className="section contact-section">
          <div className="content">
            <h2>Get In Touch With Me</h2>
            <ContactForm />
          </div>
        </section>
      )}

      {/* Connect Section */}
      <section id="connect" className="section connect-section">
        <div className="content">
          <h2>CONNECT WITH ME HERE</h2>
          <p>Connect with <span className="highlight">ME</span> across platforms!</p>
          <div className="social-links">
            <a href="https://github.com/amirthad25" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/amirtha-thennavan-b6b5962a7" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="https://www.instagram.com/amirthaa_d/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram /> Instagram
            </a>
            <a href="mailto:amirthad1225@gmail.com" className="social-link">
              <FaEnvelope /> Gmail
            </a>
          </div>
        </div>
      </section>

      <footer>
        <p>Designed and Developed by Amirtha</p>
        <p>Copyright © 2025 Amirtha</p>
      </footer>
    </div>
  );
};

export default App; 