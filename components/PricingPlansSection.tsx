import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Award, Check, Smile, TrendingUp } from '../lucide-icons';
import useI18n from '../hooks/useI18n';
import { trackPlanClick } from '../src/utils/analytics';

interface PlanTemplate {
  tier: 'basic' | 'standard' | 'premium';
  color: string;
  popularBadge?: boolean;
  discountBadge?: boolean;
  recommended?: boolean;
  featureKeys: string[];
}

const planTemplates: PlanTemplate[] = [
  {
    tier: 'basic',
    color: 'blue',
    discountBadge: true,
    featureKeys: ['basicConcepts', 'problemSolving', 'interactiveActivities', 'certificate', 'continuousSupport'],
  },
  {
    tier: 'standard',
    color: 'purple',
    popularBadge: true,
    recommended: true,
    featureKeys: ['allBasicFeatures', 'advancedProjects', 'simpleGames', 'extraLessons', 'evaluationSystem', 'interactivePlatform', 'workshops'],
  },
  {
    tier: 'premium',
    color: 'indigo',
    featureKeys: ['allStandardFeatures', 'professionalProjects', 'privateSessions', 'logicalThinking', 'certifiedCertificate', 'competitions', 'support24_7', 'projectExhibitions'],
  },
];

// price + originalPrice per grade
const pricesByGrade: Record<string, { basic: [string, string]; standard: string; premium: string }> = {
  '6-7':   { basic: ['249', '349'], standard: '499', premium: '699' },
  '8-9':   { basic: ['279', '379'], standard: '529', premium: '749' },
  '10-11': { basic: ['299', '399'], standard: '549', premium: '799' },
  '12-13': { basic: ['329', '429'], standard: '599', premium: '849' },
  '14-15': { basic: ['359', '459'], standard: '649', premium: '899' },
  '16-17': { basic: ['399', '499'], standard: '699', premium: '949' },
};

const gradeIds = ['6-7', '8-9', '10-11', '12-13', '14-15', '16-17'];

const comparisonFeatureKeys = [
  'basicConcepts', 'problemSolving', 'interactiveActivities', 'certificate', 'continuousSupport',
  'advancedProjects', 'simpleGames', 'extraLessons', 'evaluationSystem', 'interactivePlatform', 'workshops',
  'professionalProjects', 'privateSessions', 'logicalThinking', 'certifiedCertificate', 'competitions', 'support24_7', 'projectExhibitions',
];

interface PricingPlan {
  id: string;
  tier: 'basic' | 'standard' | 'premium';
  color: string;
  popularBadge?: boolean;
  discountBadge?: boolean;
  recommended?: boolean;
  price: string;
  originalPrice?: string;
  months: number;
  featureKeys: string[];
}

const PricingPlansSection = () => {
  const { t } = useI18n();
  const [selectedGrade, setSelectedGrade] = useState('6-7');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [paymentType, setPaymentType] = useState<'oneTime' | 'monthly'>('oneTime');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const gradeOptions = gradeIds.map(id => ({ id, labelKey: `pricing.grades.${id}` }));

  const buildPlans = (grade: string): PricingPlan[] => {
    const p = pricesByGrade[grade];
    const monthByTier = { basic: 3, standard: 6, premium: 9 };
    return planTemplates.map(tpl => {
      const price = tpl.tier === 'basic' ? p.basic[0] : tpl.tier === 'standard' ? p.standard : p.premium;
      const originalPrice = tpl.tier === 'basic' ? p.basic[1] : undefined;
      return {
        id: `${tpl.tier}-${grade}`,
        tier: tpl.tier,
        color: tpl.color,
        popularBadge: tpl.popularBadge,
        discountBadge: tpl.discountBadge,
        recommended: tpl.recommended,
        price,
        originalPrice,
        months: monthByTier[tpl.tier],
        featureKeys: tpl.featureKeys,
      };
    });
  };

  const currentPlans = buildPlans(selectedGrade);

  const hasFeature = (plan: PricingPlan, featureKey: string) => plan.featureKeys.includes(featureKey);

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border' | 'shadow' | 'hover-bg') => {
    const colors: Record<string, Record<string, string>> = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-600 dark:border-blue-400', shadow: 'shadow-blue-200 dark:shadow-blue-900/30', 'hover-bg': 'hover:bg-blue-700' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-600 dark:border-purple-400', shadow: 'shadow-purple-200 dark:shadow-purple-900/30', 'hover-bg': 'hover:bg-purple-700' },
      indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-600 dark:border-indigo-400', shadow: 'shadow-indigo-200 dark:shadow-indigo-900/30', 'hover-bg': 'hover:bg-indigo-700' },
    };
    return colors[color]?.[type] || colors.blue[type];
  };

  const getGradientClass = (color: string) => {
    const gradients: Record<string, string> = {
      blue: 'bg-gradient-to-br from-blue-500 to-blue-700',
      purple: 'bg-gradient-to-br from-purple-500 to-purple-700',
      indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    };
    return gradients[color] || gradients.blue;
  };

  const pricePerSessionKey = (tier: string, grade: string) =>
    grade === '6-7' ? `pricing.plans.${tier}.pricePerSession` : `pricing.plans.${tier}.pricePerSession${grade}`;

  const getMonthlyPrice = (plan: PricingPlan) => Math.ceil(parseInt(plan.price) / plan.months).toString();
  const getOriginalMonthlyPrice = (plan: PricingPlan) => plan.originalPrice ? Math.ceil(parseInt(plan.originalPrice) / plan.months).toString() : null;
  const getDisplayPrice = (plan: PricingPlan) => paymentType === 'monthly' ? getMonthlyPrice(plan) : plan.price;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="pricing" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">{t('pricing.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">{t('pricing.subtitle')}</p>

          <div className="inline-flex items-center bg-white dark:bg-gray-800 p-1 rounded-full shadow-md mb-6">
            <button onClick={() => setPaymentType('oneTime')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${paymentType === 'oneTime' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'}`}>
              {t('pricing.paymentType.oneTime')}
            </button>
            <button onClick={() => setPaymentType('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${paymentType === 'monthly' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'}`}>
              {t('pricing.paymentType.monthly')}
            </button>
          </div>
        </div>

        {/* Grade Selection */}
        <div className={`mb-8 max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-1">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {gradeOptions.map((option) => (
                  <button key={option.id} onClick={() => setSelectedGrade(option.id)}
                    className={`py-3 px-2 text-sm md:text-base transition-all duration-300 rounded-xl ${selectedGrade === option.id ? 'bg-blue-600 text-white font-medium shadow-lg scale-105 z-10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    {t(option.labelKey)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Special Classes Label */}
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full shadow-md border border-blue-200 dark:bg-gray-800 dark:text-blue-300 dark:border-gray-700 dark:shadow-gray-900/40">
            <Smile className="ltr:mr-2 rtl:ml-2 text-blue-800 dark:text-blue-300" size={24} />
            <div>
              <span className="font-bold ltr:mr-2 rtl:ml-2">{t('pricing.specialClasses')}</span>
              <span className="ltr:ml-1 rtl:mr-1">{t('pricing.oneOnOne')}</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={`flex flex-col lg:flex-row justify-center gap-6 lg:gap-4 xl:gap-6 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
          {currentPlans.map((plan) => (
            <div key={plan.id}
              className={`flex-1 rounded-2xl md:rounded-3xl overflow-hidden transform transition-all duration-500 relative ${plan.recommended ? 'lg:-mt-4 lg:mb-4 shadow-xl' : 'shadow-lg hover:shadow-xl'} ${plan.recommended ? `${getColorClass(plan.color, 'shadow')} border-t-4 ${getColorClass(plan.color, 'border')}` : 'border border-gray-200 dark:border-gray-700'} ${plan.recommended ? 'hover:scale-105' : 'hover:scale-102'}`}
              style={{ maxWidth: '450px', margin: '0 auto' }}>
              {plan.popularBadge && (
                <div className={`absolute top-0 ltr:left-0 rtl:right-0 ${getGradientClass(plan.color)} text-white text-xs font-bold py-1 px-3 ltr:rounded-br-lg rtl:rounded-bl-lg z-10`}>
                  <TrendingUp className="inline-block ltr:mr-1 rtl:ml-1" size={14} />
                  {t('pricing.badges.mostPopular')}
                </div>
              )}
              {plan.discountBadge && plan.originalPrice && (
                <div className="absolute top-0 ltr:right-0 rtl:left-0 bg-red-500 text-white text-xs font-bold py-1 px-3 ltr:rounded-bl-lg rtl:rounded-br-lg z-10">
                  {t('pricing.badges.discount')} {Math.round(((parseInt(plan.originalPrice) - parseInt(plan.price)) / parseInt(plan.originalPrice)) * 100)}%
                </div>
              )}
              {plan.recommended && (
                <div className="absolute top-6 left-0 right-0 text-center z-10">
                  <div className={`${getGradientClass(plan.color)} text-white text-xs font-bold py-1 px-3 inline-block rounded-full shadow-md transform -rotate-2`}>
                    <Award size={14} className="inline-block ltr:mr-1 rtl:ml-1" />
                    {t('pricing.badges.recommended')}
                  </div>
                </div>
              )}

              <div className={`bg-white dark:bg-gray-800 p-6 ${plan.recommended ? 'pt-14' : 'pt-10'}`}>
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-1 ${getColorClass(plan.color, 'text')}`}>{t(`pricing.plans.${plan.tier}.title`)}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t(`pricing.plans.${plan.tier}.description`)}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 mb-6 text-center">
                  <div className="flex items-center justify-center">
                    {plan.originalPrice && paymentType === 'oneTime' && (
                      <span className="text-gray-400 line-through text-lg mx-2">{plan.originalPrice}</span>
                    )}
                    {plan.originalPrice && paymentType === 'monthly' && (
                      <span className="text-gray-400 line-through text-lg mx-2">{getOriginalMonthlyPrice(plan)}</span>
                    )}
                    <span className="text-5xl font-bold text-gray-800 dark:text-white">{getDisplayPrice(plan)}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-lg mt-2 ltr:ml-1 rtl:mr-1">{t('pricing.currency')}</span>
                  </div>
                  {paymentType === 'monthly' && (
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2">{t('pricing.perMonth')}</p>
                  )}
                  {paymentType === 'oneTime' && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{t(pricePerSessionKey(plan.tier, selectedGrade))}</p>
                  )}
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300"><span className="font-medium">{t(`pricing.plans.${plan.tier}.duration`)}</span></div>
                    <div className="text-sm text-gray-600 dark:text-gray-300"><span className="font-medium">{t(`pricing.grades.${selectedGrade}`)}</span></div>
                  </div>
                  {paymentType === 'monthly' && (
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">💳 {t('pricing.monthlyPayment')}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <p className="font-medium text-gray-800 dark:text-white mb-3">{t('pricing.curriculumIncludes')}</p>
                  {plan.featureKeys.map((fk, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className={`mt-1 ltr:mr-2 rtl:ml-2 p-1 rounded-full ${getColorClass(plan.color, 'bg')} text-white`}>
                        <Check size={12} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{t(`pricing.features.${fk}`)}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => trackPlanClick({ planId: `${plan.tier}-${selectedGrade}`, planName: t(`pricingPlans.tier.${plan.tier}.title`) })}
                  className={`w-full py-3 rounded-full font-bold text-white transition-all duration-300 ${getGradientClass(plan.color)} ${getColorClass(plan.color, 'hover-bg')} hover:shadow-lg`}
                >
                  {plan.recommended ? t('pricing.selectPlan') : t('pricing.subscribeNow')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Comparison Table */}
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
          <button onClick={() => setShowComparisonTable(!showComparisonTable)}
            className="flex items-center mx-auto bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-full shadow-md border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-all duration-300 hover:-translate-y-0.5">
            {showComparisonTable ? (
              <>
                <span>{t('pricing.comparisonTable.hide')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:ml-2 rtl:mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            ) : (
              <>
                <span>{t('pricing.comparisonTable.show')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:ml-2 rtl:mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Comparison Table */}
        {showComparisonTable && (
          <div className={`overflow-x-auto rounded-2xl shadow-lg mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '500ms' }}>
            <table className="w-full bg-white dark:bg-gray-800 text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800">
                  <th className="p-4 rtl:text-right ltr:text-left text-gray-800 dark:text-gray-100 font-bold text-base">{t('pricing.comparisonTable.features')}</th>
                  {currentPlans.map(plan => (
                    <th key={`head-${plan.id}`} className="p-4 text-center">
                      <span className={`inline-block font-bold text-base ${getColorClass(plan.color, 'text')}`}>{t(`pricing.plans.${plan.tier}.title`)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatureKeys.map((fk, idx) => (
                  <tr key={`feature-${idx}`} className={`transition-colors duration-200 ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/60' : 'bg-white dark:bg-gray-900/40'} hover:bg-blue-50 dark:hover:bg-gray-700/60`}>
                    <td className="p-3 rtl:text-right ltr:text-left text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 font-medium">{t(`pricing.features.${fk}`)}</td>
                    {currentPlans.map(plan => (
                      <td key={`${plan.id}-${idx}`} className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                        {hasFeature(plan, fk) ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700">
                            <Check className={getColorClass(plan.color, 'text')} size={18} strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="text-gray-300 dark:text-gray-600 text-lg">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 border-t-2 border-gray-200 dark:border-gray-600">
                  <td className="p-4 font-bold text-gray-800 dark:text-gray-100 text-base rtl:text-right ltr:text-left">{t('pricing.comparisonTable.price')}</td>
                  {currentPlans.map(plan => (
                    <td key={`price-${plan.id}`} className="p-4 text-center">
                      <div className={`font-bold text-lg ${getColorClass(plan.color, 'text')}`}>{plan.price}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t('pricing.currency')}</div>
                    </td>
                  ))}
                </tr>
                <tr className="bg-white dark:bg-gray-900/40">
                  <td className="p-2"></td>
                  {currentPlans.map(plan => (
                    <td key={`button-${plan.id}`} className="p-4 text-center">
                      <button
                        onClick={() => trackPlanClick({ planId: `${plan.tier}-${selectedGrade}`, planName: t(`pricingPlans.tier.${plan.tier}.title`) })}
                        className={`px-5 py-2.5 rounded-full font-semibold text-white ${getColorClass(plan.color, 'bg')} ${getColorClass(plan.color, 'hover-bg')} shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
                      >
                        {t('pricing.comparisonTable.selectPlan')}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Notes */}
        <div className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md dark:shadow-gray-900/40 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start mb-4">
              <AlertCircle className="text-blue-600 dark:text-blue-400 mt-1 ltr:mr-2 rtl:ml-2 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-1">{t('pricing.notes.title')}</h4>
                <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                  <li>• {t('pricing.notes.1')}</li>
                  <li>• {t('pricing.notes.2')}</li>
                  <li>• {t('pricing.notes.3')}</li>
                  <li>• {t('pricing.notes.4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlansSection;
