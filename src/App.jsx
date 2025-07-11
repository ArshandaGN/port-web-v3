import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { Mail, Github, Linkedin, Instagram, FileText, Menu, X, Sun, Moon, Link as LinkIcon, Code, BookOpen, Briefcase, User, Star, MessageSquare, ChevronDown, ChevronUp, Play, Lightbulb } from 'lucide-react'; // Added Lightbulb icon for project ideas

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

// Firebase Provider Component
const FirebaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    try {
      // Access global variables provided by the Canvas environment
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
      const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

      if (!firebaseConfig) {
        console.error("Firebase config is not defined. Please ensure __firebase_config is available.");
        return;
      }

      const app = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(app);
      const firebaseAuth = getAuth(app);

      setDb(firestoreDb);
      setAuth(firebaseAuth);

      // Sign in using custom token or anonymously
      const signIn = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(firebaseAuth, initialAuthToken);
          } else {
            await signInAnonymously(firebaseAuth);
          }
        } catch (error) {
          console.error("Firebase authentication error:", error);
        }
      };

      signIn();

      // Listen for auth state changes
      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUserId(user.uid);
          console.log("Firebase User ID:", user.uid);
        } else {
          setUserId(crypto.randomUUID()); // Fallback for unauthenticated users
          console.log("Signed in anonymously or user not found. Using random UUID for userId.");
        }
        setIsAuthReady(true);
      });

      return () => unsubscribe(); // Cleanup auth listener
    } catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  }, []);

  return (
    <FirebaseContext.Provider value={{ db, auth, userId, isAuthReady }}>
      {children}
    </FirebaseContext.Provider>
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
    <section id="home" className="min-h-screen flex items-center justify-center py-10 px-4 md:px-10 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] bg-[length:400%_400%] opacity-40 blur-2xl"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Image for Mobile/Tablet, Text for PC */}
        <div className="md:hidden flex-shrink-0" data-aos="fade-down">
          <img
            src={portfolioData.profile.personalImage1}
            alt="Gambar Arshanda"
            className="w-72 h-64 transition-transform duration-300 transform hover:scale-105 hover:rotate1 hover:shadow-xl"
          />
        </div>

        {/* Home Content */}
        <div className="w-full text-center md:text-justify" data-aos="fade-right">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
            Hai, Saya <span className="text-primary-dark dark:text-text-dark">{portfolioData.profile.name}</span> {/* Name color adjusted */}
          </h1>
          <h3 className="text-2xl md:text-3xl font-semibold text-accent-light dark:text-accent-light mb-4">
            {portfolioData.profile.role}
          </h3>
          <p className="text-base md:text-sm mb-8 max-w-lg mx-auto md:mx-0">
            {portfolioData.profile.homeDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
            <a
              href={portfolioData.profile.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent-light dark:border-accent-light rounded-lg text-lg font-semibold bg-accent-light dark:bg-accent-light text-primary-dark dark:text-primary-dark hover:bg-transparent hover:text-accent-light dark:hover:text-accent-light transition-all duration-300 shadow-md"
            >
              <FileText size={20} className="mr-2" /> Lihat CV
            </a>
            {/* New "Kirim Pesan" button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent-light dark:border-accent-light rounded-lg text-lg font-semibold bg-transparent text-accent-light dark:text-accent-light hover:bg-accent-light hover:text-primary-dark dark:hover:text-primary-dark transition-all duration-300 shadow-md"
            >
              <Mail size={20} className="mr-2" /> Kirim Pesan
            </button>
          </div>
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="mailto:arshandagn06@gmail.com" className="text-accent-light dark:text-accent-light hover:text-primary-dark dark:hover:text-primary-dark bg-secondary-light dark:bg-secondary-dark p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md" aria-label="Email">
              <i className='bx bx-envelope text-2xl'></i>
            </a>
            <a href="https://www.instagram.com/arshndasvnch" target="_blank" rel="noopener noreferrer" className="text-accent-light dark:text-accent-light hover:text-primary-dark dark:hover:text-primary-dark bg-secondary-light dark:bg-secondary-dark p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md" aria-label="Instagram">
              <i className='bx bxl-instagram text-2xl'></i>
            </a>
            <a href="https://www.linkedin.com/in/arshandagn" target="_blank" rel="noopener noreferrer" className="text-accent-light dark:text-accent-light hover:text-primary-dark dark:hover:text-primary-dark bg-secondary-light dark:bg-secondary-dark p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md" aria-label="LinkedIn">
              <i className='bx bxl-linkedin text-2xl'></i>
            </a>
          </div>
        </div>

        {/* Image for PC */}
        <div className="hidden md:flex flex-shrink-0" data-aos="fade-left">
          <img
            src={portfolioData.profile.personalImage1}
            alt="Gambar Arshanda"
            className="w-120 h-120 transition-transform duration-300 transform hover:scale-105 hover:rotate1 hover:shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

// About Component
const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4 md:px-10 bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Image for Mobile/Tablet */}
        <div className="md:hidden flex-shrink-0" data-aos="fade-down">
          <img
            src={portfolioData.profile.personalImage2}
            alt="Gambar Arshanda"
            className="w-52 h-64 transition-transform duration-300 transform hover:scale-105 hover:rotate1 hover:shadow-xl"
          />
        </div>

        {/* About Content */}
        <div className="w-full md:w-1/2 text-center md:text-left" data-aos="fade-right">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-dark dark:text-text-dark">Tentang Saya</h2>
          <p className="text-base md:text-lg leading-relaxed text-text-secondary-light dark:text-text-secondary-dark text-justify"> {/* Added text-justify */}
            {portfolioData.profile.shortProfile}
          </p>
        </div>

        {/* Image for PC */}
        <div className="hidden md:flex flex-shrink-0" data-aos="fade-left">
          <img
            src={portfolioData.profile.personalImage2}
            alt="Gambar Arshanda"
            className="w-60 h-80 transition-transform duration-300 transform hover:scale-105 hover:rotate1 hover:shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

// Skill Icon Mapping (Lucide React)
const getSkillIcon = (iconName) => {
  switch (iconName) {
    case 'Code': return <Code size={40} />;
    case 'BookOpen': return <BookOpen size={40} />;
    case 'Briefcase': return <Briefcase size={40} />;
    case 'User': return <User size={40} />;
    case 'Star': return <Star size={40} />;
    case 'Play': return <Play size={40} />; // For Capcut/Canva if needed
    default: return <Code size={40} />; // Default icon
  }
};

// Skills Component
const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 md:px-10 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary-dark dark:text-text-dark" data-aos="fade-up">Keahlian Saya</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {portfolioData.skills.technical.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="text-accent-light dark:text-accent-light mb-3">
                {getSkillIcon(skill.icon)}
              </div>
              <p className="text-lg font-medium text-primary-dark dark:text-text-dark">{skill.name}</p>
            </div>
          ))}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold mb-8 text-primary-dark dark:text-text-dark" data-aos="fade-up">Kemampuan Interpersonal</h3>
        <ul className="list-disc list-inside text-left mx-auto max-w-2xl text-base md:text-lg text-text-secondary-light dark:text-text-secondary-dark space-y-2" data-aos="fade-up" data-aos-delay="200">
          {portfolioData.skills.interpersonal.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// Experience Section with Accordion Cards
const ExperienceSection = () => {
  const [openAccordion, setOpenAccordion] = useState(null); // State to manage which accordion is open

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section id="experience" className="py-20 px-4 md:px-10 bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary-dark dark:text-text-dark" data-aos="fade-up">Pengalaman Saya</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* 3 columns layout */}
          {portfolioData.experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 flex flex-col"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="p-6 flex-grow">
                <p className="text-sm font-semibold text-accent-light dark:text-accent-light mb-1">{exp.type}</p>
                <h4 className="text-xl md:text-2xl font-semibold text-primary-dark dark:text-text-dark mb-1">{exp.title}</h4>
                <p className="text-lg font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">{exp.organization}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{exp.years}</p>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center px-4 py-2 bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-light rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Job Description
                  {openAccordion === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openAccordion === index && (
                  <div className="mt-4 text-left text-base text-text-secondary-light dark:text-text-secondary-dark">
                    <ul className="list-disc list-inside space-y-1">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Component
const Projects = () => {
  const { db, isAuthReady, userId } = useContext(FirebaseContext);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'certificates'

  // State for LLM feature
  const [showIdeaGenerator, setShowIdeaGenerator] = useState(false);
  const [ideaPromptInput, setIdeaPromptInput] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState('');
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [ideaError, setIdeaError] = useState('');

  useEffect(() => {
    if (!db || !isAuthReady) {
      console.log("Firestore not ready or auth not complete.");
      return;
    }

    // Fetch Projects
    const projectsCollectionRef = collection(db, `artifacts/${__app_id}/public/data/projects`);
    const unsubscribeProjects = onSnapshot(projectsCollectionRef, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching projects:", err);
      setError("Gagal memuat proyek.");
      setLoading(false);
    });

    // Fetch Certificates
    const certificatesCollectionRef = collection(db, `artifacts/${__app_id}/public/data/certificates`);
    const unsubscribeCertificates = onSnapshot(certificatesCollectionRef, (snapshot) => {
      const certificatesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCertificates(certificatesData);
    }, (err) => {
      console.error("Error fetching certificates:", err);
      setError("Gagal memuat sertifikat.");
    });

    return () => {
      unsubscribeProjects();
      unsubscribeCertificates();
    };
  }, [db, isAuthReady, userId]);

  // Function to call Gemini API for project ideas
  const generateProjectIdeas = async () => {
    setIsGeneratingIdeas(true);
    setIdeaError('');
    setGeneratedIdeas('');

    const userSkills = portfolioData.skills.technical.map(skill => skill.name).join(', ');
    const prompt = `Sebagai seorang pengembang yang memiliki keahlian dalam ${userSkills}, berikan 3 ide proyek inovatif di bidang Data Analysis, UI/UX Design, dan Front-End Development. Jelaskan secara singkat setiap ide proyek, termasuk tujuan utama dan teknologi yang mungkin digunakan. ${ideaPromptInput ? `Fokus pada: ${ideaPromptInput}.` : ''} Format respons dalam poin-poin yang mudah dibaca.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiKey = ""; // Canvas will provide this at runtime
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setGeneratedIdeas(text);
      } else {
        setIdeaError("Gagal menghasilkan ide proyek. Struktur respons tidak terduga.");
        console.error("Unexpected API response structure:", result);
      }
    } catch (err) {
      setIdeaError("Terjadi kesalahan saat menghubungi Gemini API. Silakan coba lagi.");
      console.error("Error calling Gemini API:", err);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  if (loading) return <section className="py-20 text-center text-text-light dark:text-text-dark">Memuat proyek dan sertifikat...</section>;
  if (error) return <section className="py-20 text-center text-red-500">{error}</section>;

  return (
    <section id="projects" className="py-20 px-4 md:px-10 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary-dark dark:text-text-dark" data-aos="fade-up">Portofolio Saya</h2> {/* Updated title */}

        {/* Tab Navigation and LLM Feature Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10" data-aos="fade-up" data-aos-delay="200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 text-lg font-semibold rounded-l-lg transition-colors duration-300 ${
                activeTab === 'projects'
                  ? 'bg-accent-light dark:bg-accent-light text-primary-dark dark:text-primary-dark'
                  : 'bg-card-light dark:bg-card-dark text-primary-dark dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Proyek
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-6 py-3 text-lg font-semibold rounded-r-lg transition-colors duration-300 ${
                activeTab === 'certificates'
                  ? 'bg-accent-light dark:bg-accent-light text-primary-dark dark:text-primary-dark'
                  : 'bg-card-light dark:bg-card-dark text-primary-dark dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Sertifikat
            </button>
          </div>
          {/* LLM Feature Button */}
          <button
            onClick={() => setShowIdeaGenerator(!showIdeaGenerator)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-md flex items-center justify-center"
          >
            <Lightbulb size={20} className="mr-2" /> {showIdeaGenerator ? 'Sembunyikan' : 'Hasilkan Ide Proyek ✨'}
          </button>
        </div>

        {/* Project Idea Generator Section */}
        {showIdeaGenerator && (
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-8 max-w-3xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary-dark dark:text-text-dark">Hasilkan Ide Proyek ✨</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="ideaPromptInput" className="block text-left text-lg font-medium mb-2 text-primary-dark dark:text-text-dark">Fokus Tambahan (Opsional):</label>
                <textarea
                  id="ideaPromptInput"
                  rows="3"
                  value={ideaPromptInput}
                  onChange={(e) => setIdeaPromptInput(e.target.value)}
                  className="w-full p-3 rounded-lg bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-700 text-primary-dark dark:text-text-dark focus:ring-2 focus:ring-accent-light focus:border-transparent"
                  placeholder="Contoh: 'menggunakan teknologi AI terbaru', 'untuk masalah lingkungan'"
                ></textarea>
              </div>
              <button
                onClick={generateProjectIdeas}
                disabled={isGeneratingIdeas}
                className="w-full px-6 py-3 bg-accent-light dark:bg-accent-light text-primary-dark dark:text-primary-dark rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGeneratingIdeas ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menghasilkan...
                  </>
                ) : (
                  'Hasilkan Ide'
                )}
              </button>
              {ideaError && <p className="mt-4 text-center text-red-500">{ideaError}</p>}
              {generatedIdeas && (
                <div className="mt-6 p-4 bg-primary-light dark:bg-primary-dark rounded-lg text-left text-primary-dark dark:text-text-dark whitespace-pre-wrap shadow-inner">
                  <h4 className="font-semibold mb-2">Ide Proyek Anda:</h4>
                  {generatedIdeas}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <img
                    src={project.Img || `https://placehold.co/600x400/00abf0/ffffff?text=Project+${index + 1}`}
                    alt={`Gambar Proyek ${project.Title}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/00abf0/ffffff?text=Project+${index + 1}` }}
                  />
                  <div className="p-6">
                    <h4 className="text-xl md:text-2xl font-semibold text-accent-light dark:text-accent-light mb-2">{project.Title}</h4>
                    <p className="text-base text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-3">{project.Description}</p>
                    {project.TechStack && project.TechStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.TechStack.map((tech, i) => (
                          <span key={i} className="bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-light text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-center gap-4 mt-4">
                      {project.Link && (
                        <a
                          href={project.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary-dark dark:text-text-dark hover:text-accent-light dark:hover:text-accent-light transition-colors duration-300"
                          aria-label={`Link ke ${project.Title}`}
                        >
                          <LinkIcon size={20} className="mr-1" /> Demo
                        </a>
                      )}
                      {project.Github && (
                        <a
                          href={project.Github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary-dark dark:text-text-dark hover:text-accent-light dark:hover:text-accent-light transition-colors duration-300"
                          aria-label={`GitHub untuk ${project.Title}`}
                        >
                          <Github size={20} className="mr-1" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-text-secondary-light dark:text-text-secondary-dark">Belum ada proyek yang ditambahkan. Anda bisa menambahkan proyek melalui Firestore.</p>
            )}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {certificates.length > 0 ? (
              certificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <img
                    src={cert.Img || `https://placehold.co/400x300/00abf0/ffffff?text=Certificate+${index + 1}`}
                    alt={`Gambar Sertifikat ${index + 1}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/00abf0/ffffff?text=Certificate+${index + 1}` }}
                  />
                  <div className="p-4">
                    <p className="text-base font-medium text-primary-dark dark:text-text-dark">Sertifikat {index + 1}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-text-secondary-light dark:text-text-secondary-dark">Belum ada sertifikat yang ditambahkan. Anda bisa menambahkan sertifikat melalui Firestore.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  const { db, isAuthReady, userId } = useContext(FirebaseContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentName, setNewCommentName] = useState('');
  const [commentError, setCommentError] = useState('');

  // Fetch comments
  useEffect(() => {
    if (!db || !isAuthReady) {
      console.log("Firestore not ready or auth not complete for comments.");
      return;
    }

    const commentsCollectionRef = collection(db, `artifacts/${__app_id}/public/data/portfolio_comments`);
    const unsubscribe = onSnapshot(commentsCollectionRef, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort comments by created_at in descending order
      commentsData.sort((a, b) => {
        // Ensure created_at is a valid timestamp or Date object
        const dateA = a.created_at?.toDate ? a.created_at.toDate() : new Date(0);
        const dateB = b.created_at?.toDate ? b.created_at.toDate() : new Date(0);
        return dateB - dateA;
      });
      setComments(commentsData);
    }, (err) => {
      console.error("Error fetching comments:", err);
      setCommentError("Gagal memuat komentar.");
    });

    return () => unsubscribe();
  }, [db, isAuthReady, userId]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFormMessage("Semua kolom wajib diisi!");
      return;
    }

    const whatsappMessage = `Halo!%0ANama: ${name}%0AEmail: ${email}%0APesan: ${message}`;
    const whatsappLink = `https://wa.me/6287738230466?text=${whatsappMessage}`; // Replace with your WhatsApp number

    window.open(whatsappLink, '_blank');
    setFormMessage("Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.");
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleAddComment = async () => {
    if (!newCommentContent || !newCommentName) {
      setCommentError("Nama dan komentar tidak boleh kosong.");
      return;
    }
    if (!db || !isAuthReady) {
      setCommentError("Database belum siap. Coba lagi nanti.");
      return;
    }

    try {
      await addDoc(collection(db, `artifacts/${__app_id}/public/data/portfolio_comments`), {
        content: newCommentContent,
        user_name: newCommentName,
        profile_image: `https://placehold.co/40x40/cccccc/000000?text=${newCommentName.charAt(0).toUpperCase()}`, // Placeholder for profile image
        is_pinned: false, // Default to false as per policy
        created_at: new Date(),
      });
      setNewCommentContent('');
      setNewCommentName('');
      setCommentError('');
    } catch (error) {
      console.error("Error adding comment:", error);
      setCommentError("Gagal menambahkan komentar. Silakan coba lagi.");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-10 bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark"> {/* Changed background */}
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary-dark dark:text-text-dark" data-aos="fade-up">Hubungi Saya</h2>

        {/* Contact Form Card */}
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-8 max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="200"> {/* Adjusted delay */}
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary-dark dark:text-text-dark">Kirim Pesan</h3>
          <form onSubmit={handleSubmitMessage} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-left text-lg font-medium mb-2 text-primary-dark dark:text-text-dark">Nama</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-700 text-primary-dark dark:text-text-dark focus:ring-2 focus:ring-accent-light focus:border-transparent"
                placeholder="Masukkan nama Anda"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-left text-lg font-medium mb-2 text-primary-dark dark:text-text-dark">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-700 text-primary-dark dark:text-text-dark focus:ring-2 focus:ring-accent-light focus:border-transparent"
                placeholder="Masukkan email Anda"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-left text-lg font-medium mb-2 text-primary-dark dark:text-text-dark">Pesan</label>
              <textarea
                id="message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-lg bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-700 text-primary-dark dark:text-text-dark focus:ring-2 focus:ring-accent-light focus:border-transparent"
                placeholder="Tulis pesan Anda di sini"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent-light dark:bg-accent-light text-primary-dark dark:text-primary-dark rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors duration-300 shadow-md"
            >
              Kirim Pesan
            </button>
            {formMessage && <p className="mt-4 text-center text-green-500 dark:text-green-400">{formMessage}</p>}
          </form>
        </div>

        {/* Social Media Card */}
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-8 max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="400">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary-dark dark:text-text-dark">Media Sosial</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/ArshandaGN" target="_blank" rel="noopener noreferrer" className="text-accent-light dark:text-accent-light hover:text-primary-dark dark:hover:text-primary-dark bg-primary-light dark:bg-primary-dark p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href="https://www.instagram.com/arshndasvnch" target="_blank" rel="noopener noreferrer" className="text-accent-light dark:text-accent-light hover:text-primary-dark dark:hover:text-primary-dark bg-primary-light dark:bg-primary-dark p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/arshandagn" target="_blank" rel="noopener noreferrer" className="text-accent-light dark:text-accent-light hover:text-primary-dark dark:hover:text-primary-dark bg-primary-light dark:bg-primary-dark p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            {/* Add TikTok if you have one */}
            <a href="https://www.tiktok.com/@yourtiktok" target="_blank" rel="noopener noreferrer" className="text-accent-light dark:text-accent-light hover:text-primary-dark dark:hover:text-primary-dark bg-primary-light dark:bg-primary-dark p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md" aria-label="TikTok">
              <i className='bx bxl-tiktok text-2xl'></i>
            </a>
          </div>
        </div>

        {/* Comments Section Card */}
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="600"> {/* Adjusted delay */}
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary-dark dark:text-text-dark">Komentar</h3>
          {commentError && <p className="text-red-500 mb-4">{commentError}</p>}
          <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3 bg-primary-light dark:bg-primary-dark p-4 rounded-lg shadow-sm">
                  <img
                    src={comment.profile_image || `https://placehold.co/40x40/cccccc/000000?text=${comment.user_name.charAt(0).toUpperCase()}`}
                    alt={`Gambar Profil ${comment.user_name}`}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-primary-dark dark:text-text-dark">{comment.user_name}</p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{comment.content}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {comment.created_at ? new Date(comment.created_at.seconds * 1000).toLocaleString() : 'Tanggal tidak tersedia'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-secondary-light dark:text-text-secondary-dark">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="newCommentName" className="block text-left text-lg font-medium mb-2 text-primary-dark dark:text-text-dark">Nama Anda</label>
              <input
                type="text"
                id="newCommentName"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                className="w-full p-3 rounded-lg bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-700 text-primary-dark dark:text-text-dark focus:ring-2 focus:ring-accent-light focus:border-transparent"
                placeholder="Nama Anda"
                required
              />
            </div>
            <div>
              <label htmlFor="newCommentContent" className="block text-left text-lg font-medium mb-2 text-primary-dark dark:text-text-dark">Komentar Anda</label>
              <textarea
                id="newCommentContent"
                rows="3"
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                className="w-full p-3 rounded-lg bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-700 text-primary-dark dark:text-text-dark focus:ring-2 focus:ring-accent-light focus:border-transparent"
                placeholder="Tulis komentar Anda di sini"
                required
              ></textarea>
            </div>
            <button
              onClick={handleAddComment}
              className="w-full px-6 py-3 bg-accent-light dark:bg-accent-light text-primary-dark dark:text-primary-dark rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors duration-300 shadow-md"
            >
              Tambahkan Komentar
            </button>
          </div>
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
      <FirebaseProvider>
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
        <div className="font-poppins antialiased min-h-screen">
          <Header />
          <main className="pt-8"> {/* Add padding-top to account for fixed header */}
            <Home />
            <About />
            {/* <Education /> -- Removed as per request */}
            <Skills />
            <ExperienceSection />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </FirebaseProvider>
    </ThemeProvider>
  );
};

export default App;
