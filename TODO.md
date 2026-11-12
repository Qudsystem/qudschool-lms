# 📋 TODO List - Next Work (الميزات غير المكتملة)

## 🎯 نظرة عامة

هذا الملف يحتوي على قائمة شاملة بجميع الميزات **غير المكتملة** والمخفية عبر Feature Flags.  
**إجمالي الميزات**: 27 ميزة ❌ | **الميزات الجاهزة**: 3 ميزات ✅

---

## 🔴 الميزات الأساسية (3 ميزات)

### ❌ 1. البحث بـ API حقيقي
- **Feature Flag**: `searchAPI`
- **الأولوية**: 🔥 عالية
- **الوقت المتوقع**: 3-5 أيام
- **الملفات المتأثرة**:
  - `pages/SearchPage.tsx` (السطر 80)
  - `components/Navbar.tsx` (البحث)
- **المتطلبات**:
  - [ ] إنشاء API endpoint: `/api/search`
  - [ ] دعم filters (نوع، صعوبة، مدرس)
  - [ ] Pagination للنتائج
  - [ ] Search suggestions/autocomplete
  - [ ] استبدال البيانات التجريبية بـ API call
- **التبعيات**: Backend API
- **الملاحظات**: حالياً يستخدم بيانات mock فقط

---

### ❌ 2. الإشعارات الحية (Real-time Notifications)
- **Feature Flag**: `realTimeNotifications`
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 5-7 أيام
- **الملفات المتأثرة**:
  - `components/Navbar.tsx` (notificationDropdownItems)
  - `pages/NotificationsPage.tsx` (إذا وجدت)
- **المتطلبات**:
  - [ ] إعداد WebSocket connection
  - [ ] إنشاء notification service
  - [ ] دعم notification types (course, assignment, system, etc.)
  - [ ] Mark as read functionality
  - [ ] Real-time updates بدون refresh
  - [ ] Notification sound/toast
- **التبعيات**: WebSocket server (Socket.io or similar)
- **الملاحظات**: حالياً الإشعارات hardcoded في Navbar

---

### ❌ 3. الدردشة المباشرة (Live Chat Support)
- **Feature Flag**: `liveChat`
- **الأولوية**: 🟢 منخفضة
- **الوقت المتوقع**: 7-10 أيام
- **الملفات المتأثرة**:
  - إنشاء `components/LiveChat.tsx` جديد
  - `pages/SupportPage.tsx`
- **المتطلبات**:
  - [ ] Chat widget component
  - [ ] WebSocket للمحادثات الحية
  - [ ] لوحة تحكم للدعم الفني
  - [ ] تاريخ المحادثات
  - [ ] File upload في المحادثة
  - [ ] دعم متعدد اللغات
- **التبعيات**: WebSocket, Backend chat service
- **الملاحظات**: بديل مؤقت - نموذج الاتصال

---

## 👤 ميزات الملف الشخصي (3 ميزات)

### ✅ 4. تعديل الملف الشخصي **[مكتملة]**
- **Feature Flag**: `profileEdit` ✅ **مفعّلة**
- **الأولوية**: 🔥 عالية
- **الوقت الفعلي**: 2 أيام (مطابق للتقدير!)
- **الملفات المتأثرة**:
  - `pages/ProfilePage.tsx` ✅
  - `components/Toast.tsx` ✅ (جديد)
  - `hooks/useToast.tsx` ✅ (جديد)
  - `locales/ar.json` ✅ (13 مفتاح)
  - `locales/en.json` ✅ (13 مفتاح)
- **المتطلبات**:
  - [x] Form validation (Frontend) ✅
  - [x] Error messages ✅
  - [x] Toast notifications (Success/Error) ✅
  - [x] Loading states ✅
  - [x] Character counter (500 chars max) ✅
  - [x] Display name validation (regex) ✅
  - [ ] API endpoint: `PUT /api/users/:id` (Mock ready)
  - [ ] تحديث currentUser في Context (TODO)
- **التبعيات**: Backend user update API (mock متاح)
- **الملاحظات**: ✅ **الميزة مكتملة وجاهزة!** Frontend كامل مع validation، ينتظر فقط Backend API

---

### ✅ 5. تغيير كلمة المرور **[مكتملة]**
- **Feature Flag**: `changePassword` ✅ **مفعّلة**
- **الأولوية**: 🔥 عالية
- **الوقت الفعلي**: 2 أيام (مطابق للتقدير!)
- **الملفات المتأثرة**:
  - `pages/ProfilePage.tsx` ✅
  - `components/ChangePasswordModal.tsx` ✅ (جديد)
  - `constants.tsx` ✅ (أيقونات IconEye/IconEyeOff)
  - `locales/ar.json` ✅ (21 مفتاح)
  - `locales/en.json` ✅ (21 مفتاح)
- **المتطلبات**:
  - [x] Modal احترافي للتغيير ✅
  - [x] Show/Hide password toggles ✅
  - [x] Password strength indicator (5 levels) ✅
  - [x] Form validation شامل ✅
  - [x] Error messages واضحة ✅
  - [x] Toast notification عند النجاح ✅
  - [x] Loading states ✅
  - [x] Prevent same password ✅
  - [x] Password requirements display ✅
  - [ ] API endpoint: `POST /api/users/change-password` (Mock ready)
  - [ ] Email confirmation (TODO)
- **التبعيات**: Backend password change API (mock متاح)
- **الملاحظات**: ✅ **الميزة مكتملة!** Modal كامل مع password strength indicator، ينتظر Backend API فقط

---

### ❌ 6. رفع صورة شخصية
- **Feature Flag**: `uploadProfilePicture`
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 3-4 أيام
- **الملفات المتأثرة**:
  - `pages/ProfilePage.tsx`
  - `components/UserAvatar.tsx`
- **المتطلبات**:
  - [ ] File upload component
  - [ ] Image cropping/resizing
  - [ ] API endpoint: `POST /api/users/upload-avatar`
  - [ ] تخزين الصور (AWS S3 or similar)
  - [ ] Image validation (size, format)
  - [ ] تحديث avatar في جميع الأماكن
- **التبعيات**: File storage service
- **الملاحظات**: حالياً يستخدم initials فقط

---

## 📊 ميزات لوحة التحكم (4 ميزات)

### ❌ 7. التقارير المفصلة
- **Feature Flag**: `detailedReports`
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 5-7 أيام
- **الملفات المتأثرة**:
  - `pages/DashboardPage.tsx` (السطر 169-171)
- **المتطلبات**:
  - [ ] إنشاء `pages/ReportsPage.tsx`
  - [ ] Charts (Progress over time)
  - [ ] تقارير PDF قابلة للتنزيل
  - [ ] Filters (تاريخ، دورة، إلخ)
  - [ ] API endpoint: `/api/reports`
- **التبعيات**: Charts library (Chart.js), PDF generator
- **الملاحظات**: يعرض alert حالياً

---

### ❌ 8. عرض جميع الأنشطة
- **Feature Flag**: `viewAllActivity`
- **الأولوية**: 🟢 منخفضة
- **الوقت المتوقع**: 2-3 أيام
- **الملفات المتأثرة**:
  - `pages/DashboardPage.tsx` (السطر 250-252)
- **المتطلبات**:
  - [ ] إنشاء `pages/ActivityPage.tsx`
  - [ ] عرض جميع الأنشطة (pagination)
  - [ ] Filters (نوع النشاط، التاريخ)
  - [ ] Activity icons & timestamps
  - [ ] API endpoint: `/api/activities`
- **التبعيات**: Backend activities log
- **الملاحظات**: حالياً يعرض 4 أنشطة فقط

---

### ❌ 9. إجراءات إضافية على البطاقات
- **Feature Flag**: `moreCardActions`
- **الأولوية**: 🟢 منخفضة
- **الوقت المتوقع**: 1-2 أيام
- **الملفات المتأثرة**:
  - `pages/DashboardPage.tsx` (السطر 112-120)
- **المتطلبات**:
  - [ ] Dropdown menu للإجراءات
  - [ ] Export data
  - [ ] Share card
  - [ ] Customize view
- **التبعيات**: لا توجد
- **الملاحظات**: Enhancement للـ UX

---

### ❌ 10. Timeline Actions
- **Feature Flag**: `timelineActions`
- **الأولوية**: 🟢 منخفضة
- **الوقت المتوقع**: 1-2 أيام
- **الملفات المتأثرة**:
  - `pages/DashboardPage.tsx` (السطر 228-236)
- **المتطلبات**:
  - [ ] Filter timeline
  - [ ] Export activities
  - [ ] Clear timeline
- **التبعيات**: لا توجد
- **الملاحظات**: Enhancement للـ UX

---

## ⚙️ ميزات الإعدادات (2 ميزات)

### ✅ 11. طلب تحميل البيانات (GDPR) **[مكتملة]**
- **Feature Flag**: `dataExport` ✅ **مفعّلة**
- **الأولوية**: 🔥 عالية (قانونية)
- **الوقت الفعلي**: 3 أيام (مطابق للتقدير!)
- **الملفات المتأثرة**:
  - `pages/SettingsPage.tsx` ✅
  - `components/DataExportModal.tsx` ✅ (جديد - 300 سطر)
  - `locales/ar.json` ✅ (24 مفتاح)
  - `locales/en.json` ✅ (24 مفتاح)
- **المتطلبات**:
  - [x] Modal احترافي للتصدير ✅
  - [x] Format selection (JSON/CSV) ✅
  - [x] Data inclusion options (Activity, Courses, Progress) ✅
  - [x] Multi-step process (Requesting → Processing → Ready) ✅
  - [x] Loading states مع spinner ✅
  - [x] Download functionality ✅
  - [x] Toast notifications ✅
  - [x] Info messages ✅
  - [x] Error handling ✅
  - [ ] API endpoint: `POST /api/users/export-data` (Mock ready)
  - [ ] Email notification (TODO)
- **التبعيات**: Backend data export service (mock متاح)
- **الملاحظات**: ✅ **الميزة مكتملة!** GDPR Article 20 compliance، Frontend كامل ينتظر Backend API

---

### ❌ 12. حذف الحساب
- **Feature Flag**: `accountDeletion`
- **الأولوية**: 🔥 عالية (قانونية)
- **الوقت المتوقع**: 3-4 أيام
- **الملفات المتأثرة**:
  - `pages/SettingsPage.tsx` (السطر 74-78)
- **المتطلبات**:
  - [ ] Confirmation modal (مع password)
  - [ ] API endpoint: `DELETE /api/users/:id`
  - [ ] Soft delete vs Hard delete
  - [ ] إرسال confirmation email
  - [ ] حذف جميع البيانات المرتبطة
  - [ ] Grace period (30 يوم)
- **التبعيات**: Backend deletion service
- **الملاحظات**: متطلب قانوني (GDPR)

---

## 🆘 ميزات الدعم (1 ميزة)

### ❌ 13. نموذج الاتصال
- **Feature Flag**: `contactForm`
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 2-3 أيام
- **الملفات المتأثرة**:
  - `pages/SupportPage.tsx` (السطر 102)
- **المتطلبات**:
  - [ ] Contact form component
  - [ ] Form validation
  - [ ] API endpoint: `POST /api/contact`
  - [ ] إرسال email للدعم
  - [ ] Auto-reply للمستخدم
  - [ ] تذكرة دعم (Support ticket)
- **التبعيات**: Email service (SendGrid, etc.)
- **الملاحظات**: حالياً يعرض alert

---

## 💳 ميزات الدفع (3 ميزات)

### ❌ 14. إعدادات الدفع المتقدمة
- **Feature Flag**: `advancedPayments`
- **الأولوية**: 🔥 عالية
- **الوقت المتوقع**: 10-15 أيام
- **الملفات المتأثرة**:
  - إنشاء `pages/PaymentPage.tsx`
  - `pages/PricingPage.tsx`
- **المتطلبات**:
  - [ ] تكامل بوابة دفع (Stripe/PayPal)
  - [ ] Payment methods (Card, Wallet)
  - [ ] Invoice generation
  - [ ] Payment history
  - [ ] Refund system
  - [ ] Recurring payments
  - [ ] API endpoints للدفع
- **التبعيات**: Payment gateway (Stripe/PayPal)
- **الملاحظات**: أولوية عالية للإيرادات

---

### ❌ 15. نظام المحفظة
- **Feature Flag**: `walletSystem`
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 7-10 أيام
- **الملفات المتأثرة**:
  - إنشاء `pages/WalletPage.tsx`
  - `pages/DashboardPage.tsx`
- **المتطلبات**:
  - [ ] Wallet balance display
  - [ ] Add funds functionality
  - [ ] Transaction history
  - [ ] Withdraw funds
  - [ ] API endpoints للمحفظة
- **التبعيات**: Payment system, Database
- **الملاحظات**: يعتمد على advancedPayments

---

## 👥 ميزات المجتمع (3 ميزات)

### ❌ 16. إنشاء المواضيع
- **Feature Flag**: `createThreads`
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 3-5 أيام
- **الملفات المتأثرة**:
  - `pages/CommunityPage.tsx`
  - `pages/ActualCommunityPage.tsx`
  - `components/CreateThreadModal.tsx`
- **المتطلبات**:
  - [ ] تفعيل CreateThreadModal
  - [ ] API endpoint: `POST /api/threads`
  - [ ] Rich text editor
  - [ ] تحميل صور/ملفات
  - [ ] Tags/categories
- **التبعيات**: Backend threads API
- **الملاحظات**: Modal موجود لكن غير مفعّل

---

### ❌ 17. التفاعل مع المنشورات
- **Feature Flag**: `postInteractions`
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 4-6 أيام
- **الملفات المتأثرة**:
  - `pages/CommunityPage.tsx`
  - `pages/ActualCommunityPage.tsx`
- **المتطلبات**:
  - [ ] Like/Unlike functionality
  - [ ] Comment system
  - [ ] Reply to comments
  - [ ] Share posts
  - [ ] API endpoints للتفاعلات
  - [ ] Real-time updates
- **التبعيات**: Backend interactions API
- **الملاحظات**: يحسّن engagement

---

### ❌ 18. الرسائل الخاصة
- **Feature Flag**: `privateMessages`
- **الأولوية**: 🟢 منخفضة
- **الوقت المتوقع**: 7-10 أيام
- **الملفات المتأثرة**:
  - إنشاء `pages/MessagesPage.tsx`
  - `components/Navbar.tsx` (أيقونة الرسائل)
- **المتطلبات**:
  - [ ] Messaging interface
  - [ ] WebSocket للرسائل الحية
  - [ ] Conversation threads
  - [ ] Read receipts
  - [ ] File sharing
  - [ ] Block/report users
- **التبعيات**: WebSocket, Backend messaging service
- **الملاحظات**: ميزة اجتماعية متقدمة

---

## 📚 ميزات الدورات (3 ميزات)

### ❌ 19. شراء الدورات
- **Feature Flag**: `purchaseCourses`
- **الأولوية**: 🔥 عالية
- **الوقت المتوقع**: 5-7 أيام
- **الملفات المتأثرة**:
  - `pages/CourseDetailPage.tsx`
  - `pages/CoursesPage.tsx`
- **المتطلبات**:
  - [ ] زر "شراء الدورة"
  - [ ] سلة التسوق (Cart)
  - [ ] Checkout process
  - [ ] تكامل مع نظام الدفع
  - [ ] إضافة الدورة للمستخدم بعد الشراء
  - [ ] API endpoint: `POST /api/purchase`
- **التبعيات**: Payment system
- **الملاحظات**: ضروري للإيرادات

---

### ❌ 20. تقييم الدورات
- **Feature Flag**: `rateCourses`
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 2-3 أيام
- **الملفات المتأثرة**:
  - `pages/CourseDetailPage.tsx`
  - `pages/MyLearningPage.tsx`
- **المتطلبات**:
  - [ ] Star rating component (1-5)
  - [ ] Review text (optional)
  - [ ] API endpoint: `POST /api/courses/:id/rate`
  - [ ] عرض متوسط التقييم
  - [ ] Prevent multiple ratings
- **التبعيات**: Backend ratings API
- **الملاحظات**: يحسّن credibility

---

### ❌ 21. تنزيل الشهادات
- **Feature Flag**: `downloadCertificates`
- **الأولوية**: 🔥 عالية
- **الوقت المتوقع**: 5-7 أيام
- **الملفات المتأثرة**:
  - `pages/MyLearningPage.tsx`
  - `pages/CourseDetailPage.tsx`
- **المتطلبات**:
  - [ ] توليد شهادة PDF
  - [ ] Certificate template design
  - [ ] اسم الطالب، الدورة، التاريخ
  - [ ] QR code للتحقق
  - [ ] API endpoint: `GET /api/certificates/:id`
  - [ ] حفظ الشهادات في السحابة
- **التبعيات**: PDF generator, Storage
- **الملاحظات**: ميزة مهمة للطلاب

---

## 🎯 ميزات إضافية غير مذكورة (6 ميزات)

### ❌ 22. إدارة المستخدمين (Admin)
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 5-7 أيام
- **المتطلبات**:
  - [ ] صفحة `/admin/users` كاملة
  - [ ] CRUD operations
  - [ ] تعديل roles
  - [ ] حظر/إلغاء حظر

---

### ❌ 23. تحليلات متقدمة (Analytics)
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 7-10 أيام
- **المتطلبات**:
  - [ ] Google Analytics integration
  - [ ] Custom analytics dashboard
  - [ ] User behavior tracking
  - [ ] Conversion rates

---

### ❌ 24. نظام الإشعارات عبر البريد
- **الأولوية**: 🟡 متوسطة
- **الوقت المتوقع**: 3-5 أيام
- **المتطلبات**:
  - [ ] Email templates
  - [ ] SendGrid/Mailgun integration
  - [ ] Email preferences في Settings

---

### ❌ 25. نظام النقاط والجوائز (Gamification)
- **الأولوية**: 🟢 منخفضة
- **الوقت المتوقع**: 10-15 أيام
- **المتطلبات**:
  - [ ] Points system
  - [ ] Badges/Achievements
  - [ ] Leaderboard
  - [ ] Rewards redemption

---

### ❌ 26. دعم لغات إضافية
- **الأولوية**: 🟢 منخفضة
- **الوقت المتوقع**: 5-7 أيام
- **المتطلبات**:
  - [ ] French locale
  - [ ] German locale
  - [ ] Spanish locale

---

### ❌ 27. نظام الإحالة (Referral System)
- **الأولوية**: 🟢 منخفضة
- **الوقت المتوقع**: 7-10 أيام
- **المتطلبات**:
  - [ ] رابط إحالة فريد لكل مستخدم
  - [ ] تتبع الإحالات
  - [ ] مكافآت للإحالات الناجحة

---

## 📊 الإحصائيات

| الفئة | العدد | الوقت المتوقع |
|------|------|---------------|
| **الأساسية** | 3 | 15-22 يوم |
| **الملف الشخصي** | 3 | 7-10 أيام |
| **لوحة التحكم** | 4 | 9-14 يوم |
| **الإعدادات** | 2 | 6-9 أيام |
| **الدعم** | 1 | 2-3 أيام |
| **الدفع** | 2 | 17-25 يوم |
| **المجتمع** | 3 | 14-21 يوم |
| **الدورات** | 3 | 12-17 يوم |
| **إضافية** | 6 | 37-59 يوم |
| **الإجمالي** | **27** | **~119-180 يوم** |

---

## 🎯 خطة العمل المقترحة

### المرحلة 1 (شهر 1) - الأولوية القصوى 🔥
1. ✅ البحث بـ API حقيقي
2. ✅ تعديل الملف الشخصي
3. ✅ تغيير كلمة المرور
4. ✅ طلب البيانات (GDPR)
5. ✅ حذف الحساب (GDPR)
6. ✅ شراء الدورات

### المرحلة 2 (شهر 2) - الأولوية العالية 🟡
7. ✅ إعدادات الدفع المتقدمة
8. ✅ تنزيل الشهادات
9. ✅ رفع صورة شخصية
10. ✅ التقارير المفصلة
11. ✅ نموذج الاتصال
12. ✅ الإشعارات الحية

### المرحلة 3 (شهر 3) - التحسينات 🟢
13. ✅ إنشاء المواضيع
14. ✅ التفاعل مع المنشورات
15. ✅ تقييم الدورات
16. ✅ عرض جميع الأنشطة
17. ✅ نظام المحفظة
18. ✅ إدارة المستخدمين

### المرحلة 4 (شهر 4) - الميزات المتقدمة ⭐
19. ✅ الدردشة المباشرة
20. ✅ الرسائل الخاصة
21. ✅ تحليلات متقدمة
22. ✅ نظام الإشعارات عبر البريد
23. ✅ نظام النقاط والجوائز
24. ✅ دعم لغات إضافية
25. ✅ نظام الإحالة

---

## 📝 ملاحظات مهمة

### الأولويات:
- 🔥 **عالية**: ضرورية للإطلاق الأولي (11 ميزة)
- 🟡 **متوسطة**: مهمة لتحسين التجربة (10 ميزات)
- 🟢 **منخفضة**: ميزات إضافية للمستقبل (6 ميزات)

### التبعيات الأساسية:
1. **Backend API** - معظم الميزات تحتاج API
2. **Payment Gateway** - Stripe أو PayPal
3. **WebSocket** - للميزات الحية
4. **Email Service** - SendGrid أو Mailgun
5. **Storage Service** - AWS S3 أو Cloudinary
6. **PDF Generator** - للشهادات والتقارير

### عند تفعيل أي ميزة:
1. ✅ غيّر flag في `config/featureFlags.ts`
2. ✅ اختبر الميزة بالكامل
3. ✅ حدّث هذا الملف
4. ✅ وثّق في FEATURE_FLAGS_GUIDE.md

---

**آخر تحديث**: 16 أكتوبر 2025 - 03:40 AM  
**الحالة**: 24 ميزة قيد التطوير ❌ | 6 ميزات مكتملة ✅  
**التقدم الإجمالي**: 20% (6/30)

## 🎉 الميزات المنجزة:

### ✅ 1. تعديل الملف الشخصي
- Frontend كامل مع validation
- Toast notifications
- Loading states
- Error handling
- جاهز للربط بـ Backend API

### ✅ 2. تغيير كلمة المرور
- Modal احترافي مع backdrop
- Password strength indicator (5 levels)
- Show/Hide password toggles
- Form validation شامل
- Toast notifications
- جاهز للربط بـ Backend API

### ✅ 3. طلب تحميل البيانات (GDPR) ⭐ جديد!
- Modal متعدد المراحل (Requesting → Processing → Ready)
- Format selection (JSON/CSV)
- Data inclusion options
- Download functionality
- Toast notifications
- GDPR Article 20 compliance
