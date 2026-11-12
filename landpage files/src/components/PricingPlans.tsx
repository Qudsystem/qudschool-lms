import { useState, useEffect, useRef } from 'react';
import { CircleAlert, Award, Check, Smile, Star, TrendingUp } from 'lucide-react';

interface PricingPlan {
  id: string;
  title: string;
  popularBadge?: boolean;
  discountBadge?: boolean;
  price: string;
  originalPrice?: string;
  currency: string;
  description: string;
  pricePerSession: string;
  duration: string;
  ageRange: string;
  features: string[];
  color: string;
  recommended?: boolean;
}

const PricingPlans = () => {
  const [selectedGrade, setSelectedGrade] = useState('6-7');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  
  // Observer for when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const gradeOptions = [
    { id: '6-7', label: '6-7 سنوات | الصف 1-2' },
    { id: '8-9', label: '8-9 سنوات | الصف 3-4' },
    { id: '10-11', label: '10-11 سنة | الصف 5-6' },
    { id: '12-13', label: '12-13 سنة | الصف 7-8' },
    { id: '14-15', label: '14-15 سنة | الصف 9-10' },
    { id: '16-17', label: '16-17 سنة | الصف 11-12' },
  ];
  
  // Plans for different age groups
  const plansByGrade: Record<string, PricingPlan[]> = {
    '6-7': [
      {
        id: 'basic-6-7',
        title: 'المستوى الأساسي',
        price: '249',
        originalPrice: '349',
        currency: 'دولار أمريكي',
        description: 'الباقة المثالية للمبتدئين في عالم البرمجة',
        pricePerSession: '20 دولار أمريكي لكل حصة',
        duration: '3 شهور - 12 حصة للفصل الدراسي',
        ageRange: '6-7 سنوات | الصف 1-2',
        features: [
          'مقدمة لمفاهيم البرمجة الأساسية',
          'تطوير مهارات حل المشكلات',
          'أنشطة برمجية تفاعلية',
          'شهادة إتمام الدورة',
          'دعم تعليمي مستمر'
        ],
        color: 'blue',
        discountBadge: true
      },
      {
        id: 'standard-6-7',
        title: 'المستوى المتقدم',
        popularBadge: true,
        price: '499',
        currency: 'دولار أمريكي',
        description: 'الخيار الأمثل لتطوير المهارات البرمجية',
        pricePerSession: '20 دولار أمريكي لكل حصة',
        duration: '6 شهور - 24 حصة للفصل الدراسي',
        ageRange: '6-7 سنوات | الصف 1-2',
        features: [
          'جميع مميزات المستوى الأساسي',
          'مشاريع برمجية متقدمة',
          'تطوير الألعاب البسيطة',
          'دروس برمجة إضافية',
          'نظام تقييم ومتابعة مستمر',
          'منصة تعليمية تفاعلية',
          'إمكانية حضور ورش عمل خاصة'
        ],
        color: 'purple',
        recommended: true
      },
      {
        id: 'premium-6-7',
        title: 'المستوى الاحترافي',
        price: '699',
        currency: 'دولار أمريكي',
        description: 'تجربة تعليمية شاملة لإتقان البرمجة',
        pricePerSession: '19.5 دولار أمريكي لكل حصة',
        duration: '9 شهور - 36 حصة للفصل الدراسي',
        ageRange: '6-7 سنوات | الصف 1-2',
        features: [
          'جميع مميزات المستوى المتقدم',
          'مشاريع برمجية احترافية',
          'جلسات تدريب خاصة',
          'تطوير مهارات التفكير المنطقي',
          'شهادة معتمدة في البرمجة',
          'مسابقات برمجية دورية',
          'دعم فني على مدار الساعة',
          'مشاركة في معارض المشاريع البرمجية'
        ],
        color: 'indigo'
      }
    ],
    '8-9': [
      {
        id: 'basic-8-9',
        title: 'المستوى الأساسي',
        price: '279',
        originalPrice: '379',
        currency: 'دولار أمريكي',
        description: 'الباقة المثالية للمبتدئين في عالم البرمجة',
        pricePerSession: '23 دولار أمريكي لكل حصة',
        duration: '3 شهور - 12 حصة للفصل الدراسي',
        ageRange: '8-9 سنوات | الصف 3-4',
        features: [
          'مقدمة لمفاهيم البرمجة الأساسية',
          'تطوير مهارات حل المشكلات',
          'أنشطة برمجية تفاعلية',
          'شهادة إتمام الدورة',
          'دعم تعليمي مستمر'
        ],
        color: 'blue',
        discountBadge: true
      },
      {
        id: 'standard-8-9',
        title: 'المستوى المتقدم',
        popularBadge: true,
        price: '529',
        currency: 'دولار أمريكي',
        description: 'الخيار الأمثل لتطوير المهارات البرمجية',
        pricePerSession: '22 دولار أمريكي لكل حصة',
        duration: '6 شهور - 24 حصة للفصل الدراسي',
        ageRange: '8-9 سنوات | الصف 3-4',
        features: [
          'جميع مميزات المستوى الأساسي',
          'مشاريع برمجية متقدمة',
          'تطوير الألعاب البسيطة',
          'دروس برمجة إضافية',
          'نظام تقييم ومتابعة مستمر',
          'منصة تعليمية تفاعلية',
          'إمكانية حضور ورش عمل خاصة'
        ],
        color: 'purple',
        recommended: true
      },
      {
        id: 'premium-8-9',
        title: 'المستوى الاحترافي',
        price: '749',
        currency: 'دولار أمريكي',
        description: 'تجربة تعليمية شاملة لإتقان البرمجة',
        pricePerSession: '20.8 دولار أمريكي لكل حصة',
        duration: '9 شهور - 36 حصة للفصل الدراسي',
        ageRange: '8-9 سنوات | الصف 3-4',
        features: [
          'جميع مميزات المستوى المتقدم',
          'مشاريع برمجية احترافية',
          'جلسات تدريب خاصة',
          'تطوير مهارات التفكير المنطقي',
          'شهادة معتمدة في البرمجة',
          'مسابقات برمجية دورية',
          'دعم فني على مدار الساعة',
          'مشاركة في معارض المشاريع البرمجية'
        ],
        color: 'indigo'
      }
    ],
    '10-11': [
      {
        id: 'basic-10-11',
        title: 'المستوى الأساسي',
        price: '299',
        originalPrice: '399',
        currency: 'دولار أمريكي',
        description: 'الباقة المثالية للمبتدئين في عالم البرمجة',
        pricePerSession: '25 دولار أمريكي لكل حصة',
        duration: '3 شهور - 12 حصة للفصل الدراسي',
        ageRange: '10-11 سنة | الصف 5-6',
        features: [
          'مقدمة لمفاهيم البرمجة الأساسية',
          'تطوير مهارات حل المشكلات',
          'أنشطة برمجية تفاعلية',
          'شهادة إتمام الدورة',
          'دعم تعليمي مستمر'
        ],
        color: 'blue',
        discountBadge: true
      },
      {
        id: 'standard-10-11',
        title: 'المستوى المتقدم',
        popularBadge: true,
        price: '549',
        currency: 'دولار أمريكي',
        description: 'الخيار الأمثل لتطوير المهارات البرمجية',
        pricePerSession: '23 دولار أمريكي لكل حصة',
        duration: '6 شهور - 24 حصة للفصل الدراسي',
        ageRange: '10-11 سنة | الصف 5-6',
        features: [
          'جميع مميزات المستوى الأساسي',
          'مشاريع برمجية متقدمة',
          'تطوير الألعاب البسيطة',
          'دروس برمجة إضافية',
          'نظام تقييم ومتابعة مستمر',
          'منصة تعليمية تفاعلية',
          'إمكانية حضور ورش عمل خاصة'
        ],
        color: 'purple',
        recommended: true
      },
      {
        id: 'premium-10-11',
        title: 'المستوى الاحترافي',
        price: '799',
        currency: 'دولار أمريكي',
        description: 'تجربة تعليمية شاملة لإتقان البرمجة',
        pricePerSession: '22 دولار أمريكي لكل حصة',
        duration: '9 شهور - 36 حصة للفصل الدراسي',
        ageRange: '10-11 سنة | الصف 5-6',
        features: [
          'جميع مميزات المستوى المتقدم',
          'مشاريع برمجية احترافية',
          'جلسات تدريب خاصة',
          'تطوير مهارات التفكير المنطقي',
          'شهادة معتمدة في البرمجة',
          'مسابقات برمجية دورية',
          'دعم فني على مدار الساعة',
          'مشاركة في معارض المشاريع البرمجية'
        ],
        color: 'indigo'
      }
    ],
    '12-13': [
      {
        id: 'basic-12-13',
        title: 'المستوى الأساسي',
        price: '329',
        originalPrice: '429',
        currency: 'دولار أمريكي',
        description: 'الباقة المثالية للمبتدئين في عالم البرمجة',
        pricePerSession: '27 دولار أمريكي لكل حصة',
        duration: '3 شهور - 12 حصة للفصل الدراسي',
        ageRange: '12-13 سنة | الصف 7-8',
        features: [
          'مقدمة لمفاهيم البرمجة الأساسية',
          'تطوير مهارات حل المشكلات',
          'أنشطة برمجية تفاعلية',
          'شهادة إتمام الدورة',
          'دعم تعليمي مستمر'
        ],
        color: 'blue',
        discountBadge: true
      },
      {
        id: 'standard-12-13',
        title: 'المستوى المتقدم',
        popularBadge: true,
        price: '599',
        currency: 'دولار أمريكي',
        description: 'الخيار الأمثل لتطوير المهارات البرمجية',
        pricePerSession: '25 دولار أمريكي لكل حصة',
        duration: '6 شهور - 24 حصة للفصل الدراسي',
        ageRange: '12-13 سنة | الصف 7-8',
        features: [
          'جميع مميزات المستوى الأساسي',
          'مشاريع برمجية متقدمة',
          'تطوير الألعاب البسيطة',
          'دروس برمجة إضافية',
          'نظام تقييم ومتابعة مستمر',
          'منصة تعليمية تفاعلية',
          'إمكانية حضور ورش عمل خاصة'
        ],
        color: 'purple',
        recommended: true
      },
      {
        id: 'premium-12-13',
        title: 'المستوى الاحترافي',
        price: '849',
        currency: 'دولار أمريكي',
        description: 'تجربة تعليمية شاملة لإتقان البرمجة',
        pricePerSession: '23.5 دولار أمريكي لكل حصة',
        duration: '9 شهور - 36 حصة للفصل الدراسي',
        ageRange: '12-13 سنة | الصف 7-8',
        features: [
          'جميع مميزات المستوى المتقدم',
          'مشاريع برمجية احترافية',
          'جلسات تدريب خاصة',
          'تطوير مهارات التفكير المنطقي',
          'شهادة معتمدة في البرمجة',
          'مسابقات برمجية دورية',
          'دعم فني على مدار الساعة',
          'مشاركة في معارض المشاريع البرمجية'
        ],
        color: 'indigo'
      }
    ],
    '14-15': [
      {
        id: 'basic-14-15',
        title: 'المستوى الأساسي',
        price: '359',
        originalPrice: '459',
        currency: 'دولار أمريكي',
        description: 'الباقة المثالية للمبتدئين في عالم البرمجة',
        pricePerSession: '30 دولار أمريكي لكل حصة',
        duration: '3 شهور - 12 حصة للفصل الدراسي',
        ageRange: '14-15 سنة | الصف 9-10',
        features: [
          'مقدمة لمفاهيم البرمجة الأساسية',
          'تطوير مهارات حل المشكلات',
          'أنشطة برمجية تفاعلية',
          'شهادة إتمام الدورة',
          'دعم تعليمي مستمر'
        ],
        color: 'blue',
        discountBadge: true
      },
      {
        id: 'standard-14-15',
        title: 'المستوى المتقدم',
        popularBadge: true,
        price: '649',
        currency: 'دولار أمريكي',
        description: 'الخيار الأمثل لتطوير المهارات البرمجية',
        pricePerSession: '27 دولار أمريكي لكل حصة',
        duration: '6 شهور - 24 حصة للفصل الدراسي',
        ageRange: '14-15 سنة | الصف 9-10',
        features: [
          'جميع مميزات المستوى الأساسي',
          'مشاريع برمجية متقدمة',
          'تطوير الألعاب البسيطة',
          'دروس برمجة إضافية',
          'نظام تقييم ومتابعة مستمر',
          'منصة تعليمية تفاعلية',
          'إمكانية حضور ورش عمل خاصة'
        ],
        color: 'purple',
        recommended: true
      },
      {
        id: 'premium-14-15',
        title: 'المستوى الاحترافي',
        price: '899',
        currency: 'دولار أمريكي',
        description: 'تجربة تعليمية شاملة لإتقان البرمجة',
        pricePerSession: '25 دولار أمريكي لكل حصة',
        duration: '9 شهور - 36 حصة للفصل الدراسي',
        ageRange: '14-15 سنة | الصف 9-10',
        features: [
          'جميع مميزات المستوى المتقدم',
          'مشاريع برمجية احترافية',
          'جلسات تدريب خاصة',
          'تطوير مهارات التفكير المنطقي',
          'شهادة معتمدة في البرمجة',
          'مسابقات برمجية دورية',
          'دعم فني على مدار الساعة',
          'مشاركة في معارض المشاريع البرمجية'
        ],
        color: 'indigo'
      }
    ],
    '16-17': [
      {
        id: 'basic-16-17',
        title: 'المستوى الأساسي',
        price: '399',
        originalPrice: '499',
        currency: 'دولار أمريكي',
        description: 'الباقة المثالية للمبتدئين في عالم البرمجة',
        pricePerSession: '33 دولار أمريكي لكل حصة',
        duration: '3 شهور - 12 حصة للفصل الدراسي',
        ageRange: '16-17 سنة | الصف 11-12',
        features: [
          'مقدمة لمفاهيم البرمجة الأساسية',
          'تطوير مهارات حل المشكلات',
          'أنشطة برمجية تفاعلية',
          'شهادة إتمام الدورة',
          'دعم تعليمي مستمر'
        ],
        color: 'blue',
        discountBadge: true
      },
      {
        id: 'standard-16-17',
        title: 'المستوى المتقدم',
        popularBadge: true,
        price: '699',
        currency: 'دولار أمريكي',
        description: 'الخيار الأمثل لتطوير المهارات البرمجية',
        pricePerSession: '29 دولار أمريكي لكل حصة',
        duration: '6 شهور - 24 حصة للفصل الدراسي',
        ageRange: '16-17 سنة | الصف 11-12',
        features: [
          'جميع مميزات المستوى الأساسي',
          'مشاريع برمجية متقدمة',
          'تطوير الألعاب البسيطة',
          'دروس برمجة إضافية',
          'نظام تقييم ومتابعة مستمر',
          'منصة تعليمية تفاعلية',
          'إمكانية حضور ورش عمل خاصة'
        ],
        color: 'purple',
        recommended: true
      },
      {
        id: 'premium-16-17',
        title: 'المستوى الاحترافي',
        price: '949',
        currency: 'دولار أمريكي',
        description: 'تجربة تعليمية شاملة لإتقان البرمجة',
        pricePerSession: '26.5 دولار أمريكي لكل حصة',
        duration: '9 شهور - 36 حصة للفصل الدراسي',
        ageRange: '16-17 سنة | الصف 11-12',
        features: [
          'جميع مميزات المستوى المتقدم',
          'مشاريع برمجية احترافية',
          'جلسات تدريب خاصة',
          'تطوير مهارات التفكير المنطقي',
          'شهادة معتمدة في البرمجة',
          'مسابقات برمجية دورية',
          'دعم فني على مدار الساعة',
          'مشاركة في معارض المشاريع البرمجية'
        ],
        color: 'indigo'
      }
    ]
  };

  const currentPlans = plansByGrade[selectedGrade] || plansByGrade['6-7'];

  // Comparison table features
  const comparisonFeatures = [
    'مقدمة لمفاهيم البرمجة الأساسية',
    'تطوير مهارات حل المشكلات',
    'أنشطة برمجية تفاعلية',
    'شهادة إتمام الدورة',
    'دعم تعليمي مستمر',
    'مشاريع برمجية متقدمة',
    'تطوير الألعاب البسيطة',
    'دروس برمجة إضافية',
    'نظام تقييم ومتابعة مستمر',
    'منصة تعليمية تفاعلية',
    'إمكانية حضور ورش عمل خاصة',
    'مشاريع برمجية احترافية',
    'جلسات تدريب خاصة',
    'تطوير مهارات التفكير المنطقي',
    'شهادة معتمدة في البرمجة',
    'مسابقات برمجية دورية',
    'دعم فني على مدار الساعة',
    'مشاركة في معارض المشاريع البرمجية'
  ];

  // Helper to check if a feature is included in a plan
  const hasFeature = (plan: PricingPlan, feature: string) => {
    return plan.features.includes(feature);
  };

  // Get color class based on plan color
  const getColorClass = (color: string, type: 'bg' | 'text' | 'border' | 'shadow' | 'hover-bg') => {
    const colors: Record<string, Record<string, string>> = {
      blue: {
        bg: 'bg-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-600',
        shadow: 'shadow-blue-200',
        'hover-bg': 'hover:bg-blue-700'
      },
      purple: {
        bg: 'bg-purple-600',
        text: 'text-purple-600',
        border: 'border-purple-600',
        shadow: 'shadow-purple-200',
        'hover-bg': 'hover:bg-purple-700'
      },
      indigo: {
        bg: 'bg-indigo-600',
        text: 'text-indigo-600',
        border: 'border-indigo-600',
        shadow: 'shadow-indigo-200',
        'hover-bg': 'hover:bg-indigo-700'
      }
    };

    return colors[color]?.[type] || colors.blue[type];
  };

  // Gradient class for plan
  const getGradientClass = (color: string) => {
    const gradients: Record<string, string> = {
      blue: 'bg-gradient-to-br from-blue-500 to-blue-700',
      purple: 'bg-gradient-to-br from-purple-500 to-purple-700',
      indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-700'
    };
    return gradients[color] || gradients.blue;
  };

  return (
    <section className="py-16 bg-gray-50" id="pricing" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div 
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">خطط الأسعار</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            اختر الخطة المناسبة لطفلك واستمتع برحلة تعليمية فريدة في عالم البرمجة
          </p>

          {/* Price toggle - annual/monthly (for future use) */}
          <div className="inline-flex items-center bg-white p-1 rounded-lg shadow-md mb-6">
            <button className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white">
              دفع مرة واحدة
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-800">
              دفع شهري
            </button>
          </div>
        </div>

        {/* Grade Selection */}
        <div 
          className={`mb-8 max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-1">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {gradeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedGrade(option.id)}
                    className={`py-3 px-2 text-sm md:text-base transition-all duration-300 ${
                      selectedGrade === option.id
                        ? 'bg-blue-600 text-white font-medium shadow-lg rounded-lg scale-105 z-10'
                        : 'text-gray-600 hover:bg-gray-100 rounded-lg'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Special Classes Label */}
        <div 
          className={`text-center mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full shadow-md">
            <Smile className="ml-2" size={24} />
            <div>
              <span className="font-bold ml-2">حصص خاصة</span>
              <span className="mr-1">مدرس مع طالب واحد</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div 
          className={`flex flex-col lg:flex-row justify-center gap-6 lg:gap-4 xl:gap-6 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {currentPlans.map((plan, index) => (
            <div 
              key={plan.id} 
              className={`flex-1 rounded-2xl overflow-hidden transform transition-all duration-500 relative
                ${plan.recommended ? 'lg:-mt-4 lg:mb-4' : ''}
                ${plan.recommended ? 'shadow-xl' : 'shadow-lg hover:shadow-xl'}
                ${plan.recommended ? `${getColorClass(plan.color, 'shadow')} border-t-4 ${getColorClass(plan.color, 'border')}` : 'border border-gray-200'}
                ${plan.recommended ? 'hover:scale-105' : 'hover:scale-102'}`}
              style={{ maxWidth: '450px', margin: '0 auto' }}
            >
              {/* Popular badge */}
              {plan.popularBadge && (
                <div className={`absolute top-0 left-0 ${getGradientClass(plan.color)} text-white text-xs font-bold py-1 px-3 rounded-br-lg z-10`}>
                  <TrendingUp className="inline-block ml-1" size={14} />
                  الأكثر شعبية
                </div>
              )}

              {/* Discount badge */}
              {plan.discountBadge && plan.originalPrice && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg z-10">
                  خصم {Math.round(((parseInt(plan.originalPrice) - parseInt(plan.price)) / parseInt(plan.originalPrice)) * 100)}%
                </div>
              )}
              
              {/* Recommended banner */}
              {plan.recommended && (
                <div className="absolute top-6 left-0 right-0 text-center z-10">
                  <div className={`${getGradientClass(plan.color)} text-white text-xs font-bold py-1 px-3 inline-block rounded-full shadow-md transform -rotate-2`}>
                    <Award size={14} className="inline-block ml-1" />
                    موصى به
                  </div>
                </div>
              )}

              <div className={`bg-white p-6 ${plan.recommended ? 'pt-14' : 'pt-10'}`}>
                {/* Header */}
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-1 ${getColorClass(plan.color, 'text')}`}>{plan.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
                  <div className="flex items-center justify-center">
                    {plan.originalPrice && (
                      <span className="text-gray-400 line-through text-lg mx-2">{plan.originalPrice}</span>
                    )}
                    <span className="text-5xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-500 text-lg mt-2 mr-1">{plan.currency}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">{plan.pricePerSession}</p>
                </div>

                {/* Duration & Age */}
                <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3 mb-6">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{plan.duration}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{plan.ageRange}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <p className="font-medium text-gray-800 mb-3">المنهج يشمل:</p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className={`mt-1 ml-2 p-1 rounded-full ${getColorClass(plan.color, 'bg')} text-white`}>
                        <Check size={12} />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button 
                  className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 ${
                    getGradientClass(plan.color)
                  } ${getColorClass(plan.color, 'hover-bg')} hover:shadow-lg`}
                >
                  {plan.recommended ? 'اختر هذه الخطة' : 'اشترك الآن'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Comparison Table Button */}
        <div 
          className={`text-center mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <button
            onClick={() => setShowComparisonTable(!showComparisonTable)}
            className="flex items-center mx-auto bg-white text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            {showComparisonTable ? (
              <>
                <span>إخفاء جدول المقارنة</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            ) : (
              <>
                <span>عرض جدول المقارنة</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Comparison Table */}
        {showComparisonTable && (
          <div 
            className={`overflow-x-auto rounded-xl shadow-lg mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-right text-gray-700">الميزات</th>
                  {currentPlans.map(plan => (
                    <th key={`head-${plan.id}`} className="p-4 text-center">
                      <span className={`font-bold ${getColorClass(plan.color, 'text')}`}>
                        {plan.title}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={`feature-${idx}`} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 text-gray-700 border-t">{feature}</td>
                    {currentPlans.map(plan => (
                      <td key={`${plan.id}-${idx}`} className="p-3 text-center border-t">
                        {hasFeature(plan, feature) ? (
                          <Check className={`mx-auto ${getColorClass(plan.color, 'text')}`} size={20} />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gray-100">
                  <td className="p-4 font-bold text-gray-800">السعر</td>
                  {currentPlans.map(plan => (
                    <td key={`price-${plan.id}`} className="p-4 text-center">
                      <div className={`font-bold ${getColorClass(plan.color, 'text')}`}>
                        {plan.price} {plan.currency}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2"></td>
                  {currentPlans.map(plan => (
                    <td key={`button-${plan.id}`} className="p-4 text-center">
                      <button 
                        className={`px-4 py-2 rounded-lg font-medium text-white ${getColorClass(plan.color, 'bg')} ${getColorClass(plan.color, 'hover-bg')} transition-colors`}
                      >
                        اختر الخطة
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* FAQ/Notes */}
        <div 
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-start mb-4">
              <CircleAlert className="text-blue-600 mt-1 ml-2 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-gray-800 mb-1">ملاحظات هامة:</h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• جميع الأسعار قابلة للتغيير وفقًا للعروض الترويجية.</li>
                  <li>• يمكن التواصل مع فريق المبيعات للحصول على خصومات إضافية للمجموعات.</li>
                  <li>• يتوفر ضمان استرداد الأموال خلال أول 14 يومًا من بدء البرنامج.</li>
                  <li>• يمكن دفع الرسوم على أقساط شهرية مع رسوم إضافية بسيطة.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
