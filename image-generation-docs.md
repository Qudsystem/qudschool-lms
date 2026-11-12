# توليد الصور باستخدام Gemini API

## المتطلبات الأساسية
1. مفتاح API من Google (Gemini API Key)
2. تثبيت المكتبات المطلوبة:
   ```bash
   pip install google-genai Pillow
   ```

## إعداد المشروع

### 1. هيكل المجلدات
```
project/
│
├── src/
│   ├── utils/
│   │   └── image_generator.py
│   └── assets/
│       └── generated/
│
└── config/
    └── api_config.py
```

### 2. إعداد التكوين (config/api_config.py)
```python
import os

# تكوين مفتاح API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# تكوين مسارات حفظ الصور
IMAGE_SAVE_PATH = os.path.join(os.getcwd(), 'src', 'assets', 'generated')

# تكوين النموذج
MODEL_CONFIG = {
    'model_name': 'gemini-2.5-flash-image',
    'mime_types': ['image/png', 'text/plain']
}
```

### 3. كود توليد الصور (src/utils/image_generator.py)
```python
import os
from io import BytesIO
from PIL import Image
from google import genai
from google.genai import types
from config.api_config import GEMINI_API_KEY, IMAGE_SAVE_PATH, MODEL_CONFIG

class ImageGenerator:
    def __init__(self):
        self.client = genai.Client(api_key=GEMINI_API_KEY)
        self._ensure_save_directory()
    
    def _ensure_save_directory(self):
        """التأكد من وجود مجلد حفظ الصور"""
        os.makedirs(IMAGE_SAVE_PATH, exist_ok=True)
    
    def generate_image(self, prompt: str, filename: str = None) -> str:
        """
        توليد صورة من وصف نصي
        
        Args:
            prompt (str): وصف الصورة المطلوبة
            filename (str, optional): اسم ملف الصورة. Defaults to None.
        
        Returns:
            str: مسار الصورة المحفوظة
        """
        try:
            # توليد الصورة
            response = self.client.models.generate_content(
                model=MODEL_CONFIG['model_name'],
                contents=[prompt],
                config=types.GenerateContentConfig(
                    response_mime_types=MODEL_CONFIG['mime_types']
                )
            )

            # معالجة الاستجابة
            for part in response.candidates[0].content.parts:
                if part.inline_data and part.inline_data.mime_type.startswith('image/'):
                    # تحويل البيانات إلى صورة
                    image = Image.open(BytesIO(part.inline_data.data))
                    
                    # تحديد اسم الملف
                    if not filename:
                        filename = f"generated_{os.urandom(4).hex()}.png"
                    
                    # حفظ الصورة
                    save_path = os.path.join(IMAGE_SAVE_PATH, filename)
                    image.save(save_path)
                    
                    return save_path
            
            raise ValueError("لم يتم العثور على بيانات صورة في الاستجابة")
        
        except Exception as e:
            print(f"خطأ في توليد الصورة: {str(e)}")
            return None

    def batch_generate(self, prompts: list, prefix: str = "img") -> list:
        """
        توليد مجموعة من الصور دفعة واحدة
        
        Args:
            prompts (list): قائمة بأوصاف الصور المطلوبة
            prefix (str): بادئة لأسماء الملفات
        
        Returns:
            list: قائمة بمسارات الصور المولدة
        """
        paths = []
        for idx, prompt in enumerate(prompts):
            filename = f"{prefix}_{idx}.png"
            path = self.generate_image(prompt, filename)
            if path:
                paths.append(path)
        return paths
```

## أمثلة الاستخدام

### 1. توليد صورة واحدة
```python
from src.utils.image_generator import ImageGenerator

generator = ImageGenerator()

# توليد صورة شعار
logo_prompt = """
صورة ثلاثية الأبعاد لشعار تعليمي يجمع بين:
- حرف K باللون الأزرق الفاتح
- رمز البرمجة (</>)
- خلفية بيضاء ناعمة
- تأثيرات ظل خفيفة
"""

logo_path = generator.generate_image(logo_prompt, "school_logo.png")
print(f"تم حفظ الشعار في: {logo_path}")
```

### 2. توليد مجموعة صور
```python
# قائمة بأوصاف الصور المطلوبة للبرامج التعليمية
program_images = [
    "صورة لطفل يتعلم البرمجة على جهاز كمبيوتر محمول، مع رموز برمجية ملونة تطفو حوله",
    "مجموعة من الأطفال يعملون معاً على مشروع روبوت تعليمي، في بيئة مختبر مضيئة وحديثة",
    "طفلة تصمم واجهة تطبيق على جهاز لوحي، مع عناصر تصميم ملونة تظهر على الشاشة"
]

# توليد الصور
paths = generator.batch_generate(program_images, prefix="program")
for path in paths:
    print(f"تم توليد صورة في: {path}")
```

## سياسة توليد الصور عند الغموض
- لا يتم توليد صورة إذا كان الوصف غير واضح بصرياً. بدلاً من ذلك:
  - نطلب من المستخدم توضيحاً أو
  - نقترح أوصافاً معدّة مسبقاً يمكن للمستخدم اختيار أحدها.
- لا نقوم بتوسيع المعنى الدلالي للنص (no semantic drift). يمكن فقط إضافة تحسينات تقنية/فنية.

## كشف النية البصرية — خوارزمية مبسطة (اقتراح تنفيذي)
- من الأفضل تنفيذ دالة تحقق قبل استدعاء المولد:
  - قاعدة كلمات مفتاحية (visual_keywords)
  - (اختياري) POS tagging أو NER لالتقاط كائنات وأوصاف بصرية
  - عتبة مطابقة بسيطة (مثلاً ≥1 كلمة مفتاحية أو وجود صيغة وصفية)
- إذا لم تتجاوز العتبة، أعد قيمة "ambiguous" مع اقتراحات.

مثال دالة مساعدة (يمكن إضافتها في src/utils/prompt_utils.py):

```python
# filepath: c:\Users\Eng.Hossam Galal-PC\Desktop\school\src\utils\prompt_utils.py
def detect_visual_intent(prompt: str, keywords=None) -> dict:
    """
    Simple visual intent detector.
    Returns: {"intent": "visual"|"ambiguous", "matches": [...], "suggestions": [...]}
    """
    # ...existing code...
    if keywords is None:
        keywords = {"قطة","كلب","شجرة","جبال","شاطئ","شعار","logo","illustration","photorealistic","person","طفل","رجل","امرأة"}
    words = set(word.lower() for word in prompt.split())
    matches = list(words & set(keywords))
    if matches:
        return {"intent":"visual","matches":matches,"suggestions":[]}
    # ambiguous: prepare short suggestions
    suggestions = [
        "مشهد طبيعي مع شجر ومياه",
        "شعار بسيط يحتوي حرف K ورمز برمجي",
        "صورة لطفل يستخدم حاسوب في بيئة تعليمية"
    ]
    return {"intent":"ambiguous","matches":[],"suggestions":suggestions}
```

## دمج الفحص داخل مسار التوليد
- قبل استدعاء ImageGenerator.generate_image:
  1. ندعو detect_visual_intent
  2. إذا intent == "visual" → استمر بالتوليد الطبيعي مع تحسينات مسموح بها
  3. إذا intent == "ambiguous" → أعد الاقتراحات للمستخدم ولا تولّد حتى الموافقة

مثال تدفق مبسّط للمطور:

```python
# شرح تكاملي (غير قابل للتشغيل مباشرة، نموذج للعملية)
intent = detect_visual_intent(prompt)
if intent["intent"] == "ambiguous":
    # return suggestions to UI and wait for user selection/confirmation
    return {"status":"clarify","suggestions": intent["suggestions"]}
else:
    # proceed to generate image
    path = generator.generate_image(prompt, filename)
```

## اعتبارات جودة وأمان
- سجّل كل حالة ambiguous لتعلم تحسين قواعد الكلمات المفتاحية.
- احتفظ بنسخة من الاقتراحات التي وافق عليها المستخدم لتخزين prompts_map (لإصلاح لاحق).
- تأكد من فحص المحتوى (safety filter) قبل التوليد.

## تحسينات مقترحة
1. إضافة خيارات لتحديد أبعاد الصور المولدة
2. إضافة دعم لتنسيقات صور مختلفة
3. إضافة وظائف لضغط الصور قبل الحفظ
4. إضافة نظام للتخزين المؤقت لتجنب توليد نفس الصور مرتين