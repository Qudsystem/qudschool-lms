import logging
from typing import Dict, Optional
from datetime import datetime
from .image_generator import ImageGenerator
from .performance_tracker import PerformanceTracker

class ExecutionHandler:
    def __init__(self):
        self.generator = ImageGenerator()
        self.tracker = PerformanceTracker()
        self.logger = logging.getLogger(__name__)
        
    def validate_content(self, prompt: str) -> Dict[str, bool]:
        """التحقق من المحتوى وفق أفضل الممارسات"""
        checks = {
            "length": len(prompt) <= 1000,
            "has_content": bool(prompt.strip()),
            "safe_content": self._check_content_safety(prompt)
        }
        return checks

    def execute_with_tracking(self, prompt: str) -> Dict:
        """تنفيذ مع التتبع والتقييم"""
        trace_id = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.logger.info(f"Starting execution {trace_id}")
        
        try:
            with self.tracker.track_operation(trace_id):
                # التحقق من المحتوى
                content_checks = self.validate_content(prompt)
                if not all(content_checks.values()):
                    raise ValueError("Content validation failed")
                
                # التنفيذ مع التتبع
                result = self.generator.generate_image(prompt)
                
                # تقييم النتيجة
                quality_score = self.tracker.evaluate_result(result)
                
                return {
                    "status": "success",
                    "trace_id": trace_id,
                    "result": result,
                    "quality_score": quality_score,
                    "metrics": self.tracker.get_metrics(trace_id)
                }
                
        except Exception as e:
            self.logger.error(f"Execution failed: {str(e)}", extra={"trace_id": trace_id})
            return {
                "status": "error",
                "trace_id": trace_id,
                "error": str(e)
            }
