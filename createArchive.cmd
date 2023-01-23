@ECHO OFF
del SFExt.zip
:: powershell Compress-Archive \GitHub\UNiXSF\SFExt\* \GitHub\UNiXSF\SFExt.zip
7z a SFExt.zip .\SFExt\*
7z a SFExt.zip README.md
7z a SFExt.zip images\