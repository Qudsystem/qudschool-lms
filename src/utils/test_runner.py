import unittest
from .image_generator import ImageGenerator
from .system_checker import SystemChecker

class ImageGenerationTests(unittest.TestCase):
    def setUp(self):
        self.generator = ImageGenerator()
        self.checker = SystemChecker()
        
    def test_system_status(self):
        """اختبار حالة النظام"""
        status = self.checker.check_system_status()
        self.assertTrue(all(status.values()), "System check failed")
        
    def test_image_generation(self):
        """اختبار توليد الصور"""
        test_prompt = "اختبار توليد صورة بسيطة"
        result = self.generator.generate_image(test_prompt)
        self.assertIsNotNone(result, "Image generation failed")
        
    def test_batch_generation(self):
        """اختبار توليد مجموعة صور"""
        test_prompts = ["اختبار 1", "اختبار 2"]
        results = self.generator.batch_generate(test_prompts)
        self.assertEqual(len(results), 2, "Batch generation failed")

if __name__ == '__main__':
    unittest.main()
