import os
from PIL import Image
import logging
from typing import Dict, List, Optional
from .image_generator import ImageGenerator

class ImageValidator:
    def __init__(self):
        self.generator = ImageGenerator()
        self.logger = logging.getLogger(__name__)
        
    def validate_image(self, image_path: str) -> Dict:
        """التحقق من صلاحية الصورة"""
        try:
            with Image.open(image_path) as img:
                img.verify()
                return {
                    "status": "valid",
                    "path": image_path,
                    "size": os.path.getsize(image_path),
                    "dimensions": img.size
                }
        except Exception as e:
            return {
                "status": "corrupted",
                "path": image_path,
                "error": str(e)
            }
    
    def scan_directory(self, directory: str) -> Dict[str, List]:
        """فحص مجلد للصور المفقودة والتالفة"""
        missing = []
        corrupted = []
        valid = []
        
        # فحص الصور المتوقعة
        for filename in os.listdir(directory):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                path = os.path.join(directory, filename)
                result = self.validate_image(path)
                if result["status"] == "valid":
                    valid.append(path)
                else:
                    corrupted.append(path)
                    
        return {
            "valid": valid,
            "corrupted": corrupted,
            "missing": missing
        }
    
    def auto_repair(self, scan_results: Dict, prompts_map: Dict[str, str]) -> Dict:
        """إصلاح تلقائي للصور التالفة والمفقودة"""
        repaired = []
        failed = []
        
        # معالجة الصور التالفة
        for path in scan_results["corrupted"]:
            filename = os.path.basename(path)
            if filename in prompts_map:
                try:
                    os.remove(path)  # حذف الصورة التالفة
                    new_path = self.generator.generate_image(
                        prompts_map[filename],
                        filename
                    )
                    if new_path:
                        repaired.append(new_path)
                    else:
                        failed.append(path)
                except Exception as e:
                    self.logger.error(f"Failed to repair {path}: {str(e)}")
                    failed.append(path)
                    
        return {
            "repaired": repaired,
            "failed": failed
        }
