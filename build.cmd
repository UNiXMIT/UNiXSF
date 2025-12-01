@ECHO OFF

SET OPTS=%1

FOR /F %%V IN ('jq -r ".version" "SFExtFF\manifest.json"') DO SET "VER=%%V"
SET SFExtFF=SFExtFF-%VER%.zip
SET SFExt=SFExt-%VER%.zip

IF "%OPTS%"=="submit" GOTO :SUBMIT

:BUILD
CALL web-ext build --overwrite-dest --filename %SFExtFF% --artifacts-dir . --source-dir .\SFExtFF\
CALL web-ext build --overwrite-dest --filename %SFExt% --artifacts-dir . --source-dir .\SFExt\
MKDIR updates\Chromium\%VER%
MOVE %SFExt% updates\Chromium\%VER%\
GOTO :END

:SUBMIT
FOR /F "usebackq delims=" %%A IN (`jq -r ".AMO_KEY" FFAPI.json`) DO SET AMO_KEY=%%A
FOR /F "usebackq delims=" %%B IN (`jq -r ".AMO_SECRET" FFAPI.json`) DO SET AMO_SECRET=%%B
web-ext sign --api-key %AMO_KEY% --api-secret %AMO_SECRET% --upload-source-code %SFExtFF% --channel unlisted
GOTO :END

:END
PAUSE