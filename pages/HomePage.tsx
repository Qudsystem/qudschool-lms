import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { IconAcademicCap, IconSparkles, IconChatBubbleLeftRight, mockTestimonials } from '../constants';
import { Send, RotateCw } from 'lucide-react';
import { FeatureItem, ChatMessage, ChatRole, Testimonial } from '../types';
import { GeminiService } from '../services/GeminiService';
import useI18n from '../hooks/useI18n';
import StarRating from '../components/StarRating';
import LearningPathSection from '../components/LearningPathSection';
import ProjectsGallerySection from '../components/ProjectsGallerySection';
import HeroSection from '../components/HeroSection';
import { Target, Monitor, GraduationCap, Users, Rocket, Trophy, HeartHandshake, Gamepad2, Bot, Code, Smartphone } from 'lucide-react';
import HeroGallerySection from '../components/HeroGallerySection';
// New sections from @landpage files
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import ProgramsSection from '../components/ProgramsSection';
import AboutSection from '../components/AboutSection';
import ContactFormSection from '../components/ContactFormSection';
import PartnersSection from '../components/PartnersSection';
import StatsAndBrandsSection from '../components/StatsAndBrandsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import PricingPlansSection from '../components/PricingPlansSection';
import FutureProgrammersSection from '../components/FutureProgrammersSection';
import PlatformMarketingSection from '../components/PlatformMarketingSection';
import AdvancedStatsSection from '../components/AdvancedStatsSection';
import StudentPortfolioSection from '../components/StudentPortfolioSection';
import CertificationSection from '../components/CertificationSection';
import TeamSection from '../components/TeamSection';
import useSEO from '../hooks/useSEO';

const geminiService = new GeminiService();

const AiTutorSection: React.FC = () => {
  const { t } = useI18n();
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'ok' | 'missing'>('checking');
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process && process.env && process.env.API_KEY) {
        setApiKeyStatus('ok');
    } else {
        setApiKeyStatus('missing');
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (prompt?: string) => {
    const messageText = prompt || input;
    if (!messageText.trim() || isLoading || apiKeyStatus !== 'ok') return;

    const userMessage: ChatMessage = { role: ChatRole.USER, text: messageText, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Add a placeholder for the streaming response
    const modelMessagePlaceholder: ChatMessage = { role: ChatRole.MODEL, text: '', timestamp: new Date(), isStreaming: true };
    setMessages(prev => [...prev, modelMessagePlaceholder]);

    try {
        const stream = geminiService.generateTextStream(`As an AI Tutor, answer this student's question: ${messageText}`);
        let fullResponse = '';
        for await (const chunk of stream) {
            fullResponse += chunk;
            setMessages(prev => prev.map((msg, index) => 
                index === prev.length - 1 ? { ...msg, text: fullResponse } : msg
            ));
        }
        // Final update to mark streaming as complete
        setMessages(prev => prev.map((msg, index) => 
            index === prev.length - 1 ? { ...msg, isStreaming: false, timestamp: new Date() } : msg
        ));
    } catch (err: any) {
        console.error("AI Tutor Error:", err);
        const errorMessage = err.message || t('homePage.aiTutor.error.default');
        setError(errorMessage);
        setMessages(prev => prev.map((msg, index) => 
            index === prev.length - 1 ? { role: ChatRole.MODEL, text: errorMessage, timestamp: new Date(), isStreaming: false } : msg
        ));
    } finally {
        setIsLoading(false);
    }
  }, [input, isLoading, apiKeyStatus, t]);

  const handleResetChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setInput('');
  }, []);

  const suggestedPrompts = [
      'homePage.aiTutor.prompt1',
      'homePage.aiTutor.prompt2',
      'homePage.aiTutor.prompt3'
  ];

  if (apiKeyStatus === 'checking') {
    return (
        <section className="py-16 bg-primary-light dark:bg-primary-dark">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">{t('homePage.aiTutor.title')}</h2>
                <p className="text-lg text-teal-100 dark:text-teal-300">{t('homePage.aiTutor.checkingApiKey')}</p>
            </div>
        </section>
    );
  }
  
  if (apiKeyStatus === 'missing') {
    return (
        <section className="py-16 bg-red-100 dark:bg-red-900/30">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-red-700 dark:text-red-300 sm:text-4xl mb-4">{t('homePage.aiTutor.unavailableTitle')}</h2>
                <p className="text-lg text-red-600 dark:text-red-400">
                    {t('homePage.aiTutor.unavailableDesc')}
                </p>
                 <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {t('homePage.aiTutor.unavailableDevNote')}
                </p>
            </div>
        </section>
    );
  }


  return (
    <section className="py-16 bg-primary-light dark:bg-primary-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {t('homePage.aiTutor.title')}
          </h2>
          <p className="mt-4 text-lg text-teal-100 dark:text-teal-300">
            {t('homePage.aiTutor.subtitle')}
          </p>
        </div>

        <Card className="shadow-2xl">
          <div ref={chatContainerRef} className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-700 rounded-t-xl">
            {messages.length === 0 && (
              <div className="text-center text-neutral-DEFAULT dark:text-gray-400 py-10">
                <IconChatBubbleLeftRight className="h-16 w-16 text-gray-300 dark:text-gray-500 mx-auto mb-4" />
                <p>{t('homePage.aiTutor.placeholder.line1')}</p>
                <p className="text-sm">{t('homePage.aiTutor.placeholder.line2')}</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                    msg.role === ChatRole.USER 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-neutral-dark dark:text-neutral-light'
                  } ${msg.text.startsWith("Sorry, I couldn't process your request") || msg.text.startsWith(t('homePage.aiTutor.error.default')) ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : ''}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}{msg.isStreaming && <span className="blinking-cursor"></span>}</p>
                  {!msg.isStreaming &&
                    <p className={`text-xs mt-1 ${msg.role === ChatRole.USER ? 'text-teal-200' : 'text-gray-500 dark:text-gray-400'} text-right`}>
                        {msg.timestamp.toLocaleTimeString()}
                    </p>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 rounded-b-xl">
            {/* تذييل متطابق مع استدارة البطاقة الخارجية (rounded-xl) */}
            {error && <p className="text-red-500 dark:text-red-400 text-sm mb-2 text-center">{error}</p>}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('homePage.aiTutor.inputPlaceholder')}
                className="flex-grow p-3 bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light dark:placeholder-gray-400"
                disabled={isLoading}
              />
              <Button onClick={() => handleSendMessage()} disabled={isLoading || !input.trim()} aria-label="إرسال" className="bg-secondary hover:bg-secondary-dark w-11 h-11 p-0 shrink-0">
                {isLoading ? <RotateCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ltr:-translate-x-px rtl:-scale-x-100" />}
              </Button>
               <Button onClick={handleResetChat} variant="ghost" disabled={isLoading} aria-label={t('homePage.aiTutor.resetChatTitle')} title={t('homePage.aiTutor.resetChatTitle')} className="w-11 h-11 p-0 shrink-0">
                 <RotateCw className="w-5 h-5" />
              </Button>
            </div>
             <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {suggestedPrompts.map(promptKey => (
                    <Button key={promptKey} size="sm" variant="outline" onClick={() => handleSendMessage(t(promptKey))} disabled={isLoading}>
                        {t(promptKey)}
                    </Button>
                ))}
            </div>
          </div>
        </Card>
        <style>{`
          .blinking-cursor {
            display: inline-block;
            width: 8px;
            height: 1.2em;
            background-color: #0D9488;
            animation: blink 1s step-end infinite;
            margin-left: 2px;
            vertical-align: sub;
          }
          @keyframes blink {
            50% {
              background-color: transparent;
            }
          }
        `}</style>
      </div>
    </section>
  );
};




const CallToActionSection: React.FC = () => {
  const { t } = useI18n();
  const appName = t('app.name');
  return (
  <section className="py-16 bg-gray-50 dark:bg-neutral-dark">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-4xl">
        {t('homePage.cta.title')}
      </h2>
      <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
        {t('homePage.cta.subtitle', { appName: appName })}
      </p>
      <div className="mt-8">
        <Link to="/auth">
          <Button size="lg" className="bg-secondary hover:bg-secondary-dark">
            {t('homePage.cta.signUp')}
          </Button>
        </Link>
      </div>
    </div>
  </section>
  );
};



// How It Works Section - New
const HowItWorksSection: React.FC = () => {
  const { t } = useI18n();
  
  const steps = [
    {
      number: '01',
      titleKey: 'homePage.howItWorks.step1.title',
      descKey: 'homePage.howItWorks.step1.desc',
      icon: <Target className="mx-auto text-primary dark:text-primary-light" size={56} strokeWidth={1.5} />,
    },
    {
      number: '02',
      titleKey: 'homePage.howItWorks.step2.title',
      descKey: 'homePage.howItWorks.step2.desc',
      icon: <Monitor className="mx-auto text-primary dark:text-primary-light" size={56} strokeWidth={1.5} />,
    },
    {
      number: '03',
      titleKey: 'homePage.howItWorks.step3.title',
      descKey: 'homePage.howItWorks.step3.desc',
      icon: <GraduationCap className="mx-auto text-primary dark:text-primary-light" size={56} strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-4xl">
            {t('homePage.howItWorks.title')}
          </h2>
          <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
            {t('homePage.howItWorks.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-8 text-center h-full" hoverEffect>
                <div className="mb-4 flex items-center justify-center">{step.icon}</div>
                <div className="text-5xl font-bold text-primary dark:text-primary-light mb-4 opacity-40 dark:opacity-30">{step.number}</div>
                <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-neutral-DEFAULT dark:text-gray-400">
                  {t(step.descKey)}
                </p>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 ltr:-left-4 rtl:-left-4 transform -translate-y-1/2 z-10">
                  <div className="text-primary text-3xl">←</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits Section - New
const BenefitsSection: React.FC = () => {
  const { t } = useI18n();
  const appName = t('app.name');
  
  const benefits = [
    {
      icon: <Users className="mx-auto text-primary dark:text-primary-light" size={44} strokeWidth={1.5} />,
      titleKey: 'homePage.benefits.liveSessions',
      descKey: 'homePage.benefits.liveSessions.desc',
    },
    {
      icon: <Rocket className="mx-auto text-primary dark:text-primary-light" size={44} strokeWidth={1.5} />,
      titleKey: 'homePage.benefits.projects',
      descKey: 'homePage.benefits.projects.desc',
    },
    {
      icon: <Trophy className="mx-auto text-primary dark:text-primary-light" size={44} strokeWidth={1.5} />,
      titleKey: 'homePage.benefits.certificate',
      descKey: 'homePage.benefits.certificate.desc',
    },
    {
      icon: <HeartHandshake className="mx-auto text-primary dark:text-primary-light" size={44} strokeWidth={1.5} />,
      titleKey: 'homePage.benefits.support',
      descKey: 'homePage.benefits.support.desc',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-4xl">
            {t('homePage.benefits.title', { appName })}
          </h2>
          <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
            {t('homePage.benefits.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 text-center" hoverEffect>
              <div className="mb-4 flex items-center justify-center">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light mb-2">
                {t(benefit.titleKey)}
              </h3>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t(benefit.descKey)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Curriculum Highlights Section - New
const CurriculumSection: React.FC = () => {
  const { t } = useI18n();
  
  const grades = [
    {
      name: t('homePage.curriculum.grade1-2'),
      desc: t('homePage.curriculum.grade1-2.desc'),
      color: 'from-purple-400 to-pink-400',
      icon: <Gamepad2 size={28} strokeWidth={1.8} />,
    },
    {
      name: t('homePage.curriculum.grade3-4'),
      desc: t('homePage.curriculum.grade3-4.desc'),
      color: 'from-blue-400 to-cyan-400',
      icon: <Bot size={28} strokeWidth={1.8} />,
    },
    {
      name: t('homePage.curriculum.grade5-6'),
      desc: t('homePage.curriculum.grade5-6.desc'),
      color: 'from-green-400 to-teal-400',
      icon: <Code size={28} strokeWidth={1.8} />,
    },
    {
      name: t('homePage.curriculum.grade7-8'),
      desc: t('homePage.curriculum.grade7-8.desc'),
      color: 'from-orange-400 to-red-400',
      icon: <Smartphone size={28} strokeWidth={1.8} />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-neutral-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-4xl">
            {t('homePage.curriculum.title')}
          </h2>
          <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
            {t('homePage.curriculum.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {grades.map((grade, index) => (
            <Card key={index} className="overflow-hidden" hoverEffect>
              <div className={`bg-gradient-to-r ${grade.color} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="text-white">{grade.icon}</div>
                  <h3 className="text-xl font-bold">{grade.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-DEFAULT dark:text-gray-300">{grade.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 text-xs rounded-full">
                    {t('homePage.curriculum.beginner')}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full">
                    {t('homePage.curriculum.advanced')}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-xs rounded-full">
                    {t('homePage.curriculum.expert')}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/pricing">
            <Button size="lg" className="bg-secondary hover:bg-secondary-dark">
              {t('homePage.hero.viewPricing')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};



const HomePage: React.FC = () => {
  useSEO({
    title: 'منصة تعليم البرمجة والذكاء الاصطناعي للأطفال',
    description: 'QudSchool (كود سكول) — منصة تعليمية مدعومة بالذكاء الاصطناعي لتعليم الأطفال واليافعين البرمجة والروبوتات وتطوير الألعاب. أكثر من 2,000 طالب يتعلم معنا.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'QudSchool Learning Programs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Primary Stage Programming' },
        { '@type': 'ListItem', position: 2, name: 'Game Development Program' },
        { '@type': 'ListItem', position: 3, name: 'AI Classroom Program' },
        { '@type': 'ListItem', position: 4, name: 'Robotics & STEM Program' },
        { '@type': 'ListItem', position: 5, name: 'Future Programmers Track' },
      ],
    },
  });
  return (
    <div className="-mt-16">
      {/* Hero Section with Slideshow */}
      <HeroSection />

      {/* Hero Gallery Section (moved from Hero) */}
      <HeroGallerySection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Platform Marketing Section */}
      <PlatformMarketingSection />
      
      {/* Advanced Stats Section */}
      <AdvancedStatsSection />
      
      {/* About Section from @landpage files */}
      <AboutSection />
      
      {/* Features Section from @landpage files */}
      <FeaturesSection />
      
      {/* Why Choose Us Section from @landpage files */}
      <WhyChooseUsSection />
      
      {/* Stats and Brands Section */}
      <StatsAndBrandsSection />
      
      {/* Programs Section from @landpage files */}
      <ProgramsSection />
      
      {/* Benefits Section (existing) */}
      <BenefitsSection />
      
      {/* How It Works Section (existing) */}
      <HowItWorksSection />
      
      {/* Curriculum Section (existing) */}
      <CurriculumSection />
      
      {/* Learning Path Section (existing) */}
      <LearningPathSection />
      
      {/* Pricing Plans Section */}
      <PricingPlansSection />
      
      {/* Projects Gallery Section (existing) */}
      <ProjectsGallerySection />
      
      {/* Future Programmers Section */}
      <FutureProgrammersSection />
      
      {/* Student Portfolio Section */}
      <StudentPortfolioSection />
      
      {/* Certification Section */}
      <CertificationSection />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Partners Section from @landpage files */}
      <PartnersSection />
      
      {/* AI Tutor Section (existing) */}
      <AiTutorSection />
      
      {/* Testimonials Section from @landpage files */}
      <TestimonialsSection />
      
      {/* FAQ Section from @landpage files */}
      <FAQSection />
      
      {/* Contact Form Section from @landpage files */}
      <ContactFormSection />
      
      {/* Call to Action Section (existing) */}
      <CallToActionSection />
    </div>
  );
};

export default HomePage;
