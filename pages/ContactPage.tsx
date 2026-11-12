import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useI18n from '../hooks/useI18n';
import { trackFormSubmit } from '../src/utils/analytics';

const ContactPage: React.FC = () => {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useSEO({
    title: 'تواصل معنا',
    description: 'تواصل مع فريق QudSchool عبر البريد أو الهاتف أو النموذج المباشر. نسعد بمساعدتك في اختيار البرنامج المناسب لطفلك.',
    path: '/contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact QudSchool',
      url: 'https://qudschool.com/contact',
      about: { '@id': 'https://qudschool.com/#organization' },
      inLanguage: 'ar',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes('@') || !form.message) {
      setStatus('error');
      trackFormSubmit({ formId: 'contact', success: false });
      return;
    }
    setStatus('sending');
    // Placeholder: integrate with backend/email service later
    setTimeout(() => {
      setStatus('success');
      trackFormSubmit({ formId: 'contact', success: true, context: form.subject || 'general' });
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  const contactItems = [
    { icon: Mail, labelKey: 'contactPage.email', value: 'hello@qudschool.com', href: 'mailto:hello@qudschool.com' },
    { icon: Phone, labelKey: 'contactPage.phone', value: '+20 100 000 0000', href: 'tel:+201000000000' },
    { icon: MessageCircle, labelKey: 'contactPage.whatsapp', value: '+20 100 000 0000', href: 'https://wa.me/201000000000' },
    { icon: MapPin, labelKey: 'contactPage.location', value: t('contactPage.locationValue'), href: null },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="mx-auto mb-6 h-12 w-12 text-blue-200" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">{t('contactPage.hero.title')}</h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 leading-relaxed">{t('contactPage.hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('contactPage.info.title')}</h2>
              {contactItems.map((item) => (
                <div key={item.labelKey} className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{t(item.labelKey)}</div>
                    {item.href ? (
                      <a href={item.href} className="text-base font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 break-all">{item.value}</a>
                    ) : (
                      <div className="text-base font-bold text-gray-900 dark:text-white">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-5">
                <Clock className="h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <div className="font-bold text-gray-900 dark:text-white mb-1">{t('contactPage.hours.title')}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{t('contactPage.hours.value')}</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('contactPage.form.title')}</h2>

                {status === 'success' && (
                  <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 dark:bg-green-900/20 p-4 text-green-700 dark:text-green-300">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    <span className="font-semibold">{t('contactPage.form.success')}</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-900/20 p-4 text-red-700 dark:text-red-300 font-semibold">
                    {t('contactPage.form.error')}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('contactPage.form.name')} *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('contactPage.form.email')} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition rtl:text-right"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t('contactPage.form.subject')}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t('contactPage.form.message')} *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-y"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-2 w-full md:w-auto rounded-full bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
                    {status === 'sending' ? t('contactPage.form.sending') : t('contactPage.form.send')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
