import  { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import NavLink from './components/NavLink';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay before showing content for smoother transition
      setTimeout(() => setContentVisible(true), 100);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen bg-zinc-950 text-white transition-opacity duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <header className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <nav className="absolute top-0 left-0 right-0 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">LA</h1>
            <div className="flex gap-8">
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
          </div>
        </nav>
        
        <div className="space-y-6">
          <h2 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Lucio Andrés
          </h2>
          <h3 className="text-3xl sm:text-4xl font-semibold text-zinc-300">
            Frontend Developer
          </h3>
          <p className="max-w-2xl text-lg text-zinc-400">
            I craft exceptional digital experiences with modern technologies.
            Specialized in building scalable applications with React, Next.js, Javascript and Typescript.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/luciomrod" target="_blank" rel="noopener noreferrer" 
                className="p-2 hover:text-purple-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/lucioandresmr/" target="_blank" rel="noopener noreferrer"
                className="p-2 hover:text-purple-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:luciomedinawork@gmail.com"
                className="p-2 hover:text-purple-400 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard 
            title="E-Commerce Platform"
            description="Designed and developed an e-commerce platform using Bootstrap templates."
            image="./images/hardbyte.jpg"
            tech={['Javascript', 'HTML', 'CSS', 'Bootstrap']}
            demoUrl="https://hardbyte.vercel.app/index.html"
            githubUrl="https://github.com/luciomrod/hardbyte"
          />
          <ProjectCard 
            title="Psychologist Portfolio"
            description="Designed and developed a Portfolio website for a psychologist made with Next.js and shadCn."
            image="./images/psico.jpg"
            tech={['Next.js', 'Typescript', 'Tailwind CSS', 'shadCn']}
            demoUrl="https://hardbyte.vercel.app/index.html"
            githubUrl="https://github.com/luciomrod/ivon-landing"
          />
                    <ProjectCard 
            title="Branca Real Estate"
            description="Designed and developed a real estate website with using Bootstrap, HTML, and CSS."
            image="./images/inmobiliaria.jpg"
            tech={['HTML', 'CSS']}
            demoUrl="https://branca-inmobiliaria.vercel.app/"
            githubUrl="https://github.com/luciomrod/branca-inmobiliaria"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-zinc-900 rounded-lg shadow-2xl text-zinc-300 relative overflow-hidden md:rounded-3xl md:shadow-3xl md:bg-zinc-950">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="./images/lucio.jpg" 
              alt="Profile"
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">About Me</h2>
            <p className="text-zinc-300">
              With over 1 year of experience in frontend web development, I specialize in creating
              performant and scalable web applications. I'm passionate about clean code,
              user experience, and solving complex problems.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Tech Stack</h3>
                <ul className="text-zinc-400">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⇲</h3>
                <ul className="text-zinc-400">
                  <li>Bootstrap</li>
                  <li>Shadcn</li>
                  <li>WordPress</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">Let's Connect</h2>
          <p className="text-zinc-300">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <a 
            href="mailto:luciomedinawork@gmail.com"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get in Touch
            <Mail size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-zinc-500 border-t border-zinc-800">
        <p>© 2024 Lucio Andrés. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;