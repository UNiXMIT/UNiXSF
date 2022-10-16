window.onload = function() {

    var installedVersion = "2.1";

    function MFLogo() {
        var SFLogo = document.querySelector('.slds-global-header__logo');
        SFLogo.style.backgroundImage = 'url(data:image/png;base64,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)';
    }

    function MFTranslation() {
        var MFButton = document.querySelector('#oneHeader').querySelector('.trailheadTrigger');
        // Base64 Icons https://icons8.com // Colour #919191 // Size 30px
        MFButton.innerHTML = '<img class="mfbutton mftranslation" alt="MF Translation" title="MF Translation" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACMElEQVRIie2UPW8TQRCG33fPyC6QyxR8VFCRiorCgggkKvqIhtDZkhPvnpCud0OJdR9IgSYIEEjUICGQQIKYCCkVBf4DyQ9I4+Ls3A6FnehwfHb8BU1eaaXbndl5ZvZ2FjjTmRYkpidhGN4TkecALs6Zs6+UKtdqtY9HCyptFZFnC4ACwKV+QcdSgw4LgAIAROTyKPCgLMlbIrICwM4zkXHg91rrbdd1v5P88C/BUcb3zMqNsLW01l9zudx5AKhWq1/CMGwBuDYmZgm9grZHOY2qOCIp3W53LUmSBySF5NMxUBhjdowxzXF+WeCDTqfzWkRIcl1ENkSEcRy/AnAwxL9kjKEx5vhdSM1vTgLe8jyvTVKMMcvGmGWS4nleG8DWiSBKcUgMAADJobah/zhJks2sQEmSbDqO8yi9Zq1tBkGQhr3TWt/3ff+uiHw+NdhxnKUgCJbQuyBHp2JF5DbJrH4ukWwDeGOtfdJPYDWrgKyj/tEfabsi+Q0Zt5Xkodb6Vz6fv+667m6j0bgKYG1S8MQSkbdRFF2oVCpdAFBKXQFwmOU/qo8nUckYswMA9Xo9VywWz7mu+8n3/Tskfy4MrJRiGIZFACsi8hiAE0XRwyRJ8ll75gK21p54MKy1uxmd1Et2YL4/j0SGieReJlgpVV4EnOSeiJT/WjvNxiAIZCDQ7ziOb/Rfsqk0TTu1AazOAp0WvK61bs0CnQb8whjzclYocPp2agJQhUJhYx7Q/6o/dirFfnpZUXcAAAAASUVORK5CYII=">';
        MFButton.addEventListener('click', MFTranslationEvent, false);
    }

    function MFTranslationEvent() {
        window.open('http://bit.ly/mftranslate', 'MF Translation', 'width=1150,height=700');
    }

    function MFDocumentation() {
        var MFButton = document.querySelector('#oneHeader').querySelector('.oneHelpAndTrainingExperience');
        MFButton.outerHTML = '<img class="mfbutton mfdocs" alt="MF Documentation" title="MF Documentation" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAkUlEQVRYhe2VSw7AIAhEadP7chZObFfdGD+MKZlgfGtD8DGKyIHM5TlkZgUpqqquuiIiN1I4AsjA7Ga1KY8JuoEnouh3c4+5pgEzK2jwVgkxUDc/MrFXBnqzHo2TboDewPIIZq/E+x3nNYAsnBF5DfQygJrJa2CbDNAbgEYQsaJzGPgrcC3oBuD97SXNMjrQeQH6gjRERZAsEQAAAABJRU5ErkJggg==">';
        var MFButtonNew = document.querySelector('#oneHeader').querySelector('.mfdocs');
        MFButtonNew.addEventListener('click', MFDocumentationEvent, false);
    }

    function MFDocumentationEvent() {
        var MFProduct = document.evaluate("//div/*[@class = 'tabContent active oneConsoleTab']//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[2]/span/slot[1]/records-formula-output/slot/formula-output-formula-html/lightning-formatted-rich-text/span/a", document, null, XPathResult.ANY_TYPE, null);
        var whichProduct = MFProduct.iterateNext();
        chrome.storage.sync.get({
            savedProducts: '{"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","Net Express / Server Express":"net-express"}',
        }, function(items) {
            try {
                var products = JSON.parse(items.savedProducts);
                MFDocumentationURL(products, whichProduct);
            } catch (err) {
                window.alert("Product list JSON format is not correct!");
                window.open('https://github.com/UNiXMIT/UNiXSF/blob/main/README.md#configuration', 'Salesforce Extension README', 'width=1450,height=850');
            }
        });
    }

    function MFDocumentationURL(products, whichProduct) {
        if (whichProduct == null) {
            window.open('https://www.microfocus.com/en-us/support/documentation', '_blank');
        } else {
            var documentationURL = "https://www.microfocus.com/documentation/";
            var productURI = products[whichProduct.textContent];
            var finalURL = documentationURL + productURI;
            if (productURI == undefined) {
                window.open('https://www.microfocus.com/en-us/support/documentation', '_blank');
            } else {
                window.open(finalURL, '_blank');
            }
        }
    }

    function MFSup() {
        var MFButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
        var li = document.createElement("li");
        li.innerHTML = '<img class="mfbutton mfsup" alt="Support Portal" title="Support Portal" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAADJ0lEQVRIieWVT2hcVRTGf9+diakQkFRaJZbGlkIqgouCRUUXFVeiG6EiuBEriot57yUQCm1ohyIUspi89ybZScZF/QOuSq0IXSiCduFCcBXFGjc6pi4ySWpNOzP3uHACSZPOe+lk1293ud/5fpxz73sX7jfpXoqq1eph7/0RSQfN7DHAmdlqFEXhjoNrtdqupaWl9yWFwPCWYdKhIAiu5clzeUyVSmX38vLy15Iqd4MCmNnxPHm5wc65aeCZHNaTaZq+lyczc9TT09PD7XZ7Po+3o3/N7EAURQvdTMWslFar9ZIkAT8BP5rZIUkPA3sAA66b2V/OuWtm9jbwoKRjwGc9gSXtA/Deh6Ojo9908yZJcgMYBUaycvOc8UOAFQqFq1lGM/toXU1vYDMTsBAEwa0sb6PRmAPanZrewGuZeUzlcvk28IekF6empp7oFTwi6WYecEc3gaecc5/cM7hcLjtJx7z3XUPu0NqYD/cC9sCKpAN5iDMzMwPA/s7yz27ezM8JmAQm4zi+GEXRFYA0TfvNrCRpELhULBZ/brfbj7RarUngAWDOzIJuoZm3z8yUpulVM2uFYfiCJEuS5A3g0y3sDeCtMAwvZuVmXi5JJumkpGer1eppAOfct8AV4AdJZ83sdefcy6urq/vzQGEbz2KSJB8ApyS9EwTB7Pq9OI6flvRcu92+PDY29muevDxnDIBz7jvvvczswziOh4eGhs4B1Ov1s8AEoL6+vl+AnQWb2W4ASeeB0/V6/d3O1h5J583s1JonVyN5jcAQ0CyVShPe+6OSZiXNeu+PlkqlCaDZ8eRS1zOuVCpPFgqF48ArwBHgehiGj27ljeN4QdJe4Dcz+0LS54uLi993/gWbtGHUtVpt18rKyvPe+1clvQbsu8O/eNcOpEVgL3BQUgAEg4ODfydJ8pWZXWo2m1+Oj4//s6njOI5HJZ0DBroM4RZwAbgs6XcAM3uc/yfyJtDfpfaGmZ2JomhqQ8eSChlQOsEngBNmlmHdpIEOA1h3ubz3HwPz203bhuaLxeKFtcWGy5Wmab/3fkRS304SzazZaDTmOu/1far/AN+NOS2RjAonAAAAAElFTkSuQmCC">';
        MFButton.insertBefore(li, MFButton.children[4]);
        var MFButtonNew = document.querySelector('#oneHeader').querySelector('.mfsup');
        MFButtonNew.addEventListener('click', MFSupEvent, false);
    }

    function MFSupEvent() {
        window.open('https://portal.microfocus.com/', '_blank');
    }

    function MFSLD() {
        var MFButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
        var li = document.createElement("li");
        li.innerHTML = '<img class="mfbutton mfsld" alt="SLD" title="SLD" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAB0UlEQVRIie2Wv2sUQRiG33fuwGPBwsMqhYYUYmMpXJ0inqYQhCBBLPwBp96xi1oJBqwsZWc5sBFShYBgayCFXP6GdBYWKcTCRjSiq7OvzUWu2N2b3XCp7oGF2W/me5/ZZVkGmDNnRtBnURzHN40xDySdKw0jDyS9jqLo7bTMRtmkJLbb7RckhwAWAZyZci0CWOt2u+1Op7M7Go1UuMmiiSRJTmVZtklyHcBXkrfCMNwt22iSJCuStgCclbRtjLkThuFvb/FY+p7kMoBPjUbj6mAw+FgmPWI4HF5wzu0AWJL0wRhzLU/ezGuWtDGWAsC+c+6ptdbHC+ccAOwDWCK5nGXZcwAbXmIAKxPj617GAkheyRObgvWnjyPzySoSz5zaYpKPJN0/cbFzblvSuxMXH5eqYgH4nlP/CeDvzMQk+81mcwHA3kR5r9VqLZAczEws6VK/3/+RpulqEASHQRAcpmm62uv1vkm6XCWr6AdSxENr7a8oip5M1P5Ya18CuFclqM7H9dha++roZix9VjWk6hP/l8dxfH48vlEnIFdM8ouki2WNJL2Ekj7n1XNfdZZlmz6hnuRmFR4ErLW3Sd6ddtwpguQBgDdhGG7V6Z8zpzb/ADr3n0wDpUT7AAAAAElFTkSuQmCC">';
        MFButton.insertBefore(li, MFButton.children[5]);
        var MFButtonNew = document.querySelector('#oneHeader').querySelector('.mfsld');
        MFButtonNew.addEventListener('click', MFSLDEvent, false);
    }

    function MFSLDEvent() {
        window.open('https://sld.microfocus.com/', '_blank');
    }

    function MFCSS() {
        var style = document.createElement('style');
        style.innerHTML = '.mfbutton{cursor:pointer} img.mfbutton:hover{-webkit-filter:brightness(70%);-webkit-filter:brightness(70%)} a.ExtLoaded{text-decoration:none;color:black} a.ExtLoaded:hover{color:red}';
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function queueRefresh() {
        chrome.storage.sync.get({
            savedTimeout: 60,
        }, function(items) {
            refreshTimeout = items.savedTimeout * 1000;
            startRefresh(refreshTimeout);
        });
    }

    function startRefresh(refreshTimeout) {
        var refreshInterval
        var confMon
        if (refreshTimeout >= 30000) {
            refreshInterval = setInterval(function() {
                document.querySelector('#split-left').querySelector('button[name="refreshButton"]').click();
            },
            refreshTimeout);
        }
        confMon = setInterval(function() { refreshConfMonitor(refreshTimeout, refreshInterval, confMon); }, 3000);
    }

    function refreshConfMonitor(refreshTimeout, refreshInterval, confMon) {
        var refreshConf = refreshTimeout
        var refreshID = refreshInterval
        var confMonID = confMon
        chrome.storage.sync.get({
            savedTimeout: 60,
        }, function(items) {
            refreshTimeout = items.savedTimeout * 1000;
            if (refreshTimeout != refreshConf) {
                clearInterval(refreshID);
                clearInterval(confMonID);
                startRefresh(refreshTimeout);
            }
        });
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
        var OCTCRcase = document.evaluate("//lightning-formatted-text[contains(., 'OCTCR')]//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0, length = OCTCRcase.snapshotLength; i < length; ++i) {
            var OCTCRcaseOuter = document.evaluate("//lightning-formatted-text[contains(., 'OCTCR')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var quixyID = OCTCRcase.snapshotItem(i).textContent;
            var finalURL = '<a target="_blank" href="https://rdapps.swinfra.net/quixy/#/viewEntity/' + quixyID + '">' + quixyID + '</a>';
            OCTCRcaseOuter.snapshotItem(i).innerHTML = finalURL;
        }
    }

    function FTSURL() {
        var FTSAccDIV = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS AccountName')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0, length = FTSAccDIV.snapshotLength; i < length; ++i) {
            var FTSAcc = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS AccountName')]/following-sibling::div//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var FTSPass = document.evaluate("//div/slot/records-record-layout-row[2]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS Password')]/following-sibling::div//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var FTSAccEncoded = (FTSAcc.snapshotItem(i).textContent).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
            var FTSPassEncoded = (FTSPass.snapshotItem(i).textContent).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
            var FTSURL = FTSAccEncoded + ':' + FTSPassEncoded;
            FTSAccDIV.snapshotItem(i).innerHTML = '<a href="sftp://' + FTSURL + '@ftp-pro.houston.softwaregrp.com:2222">FTS AccountName</a>';
        }
    }

    function CustomerFTSURL() {
        var FTSAccDIV = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[1]/div/div/div[1][contains(., 'Account')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0, length = FTSAccDIV.snapshotLength; i < length; ++i) {
            var FTSAcc = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[1]/div/div/div[1][contains(., 'Account')]/following-sibling::div//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var FTSPass = document.evaluate("//div/slot/records-record-layout-row[2]/slot/records-record-layout-item[1]/div/div/div[1][contains(., 'Password')]/following-sibling::div//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var FTSAccEncoded = (FTSAcc.snapshotItem(i).textContent).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
            var FTSPassEncoded = (FTSPass.snapshotItem(i).textContent).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
            var FTSURL = FTSAccEncoded + ':' + FTSPassEncoded;
            FTSAccDIV.snapshotItem(i).innerHTML = '<a href="sftp://' + FTSURL + '@ftp-pro.houston.softwaregrp.com:2222">Account</a>';
        }
    }

    function defectFixed() {
        var fixedElement = document.evaluate("//td/span/span[contains(., 'Planned in new release')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0, length = fixedElement.snapshotLength; i < length; ++i) {
            fixedElement.snapshotItem(i).innerHTML = '<span style="color:red">Planned in new release</span>';
        }
        var fixedElement2 = document.evaluate("//td/span/span[contains(., 'Software update provided')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0, length = fixedElement2.snapshotLength; i < length; ++i) {
            fixedElement2.snapshotItem(i).innerHTML = '<span style="color:red">Software update provided</span>';
        }
    }

    function createEvents() {
        setInterval(function() {
            triggerFunctions();
        }, 2000);
    }

    function triggerFunctions() {
        QuixyListURL();
        QuixyCaseURL();
        defectFixed();
        FTSURL();
        CustomerFTSURL();
    }

    function extLoaded() {
        var footerUl = document.querySelector('.oneUtilityBar').querySelector('.utilitybar');
        var li = document.createElement("li");
        li.innerHTML = '<a class="ExtLoaded" target="_blank" href="https://unixmit.github.io/UNiXSF">SFExt</a>';
        li.className = 'ExtLoaded';
        li.style.marginTop = '10px';
        li.style.marginRight = '20px';
        li.style.right = '0';
        li.style.position = 'absolute';
        li.style.fontWeight = 'bold';
        footerUl.appendChild(li);
    }

    function updateCheck() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.responseType = 'json';
        var URL = 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/latestVersion';
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var latestVersion = xmlHttp.response;
                    if (latestVersion > installedVersion) {
                        var extLi = document.querySelector('.ExtLoaded');
                        extLi.innerHTML = '<a class="ExtLoaded" target="_blank" href="https://unixmit.github.io/UNiXSF/changelog">SFExtension Update Available!</a>';
                        var style = document.createElement('style');
                        style.innerHTML = 'a.ExtLoaded{text-decoration:none;color:red} a.ExtLoaded:hover{text-decoration:none;color:black}';
                        document.getElementsByTagName('head')[0].appendChild(style);
                    }
                }
            }
        };
        xmlHttp.open("GET", URL, true);
        xmlHttp.send(null);
    }

    MFInterval = 1;
    MFLogo();
    MFTranslation();
    MFDocumentation();
    MFSup();
    MFSLD();
    MFCSS();
    queueRefresh();
    QuixyListURL();
    QuixyCaseURL();
    defectFixed();
    FTSURL();
    CustomerFTSURL();
    createEvents();
    extLoaded();
    updateCheck();
};