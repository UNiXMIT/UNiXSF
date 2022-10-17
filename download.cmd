@ECHO OFF
:: This is executed by update.cmd
curl -s -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt.js
curl -s -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf16.png
curl -s -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf32.png
curl -s -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf48.png
curl -s -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png
curl -s -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/manifest.json
curl -s -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/update.cmd
curl -s -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/config.html
curl -s -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/config.js
curl -s -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/config.css
del mf16.png
del mf32.png
del mf48.png
del mf128.png

