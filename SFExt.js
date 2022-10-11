window.onload = function () {
    function updateCheck() {
        var installedVersion = "2.0"
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.responseType = 'json';
        var URL = 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/latestVersion';
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var latestVersion = xmlHttp.response
                    if(latestVersion > installedVersion) {
                        alert("New SF Extension version " + latestVersion + " is now available.");
                    }
                }
            }
        };
        xmlHttp.open("GET", URL, true);
        xmlHttp.send(null);
    }
    function queueRefresh() {
        chrome.storage.sync.get({
            savedTimeout: 60,
        }, function(items) {
            refreshTimeout = items.savedTimeout * 1000;
            startRefresh(refreshTimeout);
        });
    }
    function MFTranslation() {
        var MFButton = document.querySelector('#oneHeader').querySelector('.trailheadTrigger');
        // Base64 Icons from https://icons8.com 
        // Colour #919191
        // Size 30px
        MFButton.innerHTML = '<img class="mfbutton mftranslation" alt="MF Translation" title="MF Translation" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACMElEQVRIie2UPW8TQRCG33fPyC6QyxR8VFCRiorCgggkKvqIhtDZkhPvnpCud0OJdR9IgSYIEEjUICGQQIKYCCkVBf4DyQ9I4+Ls3A6FnehwfHb8BU1eaaXbndl5ZvZ2FjjTmRYkpidhGN4TkecALs6Zs6+UKtdqtY9HCyptFZFnC4ACwKV+QcdSgw4LgAIAROTyKPCgLMlbIrICwM4zkXHg91rrbdd1v5P88C/BUcb3zMqNsLW01l9zudx5AKhWq1/CMGwBuDYmZgm9grZHOY2qOCIp3W53LUmSBySF5NMxUBhjdowxzXF+WeCDTqfzWkRIcl1ENkSEcRy/AnAwxL9kjKEx5vhdSM1vTgLe8jyvTVKMMcvGmGWS4nleG8DWiSBKcUgMAADJobah/zhJks2sQEmSbDqO8yi9Zq1tBkGQhr3TWt/3ff+uiHw+NdhxnKUgCJbQuyBHp2JF5DbJrH4ukWwDeGOtfdJPYDWrgKyj/tEfabsi+Q0Zt5Xkodb6Vz6fv+667m6j0bgKYG1S8MQSkbdRFF2oVCpdAFBKXQFwmOU/qo8nUckYswMA9Xo9VywWz7mu+8n3/Tskfy4MrJRiGIZFACsi8hiAE0XRwyRJ8ll75gK21p54MKy1uxmd1Et2YL4/j0SGieReJlgpVV4EnOSeiJT/WjvNxiAIZCDQ7ziOb/Rfsqk0TTu1AazOAp0WvK61bs0CnQb8whjzclYocPp2agJQhUJhYx7Q/6o/dirFfnpZUXcAAAAASUVORK5CYII=">';
        MFButton.addEventListener('click', MFTranslationEvent, false);
    }
    function MFTranslationEvent () {
        window.open('http://bit.ly/mftranslate', 'MF Translation', 'width=1450,height=850');
    }
    function MFDocumentation () {
        var MFButton = document.querySelector('#oneHeader').querySelector('.oneHelpAndTrainingExperience');
        MFButton.outerHTML = '<img class="mfbutton mfdocs" alt="MF Documentation" title="MF Documentation" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAkUlEQVRYhe2VSw7AIAhEadP7chZObFfdGD+MKZlgfGtD8DGKyIHM5TlkZgUpqqquuiIiN1I4AsjA7Ga1KY8JuoEnouh3c4+5pgEzK2jwVgkxUDc/MrFXBnqzHo2TboDewPIIZq/E+x3nNYAsnBF5DfQygJrJa2CbDNAbgEYQsaJzGPgrcC3oBuD97SXNMjrQeQH6gjRERZAsEQAAAABJRU5ErkJggg==">';
        var MFButtonNew = document.querySelector('#oneHeader').querySelector('.mfdocs');
        MFButtonNew.addEventListener('click', MFDocumentationEvent, false);
    }
    function MFDocumentationEvent () {
        var MFProduct = document.evaluate("//div[2]/span/slot[1]/records-formula-output/slot/formula-output-formula-html/lightning-formatted-rich-text/span/a", document, null, XPathResult.ANY_TYPE, null);
        var whichProduct = MFProduct.iterateNext();
        chrome.storage.sync.get({
            savedProducts: '{"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","Net Express / Server Express":"net-express"}',
        }, function(items) {
            try {
                var products = JSON.parse(items.savedProducts);
                MFDocumentationURL(products, whichProduct);
             } catch(err) {
                window.alert("Product list JSON format is not correct!");
                window.open('https://github.com/UNiXMIT/UNiXSF/blob/main/README.md#configuration', 'Salesforce Extension README', 'width=1450,height=850');
             }
        });
    }
    function MFDocumentationURL (products, whichProduct) {
        if(whichProduct == null) {
            window.open('https://www.microfocus.com/en-us/support/documentation', '_blank');
        } else {
            var documentationURL = "https://www.microfocus.com/documentation/";
            var productURI = products[whichProduct.textContent];
            var finalURL = documentationURL + productURI;
            if(productURI == undefined) {
                window.open('https://www.microfocus.com/en-us/support/documentation', '_blank');
            } else {
                window.open(finalURL, '_blank');
            }
        }
    }
    function MFCSS () {
        var style = document.createElement('style');
        style.innerHTML = '.mfbutton{cursor:pointer}';
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    function startRefresh(refreshTimeout) {
        setInterval(function() {
             document.querySelector('#split-left').querySelector('button[name="refreshButton"]').click();
        },
        refreshTimeout);
    }
    function QuixyListURL() {
        var OCTCR = document.querySelectorAll('[title^="OCTCR"]');
        OCTCR.forEach(SFelement => {
            var quixyID = SFelement.textContent;
            var finalURL = '<a target="_blank" href="https://rdapps.swinfra.net/quixy/#/viewEntity/' + quixyID + '">' + quixyID + '</a>';
            SFelement.innerHTML = finalURL;
        });
    }
    function QuixyCaseURL() {
        var OCTCRcase = document.evaluate("//lightning-formatted-text[contains(., 'OCTCR')]//text()", document, null, XPathResult.ANY_TYPE, null);
        var thisOCTCR = OCTCRcase.iterateNext();
        if(thisOCTCR !== null) {
            var OCTCRcaseOuter = document.evaluate("//lightning-formatted-text[contains(., 'OCTCR')]", document, null, XPathResult.ANY_TYPE, null);
            var thisOCTCRouter = OCTCRcaseOuter.iterateNext();
            var quixyID = thisOCTCR.textContent;
            var finalURL = '<a target="_blank" href="https://rdapps.swinfra.net/quixy/#/viewEntity/' + quixyID + '">' + quixyID + '</a>';
            thisOCTCRouter.innerHTML = finalURL;
        };
    }
    function FTSURL() {
        var FTSAccDIV = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS AccountName')]", document, null, XPathResult.ANY_TYPE, null);
        var thisFTSAccDIV = FTSAccDIV.iterateNext();
        if(thisFTSAccDIV !== null) {
            var FTSAcc = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS AccountName')]/following-sibling::div//text()", document, null, XPathResult.ANY_TYPE, null);
            var thisFTSAcc = FTSAcc.iterateNext();
            var FTSPass = document.evaluate("//div/slot/records-record-layout-row[2]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS Password')]/following-sibling::div//text()", document, null, XPathResult.ANY_TYPE, null);
            var thisFTSPass = FTSPass.iterateNext();
            var FTSAccEncoded = (thisFTSAcc.textContent).replace(/#/g,"%23").replace(/%/g,"%25").replace(/\+/g,"%2B").replace(/\//g,"%2F").replace(/@/g,"%40").replace(/:/g,"%3A").replace(/;/g,"%3B");
            var FTSPassEncoded = (thisFTSPass.textContent).replace(/#/g,"%23").replace(/%/g,"%25").replace(/\+/g,"%2B").replace(/\//g,"%2F").replace(/@/g,"%40").replace(/:/g,"%3A").replace(/;/g,"%3B");
            var FTSURL = FTSAccEncoded + ':' + FTSPassEncoded;
            thisFTSAccDIV.innerHTML = '<a href="sftp://' + FTSURL + '@ftp-pro.houston.softwaregrp.com:2222">FTS AccountName</a>';
        };
    }
    function CustomerFTSURL() {
        var FTSAccDIV = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[1]/div/div/div[1][contains(., 'Account')]", document, null, XPathResult.ANY_TYPE, null);
        var thisFTSAccDIV = FTSAccDIV.iterateNext();
        if(thisFTSAccDIV !== null) {
            var FTSAcc = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[1]/div/div/div[1][contains(., 'Account')]/following-sibling::div//text()", document, null, XPathResult.ANY_TYPE, null);
            var thisFTSAcc = FTSAcc.iterateNext();
            var FTSPass = document.evaluate("//div/slot/records-record-layout-row[2]/slot/records-record-layout-item[1]/div/div/div[1][contains(., 'Password')]/following-sibling::div//text()", document, null, XPathResult.ANY_TYPE, null);
            var thisFTSPass = FTSPass.iterateNext();
            var FTSAccEncoded = (thisFTSAcc.textContent).replace(/#/g,"%23").replace(/%/g,"%25").replace(/\+/g,"%2B").replace(/\//g,"%2F").replace(/@/g,"%40").replace(/:/g,"%3A").replace(/;/g,"%3B");
            var FTSPassEncoded = (thisFTSPass.textContent).replace(/#/g,"%23").replace(/%/g,"%25").replace(/\+/g,"%2B").replace(/\//g,"%2F").replace(/@/g,"%40").replace(/:/g,"%3A").replace(/;/g,"%3B");
            var FTSURL = FTSAccEncoded + ':' + FTSPassEncoded;
            thisFTSAccDIV.innerHTML = '<a href="sftp://' + FTSURL + '@ftp-pro.houston.softwaregrp.com:2222">Account</a>';
        };
    }
    function defectFixed() {
        var fixedElement = document.evaluate("//td/span/span[contains(., 'Planned in new release')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0, length = fixedElement.snapshotLength; i < length; ++i) {
            fixedElement.snapshotItem(i).innerHTML = '<span style="color:red">Planned in new release</span>';
        };
        var fixedElement2 = document.evaluate("//td/span/span[contains(., 'Software update provided')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0, length = fixedElement2.snapshotLength; i < length; ++i) {
            fixedElement2.snapshotItem(i).innerHTML = '<span style="color:red">Software update provided</span>';
        };
    }
    updateCheck();
    MFTranslation();
    MFDocumentation();
    MFCSS();
    queueRefresh();
    setInterval(function() {
        QuixyListURL();
    }, 2000);
    setInterval(function() {
        QuixyCaseURL();
    }, 2500);
    setInterval(function() {
        defectFixed();
    }, 3000);
    setInterval(function() {
        FTSURL();
    }, 3500);
    setInterval(function() {
        CustomerFTSURL();
    }, 4000);
    console.log("SFExt Loaded")
};