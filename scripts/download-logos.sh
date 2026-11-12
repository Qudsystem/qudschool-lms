#!/bin/bash

# Create logos directory
mkdir -p public/assets/logos

# Download logos with correct URLs and PNG format for consistency
curl "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.png" -o public/assets/logos/techcrunch.png
curl "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Forbes_logo.svg/1280px-Forbes_logo.png" -o public/assets/logos/forbes.png
curl "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/UCL_logo.svg/1280px-UCL_logo.png" -o public/assets/logos/ucl.png
curl "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Entrepreneur-magazine-logo.png/1280px-Entrepreneur-magazine-logo.png" -o public/assets/logos/entrepreneur.png

# Create a fallback logo
echo '<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="none"/></svg>' > public/assets/logos/fallback-logo.svg
