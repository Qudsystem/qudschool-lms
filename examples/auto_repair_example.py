from src.utils.image_validator import ImageValidator
from src.utils.image_generator import ImageGenerator

# إنشاء المثيلات
generator = ImageGenerator()
validator = ImageValidator()

# توليد بعض الصور للاختبار
prompts = {
    "test1.png": "صورة لمنظر طبيعي جميل",
    "test2.png": "صورة لقطة صغيرة",
}

for filename, prompt in prompts.items():
    generator.generate_image(prompt, filename)

# فحص المجلد للصور التالفة
results = validator.scan_directory("src/assets/generated")
print("Scan results:", results)

# إصلاح تلقائي
if results["corrupted"] or results["missing"]:
    repair_results = validator.auto_repair(results, generator.get_prompt_map())
    print("Repair results:", repair_results)

# تشغيل المراقبة المستمرة
generator.monitor_directory("src/assets/generated")
