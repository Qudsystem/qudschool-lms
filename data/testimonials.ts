export interface RichTestimonial {
  id: string;
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  quote: { ar: string; en: string };
  rating: number;
  source: { ar: string; en: string };
  avatarSeed: string;
  featured?: boolean;
}

const firstNamesAr = ['أحمد','محمد','محمود','يوسف','عمر','علي','خالد','حسن','إبراهيم','مصطفى','نورا','فاطمة','ليلى','سارة','مريم','هند','دينا','ياسمين','آية','رنا','سلمى','هدى','أمينة','جنى','ملك','كريم','طارق','زياد','أنس','بلال'];
const firstNamesEn = ['Ahmed','Mohamed','Mahmoud','Youssef','Omar','Ali','Khaled','Hassan','Ibrahim','Mustafa','Noura','Fatima','Layla','Sara','Mariam','Hind','Dina','Yasmin','Aya','Rana','Salma','Huda','Amina','Jana','Malak','Karim','Tarek','Ziad','Anas','Bilal'];
const lastNamesAr = ['محمود','سامي','عبد الله','حسين','إبراهيم','فتحي','رمضان','السيد','عوض','قاسم','منصور','شعبان','زكي','ناصر','فؤاد'];
const lastNamesEn = ['Mahmoud','Samy','Abdullah','Hussein','Ibrahim','Fathy','Ramadan','El-Sayed','Awad','Qasem','Mansour','Shaaban','Zaki','Nasser','Fouad'];

const roles = [
  { ar: 'مهندس برمجيات', en: 'Software Engineer' },
  { ar: 'مطوّر واجهات أمامية', en: 'Frontend Developer' },
  { ar: 'مطوّر تطبيقات', en: 'App Developer' },
  { ar: 'طالب علوم حاسب', en: 'Computer Science Student' },
  { ar: 'طالب في المرحلة الثانوية', en: 'High School Student' },
  { ar: 'ولي أمر', en: 'Parent' },
  { ar: 'مصمم UI/UX', en: 'UI/UX Designer' },
  { ar: 'مصمم مستقل', en: 'Freelance Designer' },
  { ar: 'مغير مهنة', en: 'Career Changer' },
  { ar: 'مدير منتج', en: 'Product Manager' },
  { ar: 'محلل بيانات', en: 'Data Analyst' },
  { ar: 'مهندس ذكاء اصطناعي', en: 'AI Engineer' },
  { ar: 'معلم', en: 'Teacher' },
  { ar: 'رائد أعمال', en: 'Entrepreneur' },
  { ar: 'طالب جامعي', en: 'University Student' },
];

const sources = [
  { ar: 'تقييم دورة', en: 'Course Review' },
  { ar: 'لينكد إن', en: 'LinkedIn' },
  { ar: 'ريديت', en: 'Reddit' },
  { ar: 'جوجل', en: 'Google' },
  { ar: 'فيسبوك', en: 'Facebook' },
];

const openersAr = ['تجربتي مع كودسكول كانت','رحلتي في كودسكول بدأت','التحاقي بكودسكول كان','أفضل قرار تعليمي اتخذته كان','انضممت لكودسكول و'];
const openersEn = ['My journey with QudSchool was','Joining QudSchool turned out to be','My experience with QudSchool has been','Enrolling at QudSchool was','I joined QudSchool and'];

const highlightsAr = [
  'المعلمون ساعدوني على تحسين مستواي بشكل ملحوظ',
  'المشاريع العملية جعلت المفاهيم الصعبة واضحة تماماً',
  'المدرّس الذكي ساعدني في حل المشكلات في أي وقت',
  'المسارات المنظمة وفّرت عليّ شهوراً من التشتت',
  'المجتمع الداعم جعل التعلّم ممتعاً ومحفّزاً',
  'أسلوب الشرح التفاعلي جعلني أحب البرمجة',
  'التحديات العملية رفعت مهاراتي لمستوى احترافي',
  'المتابعة المستمرة ضمنت تقدّمي دون توقف',
];
const highlightsEn = [
  'the mentors helped me improve noticeably',
  'the hands-on projects made hard concepts crystal clear',
  'the AI Tutor helped me solve problems anytime',
  'the structured paths saved me months of confusion',
  'the supportive community made learning fun',
  'the interactive teaching made me love coding',
  'the practical challenges pushed me to a professional level',
  'the continuous follow-up kept me progressing nonstop',
];

const outcomesAr = [
  'وحصلت على وظيفة أحلامي خلال شهر.',
  'وبنيت أول مشروع حقيقي لي.',
  'واستعدت لمقابلات العمل بثقة.',
  'وحققت نتائج متميزة في دراستي.',
  'وأطلقت تطبيقي الأول على المتجر.',
  'وفزت في مسابقة برمجية مدرسية.',
  'وأصبحت أدرّس البرمجة لأصدقائي.',
  'وانضممت لفريق تطوير ناشئ.',
];
const outcomesEn = [
  'and landed my dream job within a month.',
  'and built my first real project.',
  'and prepared for interviews with confidence.',
  'and achieved outstanding academic results.',
  'and launched my first app on the store.',
  'and won a school coding competition.',
  'and started teaching coding to my friends.',
  'and joined an emerging dev team.',
];

const buildTestimonials = (): RichTestimonial[] => {
  const list: RichTestimonial[] = [];
  for (let i = 0; i < 100; i++) {
    const fn = i % firstNamesAr.length;
    const ln = (i * 3) % lastNamesAr.length;
    const role = roles[(i * 7) % roles.length];
    const source = sources[(i * 5) % sources.length];
    const opener = openersAr[(i * 2) % openersAr.length];
    const openerEn = openersEn[(i * 2) % openersEn.length];
    const hl = highlightsAr[(i * 3) % highlightsAr.length];
    const hlEn = highlightsEn[(i * 3) % highlightsEn.length];
    const oc = outcomesAr[(i * 4) % outcomesAr.length];
    const ocEn = outcomesEn[(i * 4) % outcomesEn.length];
    // rating distribution: ~75% five-star, rest 4
    const rating = i % 4 === 0 ? 4 : 5;

    list.push({
      id: `rt-${i + 1}`,
      name: {
        ar: `${firstNamesAr[fn]} ${lastNamesAr[ln]}`,
        en: `${firstNamesEn[fn]} ${lastNamesEn[ln]}`,
      },
      role: role,
      quote: {
        ar: `${opener} ${hl}، ${oc}`,
        en: `${openerEn} — ${hlEn}, ${ocEn}`,
      },
      rating,
      source: source,
      avatarSeed: `${firstNamesEn[fn]}-${lastNamesEn[ln]}`,
      featured: i < 3,
    });
  }
  return list;
};

export const richTestimonials: RichTestimonial[] = buildTestimonials();
