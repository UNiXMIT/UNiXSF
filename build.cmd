@ECHO OFF

SET OPTS=%1

FOR /F %%V IN ('jq -r ".version" "SFExtFF\manifest.json"') DO SET "VER=%%V"

IF "%OPTS%"=="submit" GOTO :SUBMIT

:BUILD
MKDIR updates\FF\%VER%
CALL web-ext build --overwrite-dest --filename SFExt-%VER%.zip --artifacts-dir . --source-dir .\SFExt\
MKDIR updates\Chromium\%VER%
MOVE SFExt-%VER%.zip updates\Chromium\%VER%\
GOTO :END

:SUBMIT
CALL web-ext sign --source-dir ./SFExtFF/ --channel unlisted
GOTO :END

:END
PAUSE