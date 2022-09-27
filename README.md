# Salesforce Extension

- Auto refresh of queues every 60 seconds.
- Create URLs to Quixy defects in cases and on queues (if you have the R&D Change Requests column visible).    
- Highlights Fixed defects (Planned in new release or Software update provided) in Pending Release Queue.  
- Creates URLs to FTS via SFTP (tested with WinSCP - https://winscp.net).  
   The application used depends on the default app set in the OS for SFTP Protocol:  
    ![1](sftp.png)  
    This can be changed in Settings -> Apps -> Default apps -> Choose default applications by protocol  

## Installation
Before installing, close any instances of Salesforce you have open.  

1. Download and execute update.cmd, which downloads the extension files, in the directory where you would like the extension to be stored
2. Open Google Chrome, Brave or Edge  
3. Navigate to chrome://extensions (or brave://extensions or edge://extensions depending on your browser) 
4. Toggle "Developer mode"  
5. Click 'Load unpacked'  
6. Select the folder you created in step 1  
7. Auto refresh, Fixed defect highlighting, Quixy links and FTS links are now active
8. You can now turn off "Developer mode" 

## Update
Before updating, close any instances of Salesforce you have open.

1. Execute update.cmd, which downloads the updated extension files, overwriting the old files
2. Open Google Chrome, Brave or Edge  
3. Navigate to chrome://extensions (or brave://extensions or edge://extensions depending on your browser) 
4. Click the reload icon in the Salesforce Extension tile