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
- [Troubleshooting](#troubleshooting)
- [Limitations](#limitations)
- [Optional](#optional)
- [Donate](#donate) 

## Features  
- **Auto refresh**  
  Queues refresh every 60 seconds by default (refreshes only the queue, not the entire website).  

- **Case queue monitor and notifications**  
  Notifications are generated when:  
  - A new or updated case appears in the queue, that wasn't there before.  
  - The status of a case in the queue changes to 'Pending Support (New Activity)'.  
    NOTE: The 'Case Number' and 'Status' columns need to be visible in the queue. The 'Subject' column is optional.  .       

- **QuickLink Menu**

  - QuickLink menu item for FTS SFTP.   
    Uses the active case tab to get the FTS Account/Password details (tested with WinSCP - https://winscp.net).  
    If no case is open it will open the FTS homepage.  

  - QuickLink menu item for Quixy Defects.  
    Uses the active case tab to formulate the Quixy URL to open. If no case is open it will open the Quixy homepage

  - QuickLink menu item for the MF Translation Request page. 
    If you have a case open and active, the case number and severity will be used to populate the corresponding fields of the translation page.   

  - QuickLink menu item for the MF Documentation.
    If you have a case open and active, the product in the case will be checked and the appropriate docs page opened.  
    If no cases are opened the general docs page will be opened.  

  - QuickLink menu item for Reminders/Follow-Up in Outlook Calendar.  
    Gets the case number, subject and URL from the active, open case and opens a new window to create an Outlook Calendar event with reminder set.  
    By default the calendar event start date is 3 days in the future but this can be changed, by the user, in the new window.  

  - QuickLink menu items for Support Portal, SLD Web Portal, PerformPlus and AMC Links.  

- **Quixy URLs**  
  Creates URLs to Quixy defects in queues (if you have the 'R&D Change Requests' column visible).  
  ![01](images/QuixyQueueLink.png)  

- **Highlight Fixed Defects**  
  Highlights 'Planned in new release' or 'Software update provided' Close Codes in your Pending Release Queue.  
  ![02](images/defectHighlight.png)  

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

![03](images/configPopup.png) 

or

![04](images/configPopup2.png)

Alternatively:  

Click on the toolbar extension menu and select Options.  

![05](images/configPage.png)   

### What can be configured?

- The Auto Refresh time can be configured (in seconds). _Default 60 seconds. Minimum is 30. Disabled < 30_

- The name of the case queue to monitor and URL for the webhook notifications.  
  Desktop and Web notifications can be enabled/disabled.  
  For the case queue name, either enter the name of the case queue that you want to monitor or append the name of the case queue you want to monitor with 'NOTIFY':  
  ![06](images/CaseQueueName.png) 

- The supported products list. This list is used to open the correct documentation page when the documentation link/icon is clicked.  

  **Requirements**  
  The list must be in JSON format.  
  The list consists of key/value pairs, separated by , and enclosed in braces { }.  
  The Key must exactly match the name of the product as it appears in cases:   
  ![07](images/acuProduct.png)  
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

- I need ideas.

## Troubleshooting

- If Notifications are not working, there are a few things that could be blocking them that you need to check.  
  Windows (Desktop) notifications need to be enabled and not silenced.  
  Ensure Windows Focus Assist is set to OFF.   
  Make sure Notifications are enabled, for the Salesforce website, in your browser:  
  ![08](images/EnableNotify.png)

- If the FTS button does not open with your local SFTP client, it may not be supported.
  The SFTP Client application used, depends on the default app set in the OS for SFTP Protocol:  
  ![09](images/sftp.png)  
  This can be changed in Settings -> Apps -> Default apps -> Choose default applications by protocol  

## Limitations  

- Where there are 2 sets of documentation for one product, it's only possible to configure the docs QuickLink to re-direct to one of those URLs.
  i.e. product 'Reflection for Secure IT' has docs in 'rsit-server-client-unix' and 'rsit-windows-client'

## Optional

This extension benefits from using it in conjunction with the [Lightning Extension](https://chrome.google.com/webstore/detail/lightning-extension/hfglcknhngdnhbkccblidlkljgflofgh)  

When 'Link Grabber' is enabled in that extension, when you click the Desktop Notifications from the Case Queue Monitor, the cases are opened in the same Salesforce tab rather than opening a new tab.  

![10](images/LinkGrabber.png) 

## Donate

Buy me a coffee/beer?  

- PayPal: [http://bit.ly/unixmitdonate](http://bit.ly/unixmitdonate)  
- Bitcoin (BTC): 15B532vsNhwHMEhmRvbs3HGLth3dieNkYq  
- Ethereum (ETH): 0xf0CCFCEe0E2a78D54A9b7aDE8A42aff5A327D970  
- Dogecoin (DOGE): DUJapbaS6gNoa5ZpHS85nSqkNL7cLJz8gb  