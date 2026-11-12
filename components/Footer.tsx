import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconAcademicCap, FOOTER_LINKS, COMPANY_LINKS } from '../constants';
import useI18n from '../hooks/useI18n';
import SocialFlipButton from './ui/social-flip-button';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { trackFormSubmit, trackOutboundClick } from '../src/utils/analytics';

interface FooterProps {
  appName: string; // appName will be pre-translated
}

const Footer: React.FC<FooterProps> = ({ appName }) => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribeStatus('success');
      trackFormSubmit({ formId: 'newsletter', success: true });
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } else {
      setSubscribeStatus('error');
      trackFormSubmit({ formId: 'newsletter', success: false });
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-neutral-dark text-neutral-light border-t border-gray-700 dark:border-gray-800 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About & Social Media */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block group mb-4">
              {/* Logo with Google colors */}
              <div className="flex items-baseline" style={{ direction: 'ltr' }}>
                {/* Qud with كودسكول below it */}
                <div className="relative">
                  <span className="text-xl md:text-2xl font-bold text-blue-500">Qud</span>
                  <span className="absolute -bottom-3 ltr:left-0 rtl:right-0 text-sm text-gray-400 dark:text-gray-300 font-arabic whitespace-nowrap" style={{ textDecoration: 'none', letterSpacing: '0.5px' }}>كودسكول</span>
                </div>
                {/* School with colored letters */}
                <div className="flex text-xl md:text-2xl font-bold">
                  <span className="text-[#EA4335] inline-block">S</span>
                  <span className="text-[#4285F4] inline-block">c</span>
                  <span className="text-[#34A853] inline-block">h</span>
                  <span className="text-[#FBBC05] inline-block">o</span>
                  <span className="text-[#EA4335] inline-block">o</span>
                  <span className="text-[#4285F4] inline-block">l</span>
                </div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 dark:text-gray-300 mb-6">
              {t('footer.empoweringMinds')}
            </p>
            {/* Social Media — animated hover buttons */}
            <SocialFlipButton
              itemClassName="h-9 w-9"
              items={[
                { icon: <FaFacebook />, label: 'Facebook', href: 'https://facebook.com', brandBg: 'bg-[#1877F2]' },
                { icon: <FaTwitter />, label: 'Twitter', href: 'https://twitter.com', brandBg: 'bg-[#1DA1F2]' },
                { icon: <FaInstagram />, label: 'Instagram', href: 'https://instagram.com', brandBg: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
                { icon: <FaYoutube />, label: 'YouTube', href: 'https://youtube.com', brandBg: 'bg-[#FF0000]' },
                { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com', brandBg: 'bg-[#0A66C2]' },
                { icon: <FaGithub />, label: 'GitHub', href: 'https://github.com', brandBg: 'bg-[#24292e]' },
                { icon: <FaEnvelope />, label: 'Email', href: 'mailto:qudschool.edu@gmail.com', brandBg: 'bg-primary' },
              ]}
            />
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 dark:text-gray-400 tracking-wider uppercase mb-4">{t('footer.navigation')}</h3>
            <ul role="list" className="space-y-2">
              {FOOTER_LINKS.map((item) => (
                <li key={item.labelKey}>
                  <Link to={item.path} className="text-sm text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors duration-150">
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 dark:text-gray-400 tracking-wider uppercase mb-4">{t('footer.company')}</h3>
            <ul role="list" className="space-y-2">
              {COMPANY_LINKS.map((item) => (
                <li key={item.labelKey}>
                  <Link to={item.path} className="text-sm text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors duration-150">
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 dark:text-gray-400 tracking-wider uppercase mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-400">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-gray-400" dir="ltr">{t('footer.phone')}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:qudschool.edu@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('footer.email')}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 dark:text-gray-400 tracking-wider uppercase mb-4">{t('footer.newsletter')}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.newsletterDesc')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full font-medium transition-colors duration-300"
              >
                {t('footer.subscribe')}
              </button>
              {subscribeStatus === 'success' && (
                <p className="text-sm text-green-400 mt-2">{t('footer.subscribeSuccess')}</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="text-sm text-red-400 mt-2">{t('footer.subscribeError')}</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center md:text-left">
              {t('footer.copyright', {year: currentYear, appName: appName})}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <span>•</span>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">
                {t('footer.termsOfService')}
              </Link>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('footer.madeInEgypt')} <span className="mx-1">|</span> {t('footer.poweredByQudSystem')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;