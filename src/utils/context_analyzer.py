import nltk
from typing import Dict, Optional
import logging

class ContextAnalyzer:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.context_cache = {}
        
    def analyze_prompt(self, prompt: str) -> Dict:
        """تحليل الوصف وتحديد السياق"""
        try:
            # تحليل النص
            words = nltk.word_tokenize(prompt)
            tags = nltk.pos_tag(words)
            
            # استخراج الكلمات الرئيسية
            keywords = [word for word, tag in tags if tag in ['NN', 'NNS', 'JJ']]
            
            # تحديد السياق
            context = self._determine_context(keywords)
            
            return {
                "original_prompt": prompt,
                "context": context,
                "keywords": keywords,
                "confidence": self._calculate_confidence(context, keywords)
            }
        except Exception as e:
            self.logger.error(f"خطأ في تحليل النص: {str(e)}")
            return None
            
    def _determine_context(self, keywords: list) -> str:
        """تحديد السياق بناءً على الكلمات الرئيسية"""
        contexts = {
            "طبيعة": ["شجرة", "جبل", "بحر", "سماء"],
            "حيوانات": ["قطة", "كلب", "طائر"],
            "أشخاص": ["شخص", "طفل", "رجل", "امرأة"],
            "تقنية": ["حاسوب", "هاتف", "برمجة"]
        }
        
        # حساب تطابق الكلمات مع كل سياق
        matches = {}
        for context, context_words in contexts.items():
            matches[context] = len(set(keywords) & set(context_words))
            
        # اختيار السياق الأكثر تطابقاً
        if any(matches.values()):
            return max(matches.items(), key=lambda x: x[1])[0]
        return "عام"
