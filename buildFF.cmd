@ECHO OFF
set "PATH=C:\Program Files\7-Zip;%PATH%"
del SFExtFF.zip
:: powershell Compress-Archive \GitHub\UNiXSF\SFExt\* \GitHub\UNiXSF\SFExt.zip
7z a SFExtFF.zip .\SFExtFF\*