@ECHO OFF
FOR /F %%V IN ('jq -r ".version" "SFExtFF\manifest.json"') DO SET "VER=%%V"

gh release create %VER% ^
    --latest ^
    --title "%VER%" ^
    --notes-file "LATEST.md" ^
    --repo "UNiXMIT/UNiXSF" ^
    --target "main" ^
    "updates\Chromium\%VER%\SFExt-%VER%.zip" ^
    "updates\FF\%VER%\1aa420af9a0c4d9d8e9d-%VER%.xpi" ^
    "*.md"