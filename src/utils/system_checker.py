import os
import logging
from typing import Dict
from .image_generator import ImageGenerator

class SystemChecker:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.generator = ImageGenerator()
        
    def check_system_status(self) -> Dict:
        """التحقق من حالة النظام والوظائف"""
        status = {
            "api_connection": self._check_api_connection(),
            "storage_access": self._check_storage_access(),
            "generator_status": self._check_generator(),
            "performance_tracking": self._check_performance_tracking()
        }
        return status
        
    def _check_api_connection(self) -> bool:
        """التحقق من الاتصال بالـ API"""
        try:
            # محاولة اتصال بسيطة
            test_result = self.generator.generate_image("test", dry_run=True)
            return test_result is not None
        except Exception as e:
            self.logger.error(f"API connection failed: {str(e)}")
            return False
            
    def _check_storage_access(self) -> bool:
        """التحقق من إمكانية الوصول للتخزين"""
        try:
            test_path = os.path.join("src", "assets", "generated", "test.txt")
            with open(test_path, 'w') as f:
                f.write("test")
            os.remove(test_path)
            return True
        except Exception as e:
            self.logger.error(f"Storage access failed: {str(e)}")
            return False
            
    def run_system_test(self) -> Dict:
        """تشغيل اختبار كامل للنظام"""
        status = self.check_system_status()
        self.logger.info(f"System test results: {status}")
        return status
