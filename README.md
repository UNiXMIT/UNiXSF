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
   ![1](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACCUlEQVRIibWWv2tUQRSFv3v3ga9INtmHP2orOwULa1GjGBGjKewiKJgiYf+GoL24iAELFQ1K1KhgpWiiCBFsU9iIYKGlWXZX2Uh8cyzc1Qe6urvmnWrmnpn73RmYy9jMzIwnSTINHJc0yAbJzBqSHlSr1ctRkiTTkioblbwtSQB7h4eHFUk6kTGuuPs2SWPAPPAVONWh0hchhNcdvBJwFsDdxyMzG2xRU+C5pO3AmKRlM/vSCRJCWHH3Zx1OsRk4AxSAYpTxCmY2n6nm0h/v4ZdfllT+25q2XNJqNwv7laTVKI7j0TRNB/KCFAqFz9Ha2to5YCQvyPr6+tPIzA5K2p0XxMzM80qeVV8QSUvAtbwh5yW92zBIq+qVTOh9rVZ7aWYTwBvg1f9Crg8NDR2R9DEDvZkkyR5gB/C2WCzu50cL6gtyIU3TqUajccfMDrcZIYQ5Se1Wc6xer8+laXoamO0ZEkK45e47Je3LhJdLpdIH4GQmNhpF0a4QwtWeIe7+xN0l6QDwqRW+UavVjgKl1rwKjJjZN3d/3DME2Cxp0d23Ag+BZhzH98zsZ1eWdBcohhCWgC2dEkWdjJYGJD1qjW83m83YzA61TTObBCb/kaP7d2Jmi+4+0UVhv6nrDZIuApt6BfQEAfr+ZLikRr+bu1Tdgft5EiQtmCSrVCpT7j6ew79roVwuz34Had7gjIO2WZwAAAAASUVORK5CYII=)  

- FTS SFTP QuickLink. Uses the active case tab to get the FTS Account/Password details (tested with WinSCP - https://winscp.net). If no case is open it will open the FTS homepage.   
   ![2](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAAB4UlEQVRYhe2Wv0scQRiG3/d0PbAwmFQBUwWxCuI/ECNJmyba2ASbdMfcbJRcJ+mTYna6bUISAglXp0khIhaSPyKFmOJIICjCeeI6n4Un/mBH7vZ2iQn7lPMt7zzMfMt8wA2CeYREUTRJcrFSqXyo1Wrbf03GGDNFch3AXQA/ST5SSv3IklXJUQQAJgCsW2vvZ8nLfDIpIueh5A6AuX5PKNPJxHE8SnKtK+IASLfkAIiI3BORb81mc6hwmXa7PQLgFgBH8gWA425pl6Tuyo23Wq3hwmXCMNx1zk2TfKCUenexppSyJGcAzCilDvvJzevXPgIwDOBPvV6/kzXnWhlr7VPn3BLJsbR6p9N51mg09i/IHAHY8MTtich7rfVX337eO7XWvhWRZdLvGwRBcHUJwBPf9yTnjTFvtNav0uqpPRNF0ZyIvPRaDADJFWvtbM8yAOaRUz+l+QBY6FlGRG4XJAIAcM6lNvlAz0HelDI+BpKpVqsjcRwHg+ac0dfbcZUkST4lSXJwI2QAPM5D4oz/p2fyppTx4ZP5XeSmJH+lrfvepi84nWeLwInI555lwjDcAvAa54N2XgiAVa3197TitWOCMeYhyeckJ0Skr0n/0ibksYjskPyolNrMmlNSUvJPcgJyI5mltRc+jAAAAABJRU5ErkJggg==)   
   The application used depends on the default app set in the OS for SFTP Protocol:  
   ![3](images/sftp.png)  
   This can be changed in Settings -> Apps -> Default apps -> Choose default applications by protocol  

- QuickLink buttons for Support Portal, SLD Web Portal and PerformPlus.  
   ![4](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAADJ0lEQVRIieWVT2hcVRTGf9+diakQkFRaJZbGlkIqgouCRUUXFVeiG6EiuBEriot57yUQCm1ohyIUspi89ybZScZF/QOuSq0IXSiCduFCcBXFGjc6pi4ySWpNOzP3uHACSZPOe+lk1293ud/5fpxz73sX7jfpXoqq1eph7/0RSQfN7DHAmdlqFEXhjoNrtdqupaWl9yWFwPCWYdKhIAiu5clzeUyVSmX38vLy15Iqd4MCmNnxPHm5wc65aeCZHNaTaZq+lyczc9TT09PD7XZ7Po+3o3/N7EAURQvdTMWslFar9ZIkAT8BP5rZIUkPA3sAA66b2V/OuWtm9jbwoKRjwGc9gSXtA/Deh6Ojo9908yZJcgMYBUaycvOc8UOAFQqFq1lGM/toXU1vYDMTsBAEwa0sb6PRmAPanZrewGuZeUzlcvk28IekF6empp7oFTwi6WYecEc3gaecc5/cM7hcLjtJx7z3XUPu0NqYD/cC9sCKpAN5iDMzMwPA/s7yz27ezM8JmAQm4zi+GEXRFYA0TfvNrCRpELhULBZ/brfbj7RarUngAWDOzIJuoZm3z8yUpulVM2uFYfiCJEuS5A3g0y3sDeCtMAwvZuVmXi5JJumkpGer1eppAOfct8AV4AdJZ83sdefcy6urq/vzQGEbz2KSJB8ApyS9EwTB7Pq9OI6flvRcu92+PDY29muevDxnDIBz7jvvvczswziOh4eGhs4B1Ov1s8AEoL6+vl+AnQWb2W4ASeeB0/V6/d3O1h5J583s1JonVyN5jcAQ0CyVShPe+6OSZiXNeu+PlkqlCaDZ8eRS1zOuVCpPFgqF48ArwBHgehiGj27ljeN4QdJe4Dcz+0LS54uLi993/gWbtGHUtVpt18rKyvPe+1clvQbsu8O/eNcOpEVgL3BQUgAEg4ODfydJ8pWZXWo2m1+Oj4//s6njOI5HJZ0DBroM4RZwAbgs6XcAM3uc/yfyJtDfpfaGmZ2JomhqQ8eSChlQOsEngBNmlmHdpIEOA1h3ubz3HwPz203bhuaLxeKFtcWGy5Wmab/3fkRS304SzazZaDTmOu/1far/AN+NOS2RjAonAAAAAElFTkSuQmCC)
   ![5](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAAB3klEQVRYhe2WsYsTQRjF3ze7xVU5QYvNH3KFHAoHh50WClqIQvqMk0pERVJESKU7s62NdqbzWrHT7v4Aq4Nck4CxUQKiYZ+FEY91yW0ms+jBvmbYN7tvfsx8OzNAozMgCRmWpullpdQ1EXmhtf647vdxKJDRaBRNJpMDktskdwFcXDdDhYIZj8dbALaXj4lPRjCYEPqvYFbWjHPuCsk7WDHtrVbraqfT+VawE2vt24I3Jfmq1+sV/dNhrLUDko9WwQLAbDaLSuwtAPtFU0RuW2sHxpgnZVmly+ScuwTg4WkgHhIAj7Ms260MA+AmAu9BJ4HyPL9VGSbP8/M1gQAASF6oDPOv5AOTA7iulNoBcFToO1JK7YjIjeV7tcN8abfbB1rrQwB78/n8BwAs2z2t9WGSJG8AfF032OdsOjedTlOS90Tk+LfZ7/e/AzgmKVmWpfhzNFSWV82Q7DrnnpP8649zzg1Jdn1yNylgY619dtJI03QI4L5v4EZXCBHpOefixWIxjOP4ge+MBIEBfi1ZFEVdkptGnf19pjaVwiilPtc87qfScctMkq8BbF4E5cqjKBpVhjHGvCf5tAYgkhxorT+Uda68Jjjn9kneBdAOADIB8NIY8y5AVqNGjRp56Sd11aisaN1EbAAAAABJRU5ErkJggg==)
   ![6](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAEI0lEQVRIie2WXYhUZRjHf885+zEsrIgtUWJUuNHFEkZeCF7kRYERRpla9kF1twTtOXPWBPvQtguzbJudc2a3VRG7qUhstS+puyIIE4QgL7JQkaz2ooI1+piZ3fP+u3BWj7MzsxbRTT1weM887/P8/+f/Pu887wv/279k1moyjuOtwAoz+x34Q1IZ+DgMw7eycUmSPCZpUZqm+wcHB7+/HOK2eeYDoEdS1rcRuIRY0giw0Pf9nXEcvz4zM7N106ZNZ1sBe/MQH27g2zYHxPPWmNkBIAUebWtrO14sFje0Am661MVi8REz2wf4GfdEEAQbzEyNckZGRq7zPK8ArAUkKcjn86OXTZwkyXpJ+zm/IkeBFcCpXC63vL+//1wrJbX8vKQCgJndFwTB2/MSDw8P97S3t38F9ABPVavVUkdHR+D7/oSkX51zA2Z2l6SltZSvgQ+cc2NRFE3O4hSLxcjMCsAvZtYXBMF3WZ45NW5vbx+ukR4Ow/DFzZs3/xaG4Y40TW9xzp0AtkjqA3K1ZxnwjOd5J+I43jiLk8/nR4BDwAJgez3PJcSjo6PXAg8DFedckPn6DcCbQHc9QMYWAG9kyYE8MC3pwVKptLgpcZqm9wO+mX0YRdFpgEKhsMjMxqkri3NupaRVDYTsGRsbuwogDMNvzewg0Jam6QNNiYHbAGobCwDf9wPginp5URQdyefznzZQ3j0zM/NE5ve7AJ7n3dqKuA/AzL7M+O5oAD6frQGI4/gVSbsAJN2eJMlHxWJxHcztXD21MbsDb5p9cc6tjKLoSDYhDEOrkawEPqu5Z3f8Ms7XHqBL0mozqwIT9YoF0N3dXc340tkX3/c7mkl0zmXnXG3cWx8maTvUKTazHyVdMzU1tRg4XXOfAm4GkPRJHMf1Sud0MTM7CZDL5SbK5fIkcHVtalc+nz8KdTWWdLymrC/jfr+ZymYm6X2A/v7+aWBPzT2Zy+Weno25RLFz7mXf93+qVqsX6mhmJUkhF2sFQJIkq9I0bdRyz01PT1/oz2Y2Blyfpulr2Xbb8jzOkNwr6QDzn2bOObcuiqJ35sOcDwiAIAgOAuuBVgfE1OWStiQeGhryxsfHr5RkAGEYHvJ9fykwJOkYMAVMSTpmZs/5vt+bJR0ZGVk4m9vImk7EcbwD2AJUgDNmdkbSF7lcbltt0zQ0SVYqlZ6U9ALwUhiGz/4lxcDPtbETuFHSamBLpVK5oVlCoVDoTZLkkKSdgCfpm2axTRXv3r27q1wun+TifxDOL+2Ac+7zNE0nu7q6zDm3RNJy4G5J9wDtwDkzeygIgkZXp9bEAEmSPC7p1VYxdTYD7PM87/mBgYEfWgW2vGV2dnburVQqg5J6gU2SymZ2J9ALLKmFnQVOSzrsed579TeNv21JkiyN43jtPwL2n7Y/AV3byB9Mdkm4AAAAAElFTkSuQmCC)

- QuickLink button for the MF Translation Request page. 
   If you have a case open and active, the case number will be used to populate the Case Number field of the translation page.  
   ![7](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACMElEQVRIie2UPW8TQRCG33fPyC6QyxR8VFCRiorCgggkKvqIhtDZkhPvnpCud0OJdR9IgSYIEEjUICGQQIKYCCkVBf4DyQ9I4+Ls3A6FnehwfHb8BU1eaaXbndl5ZvZ2FjjTmRYkpidhGN4TkecALs6Zs6+UKtdqtY9HCyptFZFnC4ACwKV+QcdSgw4LgAIAROTyKPCgLMlbIrICwM4zkXHg91rrbdd1v5P88C/BUcb3zMqNsLW01l9zudx5AKhWq1/CMGwBuDYmZgm9grZHOY2qOCIp3W53LUmSBySF5NMxUBhjdowxzXF+WeCDTqfzWkRIcl1ENkSEcRy/AnAwxL9kjKEx5vhdSM1vTgLe8jyvTVKMMcvGmGWS4nleG8DWiSBKcUgMAADJobah/zhJks2sQEmSbDqO8yi9Zq1tBkGQhr3TWt/3ff+uiHw+NdhxnKUgCJbQuyBHp2JF5DbJrH4ukWwDeGOtfdJPYDWrgKyj/tEfabsi+Q0Zt5Xkodb6Vz6fv+667m6j0bgKYG1S8MQSkbdRFF2oVCpdAFBKXQFwmOU/qo8nUckYswMA9Xo9VywWz7mu+8n3/Tskfy4MrJRiGIZFACsi8hiAE0XRwyRJ8ll75gK21p54MKy1uxmd1Et2YL4/j0SGieReJlgpVV4EnOSeiJT/WjvNxiAIZCDQ7ziOb/Rfsqk0TTu1AazOAp0WvK61bs0CnQb8whjzclYocPp2agJQhUJhYx7Q/6o/dirFfnpZUXcAAAAASUVORK5CYII=)  

- QuickLink button for the MF Documentation.
   If you have a case open and active, the product in the case will be checked and the appropriate docs page opened.  
   If no cases are opened the general docs page will be opened.  
   ![8](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAkUlEQVRYhe2VSw7AIAhEadP7chZObFfdGD+MKZlgfGtD8DGKyIHM5TlkZgUpqqquuiIiN1I4AsjA7Ga1KY8JuoEnouh3c4+5pgEzK2jwVgkxUDc/MrFXBnqzHo2TboDewPIIZq/E+x3nNYAsnBF5DfQygJrJa2CbDNAbgEYQsaJzGPgrcC3oBuD97SXNMjrQeQH6gjRERZAsEQAAAABJRU5ErkJggg==)

-  Creates URLs to Quixy defects in queues (if you have the R&D Change Requests column visible).  
   ![9](images/QuixyQueueLink.png)  

- Highlights Fixed defects ('Planned in new release' or 'Software update provided' statuses) in Pending Release Queue.  
   ![10](images/defectHighlight.png)  

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

![11](images/configPopup.png) 

or

![12](images/configPopup2.png)

Alternatively:  

Click on the toolbar extension menu and select Options.  

![10](images/configPage.png)   

### What can be configured?

- The Auto Refresh time can be configured (in seconds). _Default 60 seconds. Minimum is 30. Disabled < 30_

- The name of the case queue to monitor and URL for the webhook notifications.  
   Desktop and Web notifications can be enabled/disabled.  
   For the case queue name, either enter the name of the case queue that you want to monitor or append the name of the case queue you want to monitor with 'NOTIFY':  
   ![13](images/CaseQueueName.png) 

- The supported products list. This list is used to open the correct documentation page when the documentation link/icon is clicked.  

  **Requirements**  
  The list must be in JSON format.  
  The list consists of key/value pairs, separated by , and enclosed in braces { }.  
  The Key must exactly match the name of the product as it appears in cases:   
  ![14](images/acuProduct.png)  
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

![15](images/LinkGrabber.png) 

## Donate

Buy me a coffee/beer?  

- PayPal: [http://bit.ly/unixmitdonate](http://bit.ly/unixmitdonate)  
- Bitcoin (BTC): 15B532vsNhwHMEhmRvbs3HGLth3dieNkYq  
- Ethereum (ETH): 0xf0CCFCEe0E2a78D54A9b7aDE8A42aff5A327D970  
- Dogecoin (DOGE): DUJapbaS6gNoa5ZpHS85nSqkNL7cLJz8gb  