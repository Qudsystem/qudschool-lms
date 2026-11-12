/**
 * Feature Flags Configuration
 * ===========================
 * 
 * هذا الملف يحتوي على جميع أعلام الميزات (Feature Flags) للتحكم في عرض أو إخفاء
 * الميزات غير المكتملة أو قيد التطوير.
 * 
 * 🔴 false = الميزة مخفية (قيد التطوير)
 * 🟢 true = الميزة ظاهرة (مكتملة وجاهزة)
 * 
 * @usage
 * import { FEATURE_FLAGS } from '../config/featureFlags';
 * {FEATURE_FLAGS.advancedPayments && <PaymentSettings />}
 */

export interface FeatureFlags {
  // ==================== الميزات الأساسية ====================
  
  /** البحث المتقدم مع API حقيقي */
  searchAPI: boolean;
  
  /** الإشعارات الحية (Real-time Notifications) */
  realTimeNotifications: boolean;
  
  /** الدردشة المباشرة (Live Chat Support) */
  liveChat: boolean;
  
  // ==================== ميزات الملف الشخصي ====================
  
  /** تعديل الملف الشخصي بالكامل */
  profileEdit: boolean;
  
  /** تغيير كلمة المرور */
  changePassword: boolean;
  
  /** رفع صورة شخصية */
  uploadProfilePicture: boolean;
  
  // ==================== ميزات لوحة التحكم ====================
  
  /** تقارير التقدم المفصلة */
  detailedReports: boolean;
  
  /** عرض جميع الأنشطة */
  viewAllActivity: boolean;
  
  /** إجراءات إضافية على البطاقات */
  moreCardActions: boolean;
  
  /** Timeline Actions */
  timelineActions: boolean;
  
  // ==================== ميزات الإعدادات ====================
  
  /** طلب تحميل البيانات (GDPR) */
  dataExport: boolean;
  
  /** حذف الحساب */
  accountDeletion: boolean;
  
  // ==================== ميزات الدعم ====================
  
  /** نموذج الاتصال */
  contactForm: boolean;
  
  /** الدعم عبر الذكاء الاصطناعي */
  aiSupport: boolean;
  
  // ==================== ميزات الدفع ====================
  
  /** إعدادات الدفع المتقدمة */
  advancedPayments: boolean;
  
  /** الاشتراكات الشهرية */
  monthlySubscriptions: boolean;
  
  /** نظام المحفظة */
  walletSystem: boolean;
  
  // ==================== ميزات المجتمع ====================
  
  /** إنشاء المواضيع */
  createThreads: boolean;
  
  /** التفاعل مع المنشورات */
  postInteractions: boolean;
  
  /** الرسائل الخاصة */
  privateMessages: boolean;
  
  // ==================== ميزات الدورات ====================
  
  /** شراء الدورات */
  purchaseCourses: boolean;
  
  /** تقييم الدورات */
  rateCourses: boolean;
  
  /** تنزيل الشهادات */
  downloadCertificates: boolean;
}

/**
 * Feature Flags Object
 * تحديث القيم هنا للتحكم في ظهور الميزات
 */
export const FEATURE_FLAGS: FeatureFlags = {
  // ==================== الميزات الأساسية ====================
  searchAPI: false,              // ❌ TODO: ربط بـ API حقيقي
  realTimeNotifications: false,  // ❌ TODO: WebSocket integration
  liveChat: false,               // ❌ TODO: تطوير نظام الدردشة
  
  // ==================== ميزات الملف الشخصي ====================
  profileEdit: true,             // ✅ مفعّل! (with validation & toast)
  changePassword: true,          // ✅ مفعّل! (Modal with password strength)
  uploadProfilePicture: true,    // ✅ مفعّل! (local upload + preview + persistence)
  
  // ==================== ميزات لوحة التحكم ====================
  detailedReports: false,        // ❌ TODO: تقارير مفصلة
  viewAllActivity: false,        // ❌ TODO: صفحة الأنشطة
  moreCardActions: true,         // ✅ مفعّل! (copy/export/customize)
  timelineActions: false,        // ❌ TODO: إجراءات Timeline
  
  // ==================== ميزات الإعدادات ====================
  dataExport: true,              // ✅ مفعّل! (GDPR data portability)
  accountDeletion: false,        // ❌ TODO: نظام حذف آمن
  
  // ==================== ميزات الدعم ====================
  contactForm: false,            // ❌ TODO: نموذج الاتصال
  aiSupport: true,               // ✅ جاهز
  
  // ==================== ميزات الدفع ====================
  advancedPayments: false,       // ❌ TODO: بوابات دفع
  monthlySubscriptions: true,    // ✅ جاهز (في PricingPage)
  walletSystem: false,           // ❌ TODO: نظام المحفظة
  
  // ==================== ميزات المجتمع ====================
  createThreads: true,           // ✅ مفعّل! (Modal + localStorage persistence)
  postInteractions: true,        // ✅ مفعّل! (Like/Comment/Share + localStorage)
  privateMessages: false,        // ❌ TODO: الرسائل الخاصة
  
  // ==================== ميزات الدورات ====================
  purchaseCourses: false,        // ❌ TODO: نظام الدفع
  rateCourses: true,             // ✅ مفعّل! (StarRating + localStorage)
  downloadCertificates: false,   // ❌ TODO: توليد الشهادات
};

/**
 * Helper function للتحقق من حالة ميزة معينة
 */
export const isFeatureEnabled = (featureName: keyof FeatureFlags): boolean => {
  return FEATURE_FLAGS[featureName];
};

/**
 * Helper function لعرض رسالة "قريباً" للميزات غير المكتملة
 */
export const getComingSoonMessage = (featureName: string): string => {
  return `🚧 ميزة "${featureName}" قيد التطوير وستكون متاحة قريباً!`;
};

/**
 * Environment-based flags (اختياري)
 * يمكن تفعيل بعض الميزات في بيئة التطوير فقط
 */
export const isDevelopment = import.meta.env.DEV;

export const DEV_ONLY_FLAGS: Partial<FeatureFlags> = isDevelopment
  ? {
      // في بيئة التطوير، يمكن تفعيل هذه الميزات للاختبار
      searchAPI: true,
      profileEdit: true,
    }
  : {};

// دمج الـ flags مع dev flags
export const ACTIVE_FEATURE_FLAGS: FeatureFlags = {
  ...FEATURE_FLAGS,
  ...DEV_ONLY_FLAGS,
};
