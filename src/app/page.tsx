
import './globals.css';
import HeroSection from '@/components/HeroSection';
import AboutMe from '@/components/AboutMe'; 
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutMe />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
