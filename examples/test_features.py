from src.utils.image_generator import ImageGenerator
from src.utils.image_validator import ImageValidator
import os

def test_all_features():
    # 1. إنشاء المثيلات
    generator = ImageGenerator()
    validator = ImageValidator()
    
    # 2. تجربة توليد صورة واحدة
    print("اختبار توليد صورة واحدة...")
    single_prompt = "رسم كرتوني لقطة صغيرة تلعب بكرة صوف زرقاء"
    result = generator.generate_image(single_prompt, "cat.png")
    print(f"تم حفظ الصورة في: {result}")
    
    # 3. تجربة توليد مجموعة صور
    print("\nاختبار توليد مجموعة صور...")
    prompts = [
        "منظر طبيعي لغابة خضراء",
        "شاطئ رملي مع غروب الشمس",
        "جبال مغطاة بالثلج"
    ]
    results = generator.batch_generate(prompts, prefix="nature")
    print(f"تم توليد {len(results)} صور")
    
    # 4. فحص الصور
    print("\nفحص الصور المولدة...")
    image_dir = os.path.join("src", "assets", "generated")
    scan_results = validator.scan_directory(image_dir)
    print(f"نتائج الفحص: {scan_results}")
    
    # 5. تجربة الإصلاح التلقائي
    if scan_results["corrupted"]:
        print("\nإصلاح الصور التالفة...")
        repair_results = validator.auto_repair(
            scan_results,
            generator.get_prompt_map()
        )
        print(f"نتائج الإصلاح: {repair_results}")

if __name__ == "__main__":
    test_all_features()
