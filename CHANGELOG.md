# 2.9.7

### Enhancements
- Add QuickLink for Entitlements.  

# 2.9.6

### Tweaks
- Improve function that removes useless menu items and creates QuickLink menu.  

# 2.9.5

### Fixes
- The Query string limit is now in Chrome. I've had to remove the Case's Description from the 3rd line referral email.   
- Fixed an issue where the case status wasn't being modified from Pending Support (New Activity) to Pending Support.  

# 2.9.4

### Tweaks
- Perform+ URL is now configurable.
- Improve QuickLink menu creation.

# 2.9.3

### Enhancements
- Add Account Team QuickLink

### Tweaks
- Minor changes to the 3rd line referral email.
- Change MF icons to OT icons.
- Add PRODUCT section to 3rd line referral email.
  
### Fixes
- Fix minor issue with 'Set Pending Customer' option.
- Issue with 'Modify Case Status after Send' feature after Salesforce made changes that broke it.
- I was accidentally removing the SF Notification bell icon.

# 2.9.2
### Enhancements
- Welcome to OpenText! New logo added.
- Add option to enable the 'Set Pending Customer' checkbox as default.
- 3rd Line Referral QuickLink.
- Added another 'Elevate to R&D' button as the native ones have a habit of disappearing. 

### Tweaks
- Add 'Pending Customer' to 'Case Status' modal.
- 'Modify Case Status after Send' is no longer Experimental.
- Remove links to GitHub Pages.
- Changed URL source for latestVersion check.
- Use local icons only.
- Rearrange functions and QuickLinks.
- FTS HTTP URL is configurable.  
- Minor changes to the README.  

# 2.9.1
### WARNING
Internal URLs (Quixy, Translation and FTS URLs) now need to be added by the user on the config page. If you don't do this after updating, the Quixy links, Translation Request and FTS buttons won't work.  

### Fixes
- Added element checking to the Modify Case Status feature to stop errors if the cases was already in edit mode.
- Convert latestVersion to string before sending to the compareVersions function.
- Fixed issue with Hyperlink in Reminder body.

### Tweaks
- Add hyperlink to case and subject copied to clipboard, with fallback of text, when clicking case/subject copy button.
- Add paragraph to README to show how to register WinSCP for SFTP URL protocol in Windows.
- Added Copy Button to Case Defect Numbers for the 'R&D Change Requests' field.
- Removed all internal MF links.

# 2.9
### Tweaks
- Add icon for case number and subject copy button.
- Adjusted COPY buttons to act on active case tab when multiple case tabs are open.
- Changed to a 2 decimal version number

# 2.8
### Enhancements
- Added character counts to 'textarea' fields.
- The height of the Knowledge body editor didn't take into account the height of the viewport so it was not all visible at the same time. Salesforce enforces this incorrect calculation. I added a QuickLink button to make the KCS editor fullscreen to allow easier creation/editing of the article body.
- Added COPY buttons next to the case number and case subject to make it easier to copy them to clipboard.

### Tweaks
- Added current version to the footer.
- Changed the way I string values together to make the source easier to read/maintain.

### Fixes
- Adjusted MutationObserver for initQMonitor to avoid possible errors.

# 2.7
### Tweaks
- Adjusted the size of the Case Comments and Posts text fields.
- Also highlight the background row of fixed defects.
- Moved Custom URLs to the QuickLinks dropdown menu.
- Font tweaks.
- Improve config import function.
- Add error handling for Import/Export

### Fixes
- Incorrect path to the notification icon.

### Experimental
- Modify Case Status after sending email.

# 2.6
### Features
- Case Queue Monitor now detects and notifies when cases in the queue change from 'Pending Support' to 'Pending Support (New Activity)'.
- The Case Comments and Posts text fields were way too short. I made them larger.

### Tweaks
- The README was a bit wordy and overly complicated. Cleaned it up and simplified it. 
- Added the version to the update menu item when an update is available. Useful if a user has the notifications turned off. 
- Now using a local CSS file rather than modifying CSS with JS. Easier to manage.
- Re-organised the core files locations.

### Fixes
- Load fonts and icons locally to fix any security errors.

# 2.5
### Features
- QuickLinks dropdown menu. Less cluttered header.
- Added 'Discussions' page to GitHub. Have conversations, ask questions and post answers without opening issues.

### Tweaks
- Now using Font Awesome Icons
- Code clean-up and performance tuning.
- New default font for SF. Now it's pretty!

# 2.4
### Features
- Reminder/FollowUp Outlook Calendar Event QuickLink
- AMC URLs QuickLink

### Fixes
- Error 'Extension context invalidated' after reloading/updating the Extension.
- Export would create a folder called 'config' in the default download location of your browser.
- Improve performance: Only trigger functions when needed instead of in an interval loop.

### Tweaks
- Translation QuickLink now passes the case severity, to populate the severity field on the translation page.
- Major code clean-up
- Made the Extension more responsive to config changes.
- Stricter error handling.

# 2.3
### Features
- Added PerformPlus QuickLink.
- New Advanced Config option to set custom links in the footer instead of or in addition to the SFExt link.
- If you have a case open and active, the case number will be used to populate the Case Number field of the translation page.
- Popup config page when extension icon clicked.
- Ability to Export/Import config settings.
- Update notifications now delivered via Desktop Notifications.
- Case Subject added to Notifications.

### Tweaks
- Removed the code that created a Quixy and FTS hyperlink in the case. You should now use the Quixy or FTS QuickLink in the top right that gets the necessary details from the active case tab.