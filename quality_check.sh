#!/bin/bash

# اجعل السكريبت يتوقف عند حدوث أي خطأ
set -e

echo "DEBUG: Current directory: $(pwd)"
echo "DEBUG: Python executable: $(which python)"
echo "DEBUG: pip executable: $(which pip)"

echo "=============== 1. Installing Dependencies ==============="
pip install -r requirements.txt
echo "DEBUG: Dependencies installed."

echo "=============== 2. Formatting Code with Ruff ==============="
# يقوم بإعادة تنسيق الكود ليتوافق مع أفضل الممارسات
ruff format .
echo "DEBUG: Ruff formatting complete."

echo "=============== 3. Analyzing Code with Ruff ==============="
# يقوم بتحليل الكود بحثًا عن أخطاء محتملة ومشاكل في الأسلوب
ruff check . --fix
echo "DEBUG: Ruff check complete."

echo "=============== 4. Scanning for Security Issues with Bandit ==============="
# يقوم بفحص الكود بحثًا عن ثغرات أمنية معروفة
bandit -r .
echo "DEBUG: Bandit scan complete."

echo "=============== 5. Running Tests with Pytest ==============="
# يقوم بتشغيل جميع اختبارات الوحدة ويولد تقرير تغطية
pytest --cov=.
echo "DEBUG: Pytest run complete."

echo "=============== ✅ Quality Check Passed Successfully! ==============="