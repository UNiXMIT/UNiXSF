@ECHO OFF
set "PATH=C:\Program Files\7-Zip;%PATH%"
del SFExt.zip
:: powershell Compress-Archive \GitHub\UNiXSF\SFExt\* \GitHub\UNiXSF\SFExt.zip
7z a SFExt.zip .\SFExt\*
7z a SFExt.zip README.md
7z a SFExt.zip images\