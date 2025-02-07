# [UNiXSF](https://github.com/UNiXMIT/UNiXSF)
# Salesforce Extension

This is a browser extension to add useful features to Salesforce.  
It works in Chrome, Brave, Edge (Chromium) and Firefox browsers.  

- [Features](#features)
- [Install](#install)
- [Update](#update)
- [Changelog](https://unixmit.github.io/UNiXSF/CHANGELOG)
- [Configuration](#configuration)
- [Features/Improvements Wishlist](#featuresimprovements-wishlist)
- [Troubleshooting](#troubleshooting)
- [Limitations](#limitations)
- [Donate](#donate) 

## Features  
- **Auto refresh**  
  Queues refresh every 60 seconds by default (refreshes only the queue, not the entire website).  

- **Case queue monitor and notifications**  
  Notifications are generated when:  
  - A new or updated case appears in the queue, that wasn't there before.  
  - The status of a case in the queue changes to 'Pending Support (New Activity)'.  
    NOTE: The 'Case Number' and 'Status' columns need to be visible in the queue. The 'Subject' column is optional.         

- **QuickLink Menu**

  - Documentation.  
    Opens the online documentation page.    

  - Reminders/Follow-Up in Outlook Calendar.  
    Gets the case number, subject and URL from the active, open case and opens a new window to create an Outlook Calendar event with reminder set.  
    By default, the calendar event start date is 3 days in the future, but this can be changed, by the user, in the new window.   

  - 3rd Line Referral.  
    Generates an email, using a set template and information from the case.     

  - Additional menu items for Support Portal, Education System and Huddle.  

- **Copy to clipboard button for Case Number and Subject**  
  The main case icon (Briefcase Icon) copies the Case Number, Subject and Case URL to the clipboard.     

- **SalesForce Link Grabber**  
  Opens SalesForce (\*.force.com\*) links in existing SF tab and activates the tab.  

- **Add Case Subject to Case Header**  
  Grabs the case subject and adds it to the header next to the case number.  

## Install

### Chromium  

1. Download the Latest Release SFExt.zip, and unzip into the directory where you would like the extension to be stored.  
2. Open Google Chrome, Brave or Edge.  
3. Navigate to chrome://extensions (or brave://extensions or edge://extensions depending on your browser) in the browser address bar.   
4. Toggle "Developer mode".  
5. Click 'Load unpacked'.  
6. Select the folder where you downloaded the files to in step 1.  
7. The new features are now active.
8. You can now turn off "Developer mode". 
9. Once you have loaded Salesforce in your browser, if the extension has loaded correctly, it should say 'SFExt x.x.x' in the lower right corner.  

### Firefox  

1. Download the latest *.xpi file.
2. Right-click on the *.xpi file and 'Open With...' Firefox.
3. In the Pop-up that appears in Firefox, click 'Add'.
4. Once you have loaded Salesforce in your browser, if the extension has loaded correctly, it should say 'SFExt x.x.x' in the lower right corner.  

## Update

### Chromium

1. Download the Latest Release SFExt.zip, and unzip into the directory where the previous version of the SF Extension is located, overwriting the old files. 
2. Open Google Chrome, Brave or Edge.  
3. Navigate to chrome://extensions (or brave://extensions or edge://extensions depending on your browser). 
4. Click the reload icon in the Salesforce Extension tile.

### Firefox

[How to update add-ons.](https://support.mozilla.org/en-US/kb/how-update-add-ons)

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
  For the case queue name, either enter the name of the case queue that you want to monitor or append the name of the case queue you want to monitor with 'NOTIFY'.  

- The Education System URL.  

- The Huddle URL.   

- The 3rd line referral email address (NOT the DL name).  

- Enable/Disable Salesforce Link Grabber.  

- Custom links can be added to the QuickLink Menu. The format for the configuration is in JSON where the Key is the text of the link and the Value is the URL to load.  

### Save Options

Saves your options using Chrome sync. The stored data will automatically be synced to any Chrome browser that you are logged into, provided you have Chrome sync enabled.  

### Reset Options

Resets your options to default.  

### Export Options

Exports your saved options to sfext.json and allows you to download the file to your local machine.  

### Import Options

Imports your exported options from the previously exported JSON file. The imported options are then saved using Chrome sync.  

## Features/Improvements Wishlist

- I need ideas.

## Troubleshooting

- If Notifications are not working, there are a few things that could be blocking them that you need to check.  
  Windows (Desktop) notifications need to be enabled and not silenced.  
  Ensure Windows Focus Assist is set to OFF.   
  Make sure Notifications are enabled, for the Salesforce website, in your browser:  
  ![08](images/EnableNotify.png)

- Microsoft Edge and Chrome (Chromium based browsers) have a query string limit of 4035 characters. If the URL generated by the 3rd Line Referral QuickLink is longer than 4035 characters it will fail with a 'HTTP 500 server error'. 

- Enable 'dom.events.asyncClipboard.clipboardItem' in Firefox about:config to allow the clipboard API to use MIME type objects.  

## Limitations  

N/A  

## Donate

Buy me a coffee/beer?  

- PayPal: [http://bit.ly/unixmitdonate](http://bit.ly/unixmitdonate)  
- Bitcoin (BTC): 15B532vsNhwHMEhmRvbs3HGLth3dieNkYq  
- Ethereum (ETH): 0xf0CCFCEe0E2a78D54A9b7aDE8A42aff5A327D970  
- Dogecoin (DOGE): DUJapbaS6gNoa5ZpHS85nSqkNL7cLJz8gb  