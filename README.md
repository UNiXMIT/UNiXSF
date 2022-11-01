# Salesforce Extension

This is a browser extension to add useful features to Salesforce.  
It works in Chrome, Brave and Edge (Chromium) browsers.  

- [Features](#features)
- [Install](#install)
- [Update](#update)
- [Latest Release](https://github.com/UNiXMIT/UNiXSF/releases/latest)
- [Changelog](https://github.com/UNiXMIT/UNiXSF/releases)
- [Configuration](#configuration)
- [Features/Improvements Wishlist](#featuresimprovements-wishlist)
- [Issues/Limitations](#issueslimitations)
- [Donate](#donate)

## Features  
- Auto refresh of queues every 60 seconds by default (refreshes only the queue, not the entire website).

- Case queue monitor and notifications when a new or updated case appears in the queue. If a case is already in a queue and then gets updated again, no notification will be generated. Only cases entering and leaving the queue are monitored, not the last modified time.   
   Notifications via Desktop and Webhooks are supported.  
   Case queue monitor notifications link to the case URL when clicked.  
   The name of the case to monitor can be added on the extension config page.  
   For the Case Queue Monitor to work, 'Case Number' has to be the first column in your queue, so that the cases numbers can be identified and found.

- Quixy defect QuickLink. Uses the active case tab to formulate the Quixy URL to open. If no case is open it will open the Quixy homepage.       

-  Creates URLs to Quixy defects in queues (if you have the R&D Change Requests column visible).  
   ![2](images/QuixyQueueLink.png)  

- Highlights Fixed defects ('Planned in new release' or 'Software update provided' statuses) in Pending Release Queue.  
   ![3](images/defectHighlight.png)  

- FTS SFTP QuickLink. Uses the active case tab to get the FTS Account/Password details (tested with WinSCP - https://winscp.net). If no case is open it will open the FTS homepage.   
   The application used depends on the default app set in the OS for SFTP Protocol:  
   ![6](images/sftp.png)  
   This can be changed in Settings -> Apps -> Default apps -> Choose default applications by protocol  

- Added QuickLink buttons for MF Translation Request, MF Documentation, Support Portal, SLD Web Portal and PerformPlus.  
   ![7](images/buttons.png)  
   If you have a case open and active, the product in the case will be checked and the appropriate docs page opened.  
   If no cases are opened the general docs page will be opened. 
   If you have a case open and active, the case number will be used to populate the Case Number field of the translation page.

## Install
Before installing, close any instances of Salesforce you have open.  

1. Download the [Latest Release UNiXSF.zip](https://github.com/UNiXMIT/UNiXSF/releases/latest), and unzip into the directory where you would like the extension to be stored.  
2. Open Google Chrome, Brave or Edge.  
3. Navigate to chrome://extensions (or brave://extensions or edge://extensions depending on your browser) in the browser address bar.   
4. Toggle "Developer mode".  
5. Click 'Load unpacked'.  
6. Select the folder you created in step 1.  
7. The new features are now active.
8. You can now turn off "Developer mode". 
9. Once you have loaded Salesforce in your browser, if the extension has loaded correctly it should say 'SFExt' in the lower right corner.  

## Update
Before updating, close any instances of Salesforce you have open.

1. Download the [Latest Release UNiXSF.zip](https://github.com/UNiXMIT/UNiXSF/releases/latest), and unzip into the directory where the previous version of the SF Extension is located, overwriting the old files. 
2. Open Google Chrome, Brave or Edge.  
3. Navigate to chrome://extensions (or brave://extensions or edge://extensions depending on your browser). 
4. Click the reload icon in the Salesforce Extension tile.

## Configuration

The extension can be configured via the extension options page:  

Click on the Salesforce Extension Icon and a popup will appear showing the config page.  

![8](images/configPopup.png) 

or

![9](images/configPopup2.png)

Alternatively:  

Click on the toolbar extension menu and select Options.  

![10](images/configPage.png)   

### What can be configured?

- The Auto Refresh time can be configured (in seconds). _Default 60 seconds. Minimum is 30. Disabled < 30_

- The name of the case queue to monitor and URL for the webhook notifications.  
   Desktop and Web notifications can be enabled/disabled.  
   For the case queue name, either enter the name of the case queue that you want to monitor or append the name of the case queue you want to monitor with 'NOTIFY':  
   ![11](images/CaseQueueName.png) 

- The supported products list. This list is used to open the correct documentation page when the documentation link/icon is clicked.  

  **Requirements**  
  The list must be in JSON format.  
  The list consists of key/value pairs, separated by , and enclosed in braces { }.  
  The Key must exactly match the name of the product as it appears in cases:   
  ![12](images/acuProduct.png)  
  The Value must match the sub-domain of the documentation page for that product:  
  i.e. for AcuCOBOL the URL is https://www.microfocus.com/documentation/extend-acucobol so the value must be:  
  ```
  extend-acucobol
  ```
  #### Example
   To add ChangeMan ZMF to your list of supported products, add:  
   ```
   ,"ChangeMan ZMF":"changeman-zmf"
   ```
   to the list of products. It should now look like this:  

   {"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","Net Express / Server Express":"net-express"**,"ChangeMan ZMF":"changeman-zmf"**}

- Custom links can be added to the footer of Salesforce. The format for the configuration is in JSON where the Key is the text of the link and the Value is the URL to load.  
  The default is {"SFExt":"https://unixmit.github.io/UNiXSF"} which sets the text to 'SFExt' and the URL of the link to 'https://unixmit.github.io/UNiXSF'  

## Features/Improvements Wishlist

- Highlight keywords in Closure Summary.

## Issues/Limitations

- Where there are 2 sets of documentation for one product, it's only possible to configure the docs QuickLink to re-direct to one of those URLs.
  i.e. product 'Reflection for Secure IT' has docs in 'rsit-server-client-unix' and 'rsit-windows-client'

## Donate

Buy me a coffee/beer?  

- PayPal: [http://bit.ly/unixmitdonate](http://bit.ly/unixmitdonate)  
- Bitcoin (BTC): 15B532vsNhwHMEhmRvbs3HGLth3dieNkYq  
- Ethereum (ETH): 0xf0CCFCEe0E2a78D54A9b7aDE8A42aff5A327D970  
- Dogecoin (DOGE): DUJapbaS6gNoa5ZpHS85nSqkNL7cLJz8gb  