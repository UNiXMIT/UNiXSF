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
- [Optional](#optional)
- [Donate](#donate)

## Features  
- Auto refresh of queues every 60 seconds by default (refreshes only the queue, not the entire website).

- Case queue monitor and notifications when a new or updated case appears in the queue. If a case is already in a queue and then gets updated again, no notification will be generated. Only cases entering and leaving the queue are monitored, not the last modified time. The case queue set to monitor needs to be open so that the case queue monitor can find it. The extension can only act on what it open as it cannot read backend SF data. If you do not auto/manually refresh the queue then the monitor cannot check for new cases.   
   Notifications via Desktop and Webhooks are supported.  
   Case queue monitor notifications link to the case URL when clicked.  
   The name of the case to monitor can be added on the extension config page.  
   For the Case Queue Monitor to work, 'Case Number' has to be the first column in your queue, so that the cases numbers can be identified and found.  
   If the 'Subject' column is added to the queue, the case subject will also be sent in the notification.   
   Windows (Desktop) notifications need to be enabled and not silenced.  
   Ensure Windows Focus Assist is set to OFF.   
   Make sure Notifications are enabled, for the Saleforce website, in your browser:  
   ![0](images/EnableNotify.png)

- Quixy defect QuickLink. Uses the active case tab to formulate the Quixy URL to open. If no case is open it will open the Quixy homepage.     
   ![1](images/quixy.png)  

- FTS SFTP QuickLink. Uses the active case tab to get the FTS Account/Password details (tested with WinSCP - https://winscp.net). If no case is open it will open the FTS homepage.   
   ![2](images/fts.png)   
   The application used depends on the default app set in the OS for SFTP Protocol:  
   ![3](images/sftp.png)  
   This can be changed in Settings -> Apps -> Default apps -> Choose default applications by protocol  

- QuickLink buttons for Support Portal, SLD Web Portal, PerformPlus and AMC Links.  
   ![4](images/support.png)
   ![5](images/sld.png)
   ![6](images/pp.png)
   ![7](images/amc.png)

- QuickLink button for the MF Translation Request page. 
   If you have a case open and active, the case number will be used to populate the Case Number field of the translation page.  
   ![8](images/translation.png)  

- QuickLink button for the MF Documentation.
   If you have a case open and active, the product in the case will be checked and the appropriate docs page opened.  
   If no cases are opened the general docs page will be opened.  
   ![9](images/docs.png)

-  Creates URLs to Quixy defects in queues (if you have the R&D Change Requests column visible).  
   ![10](images/QuixyQueueLink.png)  

- Highlights Fixed defects ('Planned in new release' or 'Software update provided' statuses) in Pending Release Queue.  
   ![11](images/defectHighlight.png)  

- Reminders. I have not implemented this in the Extension as there is an easy way to do this natively in Salesforce.  
  With a case open, click Chatter -> New Task and enter the details in the Task as appropriate. When done, click Save.  
  You will recieve a reminder at the default time of 8:00 AM on the date that the task is due.  
  The time of the reminder can be configured in the Saleforce settings page:  
  ![12](images/sfsettings1.png)   
  ![13](images/sfsettings2.png)   

## Install

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

1. Download the [Latest Release UNiXSF.zip](https://github.com/UNiXMIT/UNiXSF/releases/latest), and unzip into the directory where the previous version of the SF Extension is located, overwriting the old files. 
2. Open Google Chrome, Brave or Edge.  
3. Navigate to chrome://extensions (or brave://extensions or edge://extensions depending on your browser). 
4. Click the reload icon in the Salesforce Extension tile.

## Configuration

The extension can be configured via the extension options page:  

Click on the Salesforce Extension Icon and a popup will appear showing the config page.  

![14](images/configPopup.png) 

or

![15](images/configPopup2.png)

Alternatively:  

Click on the toolbar extension menu and select Options.  

![16](images/configPage.png)   

### What can be configured?

- The Auto Refresh time can be configured (in seconds). _Default 60 seconds. Minimum is 30. Disabled < 30_

- The name of the case queue to monitor and URL for the webhook notifications.  
   Desktop and Web notifications can be enabled/disabled.  
   For the case queue name, either enter the name of the case queue that you want to monitor or append the name of the case queue you want to monitor with 'NOTIFY':  
   ![17](images/CaseQueueName.png) 

- The supported products list. This list is used to open the correct documentation page when the documentation link/icon is clicked.  

  **Requirements**  
  The list must be in JSON format.  
  The list consists of key/value pairs, separated by , and enclosed in braces { }.  
  The Key must exactly match the name of the product as it appears in cases:   
  ![18](images/acuProduct.png)  
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

### Save Options

Saves your options using Chrome sync. The stored data will automatically be synced to any Chrome browser that you are logged into, provided you have Chrome sync enabled.  

### Reset Options

Resets your options to default.  

### Export Options

Exports your saved options to sfext.json and allows you to download the file to your local machine.  

### Import Options

Imports your exported options from the file sfext.json located in the config directory of this extension. The imported options are then saved using Chrome sync.  

## Features/Improvements Wishlist

- Highlight keywords in Closure Summary.

## Issues/Limitations

- Where there are 2 sets of documentation for one product, it's only possible to configure the docs QuickLink to re-direct to one of those URLs.
  i.e. product 'Reflection for Secure IT' has docs in 'rsit-server-client-unix' and 'rsit-windows-client'

## Optional

This extension benefits from using it in conjunction with the [Lightning Extension](https://chrome.google.com/webstore/detail/lightning-extension/hfglcknhngdnhbkccblidlkljgflofgh)  

When 'Link Grabber' is enabled in that extension, when you click the Desktop Notifications from the Case Queue Monitor, the cases are opened in the same Salesforce tab rather than opening a new tab.  

![19](images/LinkGrabber.png) 

## Donate

Buy me a coffee/beer?  

- PayPal: [http://bit.ly/unixmitdonate](http://bit.ly/unixmitdonate)  
- Bitcoin (BTC): 15B532vsNhwHMEhmRvbs3HGLth3dieNkYq  
- Ethereum (ETH): 0xf0CCFCEe0E2a78D54A9b7aDE8A42aff5A327D970  
- Dogecoin (DOGE): DUJapbaS6gNoa5ZpHS85nSqkNL7cLJz8gb  