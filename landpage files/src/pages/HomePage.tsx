import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Programs from '../components/Programs';
import Stats from '../components/Stats';
import LearningPath from '../components/LearningPath';
import PricingPlans from '../components/PricingPlans';
import StudentShowcase from '../components/StudentShowcase';
import ProjectsGallery from '../components/ProjectsGallery';
import StatsAndBrands from '../components/StatsAndBrands';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQ from '../components/FAQ';
import ProfileSection from '../components/ProfileSection';
import CertificateSection from '../components/CertificateSection';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import TeamSection from '../components/TeamSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const HomePage = () => {
  // Smooth scroll function for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && document.querySelector(anchor.hash)) {
        e.preventDefault();
        
        const section = document.querySelector(anchor.hash);
        if (section) {
          window.scrollTo({
            top: section.getBoundingClientRect().top + window.pageYOffset - 80,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.classList.add('lazy-loaded');
            imageObserver.unobserve(image);
          }
        });
      });
      
      lazyImages.forEach(img => {
        img.classList.add('lazy-load');
        imageObserver.observe(img);
      });
    }
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Features />
      <Programs />
      <Stats />
      <LearningPath />
      <PricingPlans />
      <StudentShowcase />
      <ProjectsGallery />
      <StatsAndBrands />
      <WhyChooseUs />
      <ProfileSection />
      <CertificateSection />
      <TeamSection />
      <FAQ />
      <Testimonials />
      <Partners />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default HomePage;
