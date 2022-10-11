# Salesforce Extension

This is a browser extension to add useful features to Salesforce.  
It works in Chrome, Brave and Edge (Chromium) browsers.  

- [Features](#features)
- [Install](#install)
- [Update](#update)
- [Configuration](#configuration)
- [Feature Wishlist](#feature-wishlist)
- [Limitations](#limitations)
- [Donate](#donate)

## Features  
- Auto refresh of queues every 60 seconds (refreshes only the queue, not the entire website).

- Create URLs to Quixy defects in cases.   
   ![1](images/QuixyCaseLink.png)     

-  Creates URLS to Quixy defects in queues (if you have the R&D Change Requests column visible).  
   ![2](images/QuixyQueueLink.png)  

- Highlights Fixed defects ('Planned in new release' or 'Software update provided' statuses) in Pending Release Queue.  
   ![3](images/defectHighlight.png)  

- Creates URLs to FTS via SFTP (tested with WinSCP - https://winscp.net).  
   ![4](images/fts.png)  
   ![5](images/fts2.png)  
   The application used depends on the default app set in the OS for SFTP Protocol:  
   ![6](images/sftp.png)  
   This can be changed in Settings -> Apps -> Default apps -> Choose default applications by protocol  

- Added QuickLink buttons for the MF Translation Request page and MF Documentation page (removing SF links that weren't useful).  
   ![7](images/buttons.png)  
   If you have a case open, the product in the case will be checked and the appropriate docs page opened (only some products are supported).  
   If no cases are opened the general docs page will be opened.  

## Install
Before installing, close any instances of Salesforce you have open.  

1. Download and execute update.cmd, which downloads the extension files, in the directory where you would like the extension to be stored.  
   i.e. curl -O https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/update.cmd
2. Open Google Chrome, Brave or Edge.  
3. Navigate to chrome://extensions (or brave://extensions or edge://extensions depending on your browser) in the browser address bar.   
4. Toggle "Developer mode".  
5. Click 'Load unpacked'.  
6. Select the folder you created in step 1.  
7. The new features are now active.
8. You can now turn off "Developer mode". 
9. Once you have loaded Salesforce in your browser, you can check if the extension has loaded correctly by checking the browser console log (ctrl + shift + J) for the message 'SFExt Loaded'.  
![8](images/ExtLoaded.png)  

## Update
Before updating, close any instances of Salesforce you have open.

1. Execute update.cmd, which downloads the updated extension files, overwriting the old files.
2. Open Google Chrome, Brave or Edge.  
3. Navigate to chrome://extensions (or brave://extensions or edge://extensions depending on your browser). 
4. Click the reload icon in the Salesforce Extension tile.

Alternatively you can:

1. Close all instances of your browser.
2. Execute update.cmd, which downloads the updated extension files, overwriting the old files.
3. The extension will now be updated when you start your browser again.

### Troubleshooting the update

If you have issues with the update, re-downloaded the update.cmd file according to Step 1 in the Install steps.

## Configuration

The extension can be configured via the extensions options page:  

Click on detail button of the extension, then click 'Extension Options'. A new tab will open with the options page.  

Alternatively:  

Click on the toolbar extension menu and select Options.  

![9](images/configPage.png)   

### What can be configured?

- The Auto Refresh time can be configured (in seconds). _Default 30 seconds_

- The supported products list. This list is used to open the correct documentation page when the documentation link/icon is clicked.  

  **Requirements**  
  The list must be in JSON format.  
  The list consists of key/value pairs, separated by , and enclosed in braces { }.  
  The Key must exactly match the name of the product as it appears in cases:  
  ![10](images/acuProduct.png)  
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

Click Save to save your configuration options.  


## Feature Wishlist
 
- Check for product version on a case and open the correct documentation for that version.  
- Fix the limitation where FTS and Quixy case links only work on the first case tab open.  

## Limitations

1. If you have multiple case tabs open, Quixy and FTS case URLs will only work on the first open case tab.  
   ![11](images/sftabs.png)  

## Donate

Buy me a coffee/beer?  

- PayPal: http://bit.ly/unixmitdonate  
- Bitcoin (BTC): 15B532vsNhwHMEhmRvbs3HGLth3dieNkYq  
- Ethereum (ETH): 0xf0CCFCEe0E2a78D54A9b7aDE8A42aff5A327D970  
- Dogecoin (DOGE): DUJapbaS6gNoa5ZpHS85nSqkNL7cLJz8gb  