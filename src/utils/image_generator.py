import os
from io import BytesIO
from PIL import Image
from google import genai
from google.genai import types
from .context_analyzer import ContextAnalyzer

class ImageGenerator:
    def __init__(self, api_key: str = None):
        """
        تهيئة مولد الصور باستخدام Gemini API

        Args:
            api_key (str, optional): مفتاح API. إذا لم يتم توفيره، سيتم البحث عن GEMINI_API_KEY في متغيرات البيئة.
        """
        self.api_key = api_key or os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("يجب توفير مفتاح API إما مباشرة أو عبر متغير البيئة GEMINI_API_KEY")
        
        self.client = genai.Client(api_key=self.api_key)
        self._ensure_save_directory()
        self.prompt_cache = {}  # تخزين الأوصاف للإصلاح التلقائي
        self.context_analyzer = ContextAnalyzer()

    def _ensure_save_directory(self):
        """التأكد من وجود مجلد حفظ الصور"""
        self.save_path = os.path.join(os.getcwd(), 'src', 'assets', 'generated')
        os.makedirs(self.save_path, exist_ok=True)

    def generate_image(self, prompt: str, filename: str = None, size: tuple = None) -> str:
        """
        توليد صورة من وصف نصي

        Args:
            prompt (str): وصف الصورة المطلوبة
            filename (str, optional): اسم ملف الصورة. إذا لم يتم توفيره، سيتم توليد اسم عشوائي.
            size (tuple, optional): حجم الصورة المطلوب بالصيغة (العرض، الارتفاع)

        Returns:
            str: مسار الصورة المحفوظة أو None في حالة حدوث خطأ
        """
        try:
            # إعداد تكوين النموذج
            config = types.GenerateContentConfig(
                response_mime_types=["image/png", "text/plain"]
            )

            # إرسال الطلب إلى Gemini
            response = self.client.models.generate_content(
                model="gemini-2.5-flash-image",
                contents=[prompt],
                config=config
            )

            # معالجة الاستجابة
            for part in response.candidates[0].content.parts:
                if part.inline_data and part.inline_data.mime_type.startswith('image/'):
                    # تحويل البيانات إلى صورة
                    image = Image.open(BytesIO(part.inline_data.data))

                    # تغيير حجم الصورة إذا تم تحديد الحجم
                    if size:
                        image = image.resize(size, Image.Resampling.LANCZOS)

                    # تحديد اسم الملف
                    if not filename:
                        filename = f"generated_{os.urandom(4).hex()}.png"

                    # حفظ الصورة
                    save_path = os.path.join(self.save_path, filename)
                    image.save(save_path, optimize=True)

                    return save_path

            raise ValueError("لم يتم العثور على بيانات صورة في الاستجابة")

        except Exception as e:
            print(f"خطأ في توليد الصورة: {str(e)}")
            return None

    def generate_image(self, prompt: str, filename: str = None) -> str:
        """توليد صورة مع تحليل السياق"""
        try:
            # تحليل السياق
            context_info = self.context_analyzer.analyze_prompt(prompt)
            
            if not context_info:
                # إذا فشل التحليل، استخدم وصف عام
                enhanced_prompt = self._generate_generic_prompt(prompt)
            else:
                # تحسين الوصف بناءً على السياق
                enhanced_prompt = self._enhance_prompt(context_info)
            
            # توليد الصورة باستخدام الوصف المحسن
            return self._generate_with_context(enhanced_prompt, filename)
            
        except Exception as e:
            self.logger.error(f"خطأ في توليد الصورة: {str(e)}")
            return None
            
    def _enhance_prompt(self, context_info: Dict) -> str:
        """تحسين الوصف بناءً على السياق"""
        context = context_info["context"]
        original_prompt = context_info["original_prompt"]
        
        context_enhancements = {
            "طبيعة": "مع إضاءة طبيعية وألوان حية",
            "حيوانات": "في بيئتها الطبيعية مع تفاصيل واضحة",
            "أشخاص": "مع تعابير طبيعية وإضاءة مناسبة",
            "تقنية": "في بيئة عصرية مع تفاصيل تقنية دقيقة"
        }
        
        enhancement = context_enhancements.get(context, "بجودة عالية وتفاصيل واضحة")
        return f"{original_prompt}, {enhancement}"
        
    def _generate_generic_prompt(self, prompt: str) -> str:
        """توليد وصف عام عند عدم وجود سياق واضح"""
        return f"{prompt}, بتصميم احترافي وجودة عالية"
        
    def get_prompt_map(self) -> Dict[str, str]:
        """استرجاع خريطة الأوصاف المخزنة"""
        return self.prompt_cache.copy()
        
    def monitor_directory(self, directory: str, interval: int = 3600):
        """مراقبة مجلد للصور التالفة"""
        from .image_validator import ImageValidator
        validator = ImageValidator()
        
        while True:
            scan_results = validator.scan_directory(directory)
            if scan_results["corrupted"] or scan_results["missing"]:
                repair_results = validator.auto_repair(
                    scan_results,
                    self.get_prompt_map()
                )
                self.logger.info(f"Repair results: {repair_results}")
            time.sleep(interval)

    def batch_generate(self, prompts: list, prefix: str = "img", size: tuple = None) -> list:
        """
        توليد مجموعة من الصور دفعة واحدة

        Args:
            prompts (list): قائمة بأوصاف الصور المطلوبة
            prefix (str, optional): بادئة لأسماء الملفات. Defaults to "img".
            size (tuple, optional): حجم موحد لكل الصور بالصيغة (العرض، الارتفاع)

        Returns:
            list: قائمة بمسارات الصور المولدة
        """
        paths = []
        for idx, prompt in enumerate(prompts):
            filename = f"{prefix}_{idx}.png"
            path = self.generate_image(prompt, filename, size)
            if path:
                paths.append(path)
        return paths

    def compress_image(self, image_path: str, quality: int = 85) -> str:
        """
        ضغط صورة موجودة لتقليل حجم الملف

        Args:
            image_path (str): مسار الصورة المراد ضغطها
            quality (int, optional): جودة الضغط (0-100). Defaults to 85.

        Returns:
            str: مسار الصورة المضغوطة
        """
        try:
            image = Image.open(image_path)
            compressed_path = image_path.replace('.', '_compressed.')
            image.save(compressed_path, 'JPEG', quality=quality, optimize=True)
            return compressed_path
        except Exception as e:
            print(f"خطأ في ضغط الصورة: {str(e)}")
            return None

# مثال على الاستخدام
if __name__ == "__main__":
    try:
        generator = ImageGenerator()
        
        # توليد صورة واحدة
        logo_prompt = """
        صورة ثلاثية الأبعاد لشعار تعليمي يجمع بين:
        - حرف K باللون الأزرق الفاتح
        - رمز البرمجة (</>)
        - خلفية بيضاء ناعمة
        - تأثيرات ظل خفيفة
        """
        
        logo_path = generator.generate_image(
            prompt=logo_prompt,
            filename="school_logo.png",
            size=(800, 600)
        )
        
        if logo_path:
            print(f"تم توليد الشعار بنجاح في: {logo_path}")
            
            # ضغط الصورة
            compressed_path = generator.compress_image(logo_path)
            if compressed_path:
                print(f"تم ضغط الصورة في: {compressed_path}")
                
    except Exception as e:
        print(f"حدث خطأ: {str(e)}")