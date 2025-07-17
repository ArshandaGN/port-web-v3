import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { Mail, Github, Linkedin, Instagram, FileText, Menu, X, Sun, Moon, Link as LinkIcon, Code, BookOpen, Briefcase, User, Star, MessageSquare, ChevronDown, ChevronRight, ChevronUp, Play, Lightbulb } from 'lucide-react'; // Added Lightbulb icon for project ideas
import { motion, AnimatePresence, useInView} from 'framer-motion';
import { Typewriter } from "react-simple-typewriter";
import ReCAPTCHA from "react-google-recaptcha";

// --- Global Context for Theme and Firebase ---
const ThemeContext = createContext();
const FirebaseContext = createContext();

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default to dark mode

  // Check user's preferred theme from local storage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  // Apply theme to HTML element and save to local storage
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// src/App.jsx
import { portfolioData } from './data/portfolioData'; 

// --- Helper for smooth scrolling ---
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Components ---

// Header Component
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <header className="fixed top-0 left-0 w-full px-4 md:px-10 py-4 md:py-5 bg-primary-dark dark:bg-primary-dark flex justify-between items-center z-50 shadow-lg">
      {/* Logo */}
      <a href="#home" className="text-2xl md:text-3xl font-bold text-accent-light dark:text-accent-light hover:text-accent-dark transition-colors duration-300">
        Arshan.
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => ( // Removed Education
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.toLowerCase());
            }}
            // Adjusted text color for light mode visibility
            className="text-text-dark dark:text-text-dark text-lg font-medium hover:text-accent-light dark:hover:text-accent-light transition-colors duration-300"
          >
            {item}
          </a>
        ))}
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-text-dark dark:text-text-dark text-2xl" // Adjusted text color for light mode visibility
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary-dark dark:bg-primary-dark shadow-md py-4">
          <nav className="flex flex-col items-center space-y-4">
            {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => ( // Removed Education
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                  setIsOpen(false); // Close menu after clicking
                }}
                className="text-text-dark dark:text-text-dark text-lg font-medium hover:text-accent-light dark:hover:text-accent-light transition-colors duration-300 w-full text-center py-2"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

// Home Component
const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center py-20 px-6 sm:px-10 md:px-12 
        bg-gradient-to-b from-white via-[#eff6ff] to-[#f0f4fe]
        dark:from-[#081b29] dark:via-[#1e2a38] dark:to-black
        text-primary-dark dark:text-white relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] bg-[length:400%_400%] opacity-30 blur-3xl" />

      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={portfolioData.profile.personalImage1}
            alt="Foto Arshanda"
            className="w-72 md:w-96 h-auto rounded-xl shadow-lg hover:scale-105 hover:rotate-1 transition-transform duration-300"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-primary-dark dark:text-white drop-shadow-md">
            Hai, Saya{" "}
            <span className="text-accent-light drop-shadow-[0_2px_5px_rgba(59,130,246,0.8)]">
              {portfolioData.profile.name}
            </span>
          </h1>

          <h3 className="text-xl md:text-2xl font-semibold text-accent-light dark:text-accent-light mb-4 drop-shadow-sm">
            <Typewriter
              words={["Data Analyst", "UI/UX Designer", "Front-End Developer"]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h3>

          <p className="text-base md:text-lg text-text-secondary-light dark:text-text-secondary-dark mb-6">
            {portfolioData.profile.homeDescription}
          </p>

          <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
            <span className="px-3 py-1 bg-white/40 dark:bg-white/20 border border-white/40 dark:border-white/30 rounded-full text-sm font-medium text-primary-dark dark:text-white">
              🚀 Open for Internship
            </span>
            <span className="px-3 py-1 bg-white/40 dark:bg-white/20 border border-white/40 dark:border-white/30 rounded-full text-sm font-medium text-primary-dark dark:text-white">
              🎨 Design & Code
            </span>
            <span className="px-3 py-1 bg-white/40 dark:bg-white/20 border border-white/40 dark:border-white/30 rounded-full text-sm font-medium text-primary-dark dark:text-white">
              📊 Data Enthusiast
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
            <a
              href={portfolioData.profile.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent-light rounded-lg text-lg font-semibold bg-accent-light text-primary-dark hover:bg-transparent hover:text-accent-light transition-all duration-300 shadow-md"
            >
              <FileText size={20} className="mr-2" /> Lihat CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent-light rounded-lg text-lg font-semibold text-accent-light hover:bg-accent-light hover:text-primary-dark transition-all duration-300 shadow-md"
            >
              <Mail size={20} className="mr-2" /> Kirim Pesan
            </a>
          </div>

          <div className="flex justify-center md:justify-start space-x-5">
            {[
              { icon: "bx bx-envelope", url: "mailto:arshandagn06@gmail.com" },
              { icon: "bx bxl-instagram", url: "https://www.instagram.com/arshndaagn" },
              { icon: "bx bxl-linkedin", url: "https://www.linkedin.com/in/arshandagn" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                className="text-accent-light hover:text-white bg-secondary-light dark:bg-secondary-dark p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={`${item.icon} text-2xl`}></i>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};


const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-20 px-6 sm:px-8 md:px-12 lg:px-16
        bg-gradient-to-b from-[#f0f4ff] via-[#dbeafe] to-primary-light
        dark:from-black dark:via-[#1e2a38] dark:to-[#081b29]
        text-text-light dark:text-text-dark"
    >
      {/* Content */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Image Section */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={portfolioData.profile.personalImage2}
            alt="Foto Arshanda"
            className="w-56 md:w-64 lg:w-72 h-auto rounded-xl shadow-lg hover:scale-105 hover:rotate-1 transition-all duration-300"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full md:w-3/5 text-left"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-dark dark:text-white">
            Kenalin, Aku Arshanda Geulis Nawajaputri 
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-text-secondary-light dark:text-text-secondary-dark mb-6">
            Aku adalah mahasiswa <span className="font-semibold text-accent-light">Ilmu Komputer</span> yang sedang aktif mengembangkan diri
            di bidang <span className="font-semibold text-accent-light">Data Analysis</span>, <span className="font-semibold text-accent-light">UI/UX Design</span>, dan <span className="font-semibold text-accent-light">Front-End Development</span>.
            Saat ini aku sedang mencari kesempatan untuk magang dan berkontribusi langsung di dunia kerja.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-text-secondary-light dark:text-text-secondary-dark mb-6">
            Aku terbiasa menggunakan tools seperti <span className="font-semibold">Python, Figma, JavaScript</span>, dan berbagai alat
            kolaborasi lainnya. Selain itu, aku aktif dalam organisasi kampus dan punya semangat belajar yang tinggi.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-3 py-1 bg-accent-light text-white rounded-full text-sm font-medium">Open for Internship</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">Data & Front-End</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">Creative Problem Solver</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Skill Icon Mapping (Lucide React)
const getSkillIcon = (icon) => {
    return (
      <img
        src={icon}
        alt="Skill Icon"
        className="w-10 h-10 object-contain"
      />
    );
}

const Skills = () => {
  const categories = ['Coding', 'Data Tools', 'Design'];
  const [activeCategory, setActiveCategory] = useState('Coding');

  const skillGroups = portfolioData.skills.technical;
  const filteredSkills = skillGroups[
    activeCategory === 'Coding'
      ? 'programming'
      : activeCategory === 'Data Tools'
      ? 'dataTools'
      : 'designTools'
  ];

  return (
    <section
      id="skills"
      className="relative py-20 px-6 sm:px-8 md:px-12 bg-gradient-to-b from-primary-light via-blue-50 to-secondary-light dark:from-primary-dark dark:via-gray-800 dark:to-black text-text-light dark:text-text-dark"
    >
      {/* Blob Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 bg-pink-300 dark:bg-pink-800 top-[-5rem] left-[-5rem] animate-blob1 mix-blend-multiply dark:mix-blend-lighten" />
        <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 bg-blue-300 dark:bg-blue-800 bottom-[-4rem] right-[-4rem] animate-blob2 mix-blend-multiply dark:mix-blend-lighten" />
        <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 bg-purple-300 dark:bg-purple-800 top-[40%] left-[45%] animate-blob3 mix-blend-multiply dark:mix-blend-lighten" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8 text-primary-dark dark:text-text-dark"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Keahlian Saya
        </motion.h2>

        {/* Tabs */}
        <motion.div
          className="flex justify-center gap-4 mb-10 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base shadow-sm ${
                activeCategory === cat
                  ? 'bg-accent-light text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid Skills */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.a
              key={index}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <img
                src={skill.icon}
                alt={`${skill.name} icon`}
                className="w-10 h-10 mb-3 object-contain pointer-events-none"
              />
              <p className="text-sm font-medium text-primary-dark dark:text-white pointer-events-none">
                {skill.name}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* Interpersonal Skills */}
        <motion.h3
          className="text-3xl md:text-4xl font-bold mb-6 text-primary-dark dark:text-text-dark"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Kemampuan Interpersonal
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {portfolioData.skills.interpersonal.map((item, index) => (
            <motion.div
              key={index}
              className="p-5 bg-white dark:bg-card-dark rounded-xl shadow-md text-left border-l-4 border-accent-light"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-semibold text-primary-dark dark:text-white mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Experience Section with Accordion Cards
const ExperienceSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section
      id="experience"
      className="relative py-20 px-6 sm:px-8 md:px-12 bg-gradient-to-b from-secondary-light via-[#e6f0ff] to-primary-light dark:from-black dark:via-[#0f172a] dark:to-[#081b29] text-primary-dark dark:text-text-dark transition-all"
    >
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Pengalaman Saya
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {portfolioData.experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-6 flex flex-col justify-between text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div>
                <p className="text-sm font-semibold text-accent-light dark:text-accent-light mb-1">{exp.type}</p>
                <h4 className="text-xl md:text-2xl font-semibold mb-1">{exp.title}</h4>
                <p className="text-lg font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">{exp.organization}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{exp.years}</p>
              </div>

              <button
                onClick={() => toggleAccordion(index)}
                className="mt-auto flex justify-between items-center px-4 py-2 bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-light rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                Job Description
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden mt-4"
                  >
                    <ul className="list-disc list-inside space-y-2 text-base text-text-secondary-light dark:text-text-secondary-dark">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


const Projects = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const modalRef = useRef(null);

  const projects = portfolioData.projects;
  const certificates = portfolioData.certificates;

  const allCategories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (selectedProject && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative py-20 px-6 sm:px-8 md:px-12 bg-gradient-to-b from-primary-light via-blue-50 to-secondary-light dark:from-primary-dark dark:via-gray-800 dark:to-black text-text-light dark:text-text-dark"
    >
      {/* Blob Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 bg-pink-300 dark:bg-pink-800 top-[-5rem] left-[-5rem] animate-blob1 mix-blend-multiply dark:mix-blend-lighten" />
        <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 bg-blue-300 dark:bg-blue-800 bottom-[-4rem] right-[-4rem] animate-blob2 mix-blend-multiply dark:mix-blend-lighten" />
        <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 bg-purple-300 dark:bg-purple-800 top-[40%] left-[45%] animate-blob3 mix-blend-multiply dark:mix-blend-lighten" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-10 text-center text-primary-dark dark:text-text-dark"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          Portofolio Saya
        </motion.h2>

        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: false }}
        >
          {['projects', 'certificates'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-sm md:text-base font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-accent-light text-white dark:text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              } ${tab === 'projects' ? 'rounded-l-lg' : 'rounded-r-lg'}`}
            >
              {tab === 'projects' ? 'Proyek' : 'Sertifikat'}
            </button>
          ))}
        </motion.div>

        {/* Filter */}
        {activeTab === 'projects' && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: false }}
          >
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-accent-light text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Grid: Projects */}
        {activeTab === 'projects' && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: false }}
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden cursor-pointer"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.img || `https://placehold.co/600x400?text=${project.title}`}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 text-left">
                    <h4 className="text-lg font-semibold text-accent-light dark:text-accent-light mb-2">{project.title}</h4>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.techStack?.map((tech, i) => (
                        <span key={i} className="bg-primary-light dark:bg-primary-dark text-accent-light text-xs font-semibold px-2 py-0.5 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Grid: Certificates */}
        {activeTab === 'certificates' && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: false }}
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedCert(cert)}
              >
                <img
                  src={cert.img || `https://placehold.co/400x300?text=Certificate+${index + 1}`}
                  alt={cert.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-left">
                  <p className="text-base font-medium text-primary-dark dark:text-text-dark">{cert.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modal: Project */}
        {selectedProject && (
          <div ref={modalRef} className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-card-dark rounded-lg max-w-3xl w-full p-6 relative animate-fadeIn">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-600 dark:hover:text-red-400"
              >
                <X size={24} />
              </button>
              <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-auto object-contain rounded-md mb-4" />
              <h3 className="text-xl font-bold text-primary-dark dark:text-text-dark mb-2">{selectedProject.title}</h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">{selectedProject.description}</p>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm mr-4"
                >
                  <LinkIcon className="inline mr-1" size={16} /> Demo
                </a>
              )}
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  <Github className="inline mr-1" size={16} /> GitHub
                </a>
              )}
            </div>
          </div>
        )}

        {/* Modal: Certificate */}
        {selectedCert && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-card-dark rounded-lg max-w-2xl w-full p-6 relative animate-fadeIn">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-600 dark:hover:text-red-400"
              >
                <X size={24} />
              </button>
              <img src={selectedCert.img} alt={selectedCert.title} className="w-full h-auto object-contain rounded-md mb-4" />
              <h3 className="text-xl font-bold text-primary-dark dark:text-text-dark mb-2">{selectedCert.title}</h3>
              {selectedCert.link && (
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Lihat Sertifikat
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFormMessage("Harap isi semua kolom terlebih dahulu.");
      return;
    }
    setFormMessage("Pesan kamu berhasil dikirim! 😊");
    setName("");
    setEmail("");
    setMessage("");
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/arshandagn",
    },
    {
      name: "GitHub",
      icon: <Github size={20} />,
      href: "https://github.com/ArshandaGN",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/arshndaagn",
    },
    {
      name: "TikTok",
      icon: <i className="bx bxl-tiktok text-[18px]"></i>,
      href: "https://www.tiktok.com/@arshndagn",
    },
  ];

  return (
     <section id="contact" className="relative py-24 px-6 md:px-10 bg-gradient-to-b from-secondary-light via-[#f8fbff] to-secondary-light dark:from-black dark:via-[#0f172a] dark:to-secondary-dark text-text-light dark:text-text-dark transition-all"
      ><div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary-dark dark:text-text-dark"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Yuk Terhubung!
        </motion.h2>

        <motion.p
          className="text-lg text-center text-text-secondary-light dark:text-text-secondary-dark mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Ingin berkolaborasi, diskusi project, atau punya pertanyaan seputar teknologi?
          Jangan ragu hubungi saya! Kamu bisa kirim pesan lewat form ini atau langsung connect lewat sosial media.
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* SOCIAL MEDIA */}
          <motion.div
            className="w-full lg:w-1/2 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-left mb-6 text-primary-dark dark:text-text-dark">
              Temui Saya di Sosial Media ✨
            </h3>

            <ul className="space-y-4">
              {socialLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-primary-dark rounded-lg hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3 text-primary-dark dark:text-white group-hover:text-accent-light dark:group-hover:text-accent-light">
                      {link.icon}
                      <span className="text-base font-semibold">{link.name}</span>
                    </div>
                    <ChevronRight className="text-gray-400 group-hover:text-accent-light" size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* FORM */}
          <motion.div
            className="w-full lg:w-1/2 bg-card-light dark:bg-card-dark rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-6 text-primary-dark dark:text-text-dark">
              Kirim Pesan Langsung 📬
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-700 text-primary-dark dark:text-text-dark"
                  placeholder="Nama kamu"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-700 text-primary-dark dark:text-text-dark"
                  placeholder="Email kamu"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pesan</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-lg bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-700 text-primary-dark dark:text-text-dark"
                  placeholder="Apa yang ingin kamu diskusikan?"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-accent-light text-white dark:text-primary-dark rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
              >
                Kirim Sekarang
              </button>
              {formMessage && (
                <p className="mt-4 text-center text-green-600 dark:text-green-400">
                  {formMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


// Footer Component
const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-10 bg-primary-dark dark:bg-primary-dark text-text-dark text-center">
      <p className="text-base md:text-lg">&copy; {new Date().getFullYear()} Arshan. All Rights Reserved.</p>
    </footer>
  );
};

// Main App Component
const App = () => {
    const [isVerified, setIsVerified] = useState(false);

    const handleCaptchaChange = (value) => {
      if (value) setIsVerified(true);
    };
  
    // Memindahkan inisialisasi AOS ke dalam komponen App
    useEffect(() => {
        // Memuat script AOS dari CDN
        const scriptAOS = document.createElement('script');
        scriptAOS.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
        scriptAOS.onload = () => {
            // Inisialisasi AOS setelah script dimuat
            if (window.AOS) {
                window.AOS.init({
                    duration: 1000,
                    once: true, // Animasi hanya terjadi sekali saat menggulir ke bawah
                });
            }
        };
        document.body.appendChild(scriptAOS);

        // Memuat CSS AOS dari CDN
        const linkAOS = document.createElement('link');
        linkAOS.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
        linkAOS.rel = 'stylesheet';
        document.head.appendChild(linkAOS);

        // Memuat Boxicons CSS dari CDN
        const linkBoxicons = document.createElement('link');
        linkBoxicons.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
        linkBoxicons.rel = 'stylesheet';
        document.head.appendChild(linkBoxicons);

        // Memuat Tailwind CSS dari CDN
        const scriptTailwind = document.createElement('script');
        scriptTailwind.src = 'https://cdn.tailwindcss.com';
        scriptTailwind.onload = () => {
            // Konfigurasi Tailwind setelah dimuat
            if (window.tailwind) {
                window.tailwind.config = {
                    darkMode: 'class',
                    theme: {
                        extend: {
                            fontFamily: {
                                poppins: ['Poppins', 'sans-serif'],
                            },
                            colors: {
                                'primary-dark': '#081b29',
                                'secondary-dark': '#1e2a38',
                                'text-dark': '#ededed',
                                'text-secondary-dark': '#a0a0a0',
                                'accent-dark': '#00abf0',
                                'primary-light': '#f3f3f3',
                                'secondary-light': '#ffffff',
                                'text-light': '#081b29',
                                'text-secondary-light': '#555555',
                                'accent-light': '#00abf0',
                                // New card colors to ensure contrast
                                'card-light': '#ffffff', // White for light mode cards
                                'card-dark': '#1e2a38', // Dark grey for dark mode cards
                            },
                        },
                    },
                    plugins: [],
                };
            }
        };
        document.head.appendChild(scriptTailwind);


        // Cleanup function
        return () => {
            document.body.removeChild(scriptAOS);
            document.head.removeChild(linkAOS);
            document.head.removeChild(linkBoxicons);
            document.head.removeChild(scriptTailwind);
        };
    }, []); // Empty dependency array means this runs once on mount

  return (
    <ThemeProvider>
        {/* CSS global yang di-inline untuk memastikan resolusi */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

            body {
              font-family: 'Poppins', sans-serif;
              background-color: var(--primary-light); /* Default light mode */
              color: var(--text-light); /* Default light mode */
              transition: background-color 0.3s ease, color 0.3s ease;
              overflow-x: hidden;
            }

            /* CSS Variables for theming */
            :root {
              --primary-dark: #081b29;
              --secondary-dark: #1e2a38;
              --text-dark: #ededed;
              --text-secondary-dark: #a0a0a0;
              --accent-dark: #00abf0;

              --primary-light: #f3f3f3;
              --secondary-light: #ffffff;
              --text-light: #081b29;
              --text-secondary-light: #555555;
              --accent-light: #00abf0;

              /* New card colors to ensure contrast */
              --card-light: #ffffff;
              --card-dark: #1e2a38;
            }

            /* Dark mode styles */
            html.dark {
              --primary-light: var(--primary-dark);
              --secondary-light: var(--secondary-dark);
              --text-light: var(--text-dark);
              --text-secondary-light: var(--text-secondary-dark);
              --accent-light: var(--accent-dark);
              --card-light: var(--card-dark); /* Map light card to dark card */
            }

            /* Basic reset for elements */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            /* Smooth scroll behavior for anchor links */
            html {
              scroll-behavior: smooth;
            }

            /* Ensure images fill their containers properly */
            img {
              max-width: 100%;
              height: auto;
              display: block;
            }
          `}
        </style>
         <div className="min-h-screen font-poppins antialiased">
      {!isVerified ? (
        <div className="flex flex-col items-center justify-center h-screen bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark">
          <h2 className="text-xl font-semibold mb-6">Verifikasi dulu ya sebelum masuk 👇</h2>
          <ReCAPTCHA
            sitekey="6Ld_roYrAAAAAEajwmObnx-ZkMfGruNZiyoBsBCe"
            onChange={handleCaptchaChange}
          />
        </div>
        ) : (
          <>
            <Header />
            <main className="pt-8">
              <Home />
              <About />
              <Skills />
              <ExperienceSection />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
