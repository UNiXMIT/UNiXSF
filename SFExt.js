window.onload = function() {

    var installedVersion = "2.1";

    function MFLogo() {
        var SFLogo = document.querySelector('.slds-global-header__logo');
        SFLogo.style.backgroundImage = 'url(data:image/png;base64,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)';
    }

    function MFNav() {
        MFSup();
        MFSLD();
        MFTranslation();
        MFDocumentation();
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
        MFButton.innerHTML = '<img class="mfbutton mfdocs" alt="MF Documentation" title="MF Documentation" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAkUlEQVRYhe2VSw7AIAhEadP7chZObFfdGD+MKZlgfGtD8DGKyIHM5TlkZgUpqqquuiIiN1I4AsjA7Ga1KY8JuoEnouh3c4+5pgEzK2jwVgkxUDc/MrFXBnqzHo2TboDewPIIZq/E+x3nNYAsnBF5DfQygJrJa2CbDNAbgEYQsaJzGPgrcC3oBuD97SXNMjrQeQH6gjRERZAsEQAAAABJRU5ErkJggg==">';
        var MFButtonNew = document.querySelector('#oneHeader').querySelector('.mfdocs');
        MFButtonNew.addEventListener('click', MFDocumentationEvent, false);
    }

    function MFDocumentationEvent() {
        var MFProduct = document.evaluate("//div/*[@class = 'tabContent active oneConsoleTab']//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[2]/span/slot[1]/records-formula-output/slot/formula-output-formula-html/lightning-formatted-rich-text/span/a", document, null, XPathResult.ANY_TYPE, null);
        var whichProduct = MFProduct.iterateNext();
        chrome.storage.sync.get({
            savedProducts: '{"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","Net Express / Server Express":"net-express","Enterprise Analyzer":"enterprise-analyzer","COBOL Analyzer":"cobol-analyzer","COBOL-IT":"cobol-it-ds","RM/COBOL":"rm-cobol","Relativity":"relativity","Data Express":"dataexpress"}',
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
        var refreshInterval;
        var confMon;
        if (refreshTimeout >= 30000) {
            refreshInterval = setInterval(function() {
                    document.querySelector('#split-left').querySelector('button[name="refreshButton"]').click();
                },
                refreshTimeout);
        }
        confMon = setInterval(function() {
            refreshConfMonitor(refreshTimeout, refreshInterval, confMon);
        }, 3000);
    }

    function refreshConfMonitor(refreshTimeout, refreshInterval, confMon) {
        var refreshConf = refreshTimeout;
        var refreshID = refreshInterval;
        var confMonID = confMon;
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
        var OCTCRcase = document.evaluate("//span/slot/lightning-formatted-text[contains(., 'OCTCR')]//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
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
                        extLi.innerHTML = '<a class="ExtLoaded" target="_blank" href="https://unixmit.github.io/UNiXSF/changelog">SFExtension Update Available: Version ' + latestVersion + '</a>';
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

    function RR() {
        window.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.shiftKey && event.code === 'F1') {
                window.open('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1', 'RR', 'width=685,height=448');
                var SFLogo = document.querySelector('.slds-global-header__logo');
                SFLogo.style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAoCAYAAAC7HLUcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAPVwAAD1cAWIgfiEAAAyESURBVHhe7ZwFrGU7FYYHd/eHPNzdLXhwDx6CuxMIFlwD4QHBgwZ3CQ4haHB3d3d3/b97ziKdzt/V7iN3mJn9J1/Oufe25+zd3dWutdreI+2ZdbDp8uJ2i7dWLxTvXrw9ZHRm8YjFW6vXi9ct3s462IVx/CfhTuJQ08WEa4vgYcLqyMvXWbNmGc0GMmtWonUM5CjL11mHpohfjytOsHw9KOPZkZs6nrjCkvOLM4iTiKOKf4pfi++JL4gPCALAX4gRnVVccPHW6qPiu+Lo4mrieoLypxEY92/F18QHxavEN8Q64r6uLC4nzi1OK+gA3OvfBff6bfFx8Zbl679ET2cSF1m8tfqk+KZg0LmsuKa4kKCt+X7a+Vfiy+Kd4tXLn52IQZ67eGv1fJEF6e8VP1u83UunFtcWtM15xenE0USI9vm+4F7eJmifP4pStOOlRTa48kw/tXhrdRbBd2f6hPj94u1OO9J3HrXzk9eLl5T6oaBvNXVKcYT4pXCBTQsa5SXiXKKnewr3GcEtBFmZLxa/a8ED4nsPE1N1uHiOoFHdZzv+LXiQ1xC9geb2wn1GcEfBg+Tz3N9rfi5uLdz39oL0jI+JY4hSGDft+hfh6rT4seD5MriFuN6nCFc++Ju4pHA6qcAIXb2AQTUMl75AW7lyPZ4urLiJm4uphlHzV/FIUTZQrZ6BkHrjc9zfWmD5FxUj4l5vK34n3GeNwAzybHFM0VLPQF4qflP9rgffew9Ra1UDwQCYGUK0zR3ElEHD8R5xchE6lvi0cGWDb4kTi1Jcz4uEKx/8WZxHIDwM0reu3AjPEFaPFYyOrtIqvFXgozr1DGRV6Gy4SJlo8MeITd0rD6N0OUr1DGRV6NSnF6VWNZAHiRBtw7rBptoG9/tEInROgafhygavFGWMfB3BoODKBg8UIQb5da7fGghf4Aqvy5sE/metbRkI4JYdW7R0L7HJgQCeIJy2ZSBQ+9arGMhHRGncXO+m24Y+UMYeI9/BDIaYTfAMXJkA1yq8FWLUdT2gfQyE4Ak/3hWu4caYzkbLw/1FrakGgiuEDzrqEj1AOOFKZD41QfFrxNUFASExCoEzoxp/c3WA9nDB+BQD+ZMgGTDatiRGSvUMBJ+cxEdAcqCcbUmc/EG4usCzJylyE0F8QmckcH+qyGYF6lEnxOxAssGVDbgOXKYR16p0D4kfynv8iXD1Atocgyp5vPifGN2J/F3lgBt8h2Cqo9Ng1ScTlxFkRnoPlIugMUuNGgg+6Q3E8QUis0ZmgoyJKx/8SBxHlMJ9eLtw5YHGvr5oib8RSLq6gEvJd5QaMRAyVFcVJxTMfKcStE/PFWHAKEfmnoFk94bIBrp6gIuDl+G8AUSG8afC1YUviXKmIugmK+jKBj8QvZmmdA+deivpzMLEkCV7uct0Nlcx4AIfLOoHX+qKojeyP0mUGjGQrwoyak7ENu8Trl5AargUDzFr8LuJnojTXF2gEzGyluoZCO3GLOV0S+HqBMRb5SCwjoGwZykz/ueJrA+gGwpXN6CflCKtPcUTqWFgb8V+oZW3moRwHVzFgKmw1zCIxsk6H9M7WYxQz0BoONKfmeiMmbtE+rbUk4UrB0zHWdYtdEbxD+E+A+4nSvUMBBeiJdoryyThhjCjhtYxEAZBVwe439oDcKL9mLndZ8CzRK2HC1e2B8/9fKKntfZicUO1VZeiYR4i+KCeXisIllrCJbv44u2QWBTLFo0Q7heLUi2V34crwmzZ0psFRunEAEF74V4w7ePXtsTazRSR9myJToDb0hLXNTJ4jShrG54rHb8l2ob2pZ98hl80xIxRi2wicc1UPVp8bvF2O+KmGA3rnHMpprCvL952ReMwG2VqLQI50WFHhCG1xAwTswIGWrs/pW4m2BWAX09nwAjonOwMYPYDVpkhW5Ak6O1N+6V6Ow+I37Yt2ijb1cAuCmbYaBsWAmkb2qRunyuJluhv7A4oxSCMK9naHeBEv2Qhe6vCQMij89oSq6sjs0eI8pnOvnwdEfnzEX1l+erEg8cwED52K8BEDBQkINhiggEQ+5xCEEwCW1EoQ04/2y5BndLt6YnF0Ex0oG2LflCvopci3ivbhiQC90nb1m2TfQ7Pg20rtb4j7iJw0XuivUgB99ptbWEY3Fgm8s9TRPnsJstV1Z4y16KU2zsU4h5jPYSHuhti9gijHNGUAWhb4rlsylXLxHe0Zl9S69DT08RnF2+3KzpPzxVo+eQtUT4b8aa4Hqw5jCgrxwOJ0T5bONy0ypXjA0Fl8mTbql2sEG02EqOy/23KDL2yMBCCwExZfOLEFJq5MfUOz0ytLSq1ss7IbBZTMSnYTMRa7B3aBKRLDyT1BkLWK8hmbgJilVoMZE8UrXR3KbaqEH/sxoy3s9DHFN+ChaMpupRwnxM8U4R6ad4sq1KKFVpXHzCOWGBkZdyVCdxq/ybUS/PWazW12Fbv6gEDTtwfWjXNy4q1Kx+woXKbupbIdinUMNjdWIxorTQvWw0ylwgDmjL9cm4k0+eXryPC2EaUpVXJsMTZAEbBTIxMU4TrdrbF2wNeZO+yGZbs35QRm2RMa4G3Fl4KA2eW+KhF32W/VL1Zc6PiS0hlZh2Hm2QBcEQs0XNOoSWs9f2Lt0O6kcgyIgh/Nlv8KnPydAL22bR0FVFvTcl0U8EWkTcIRqkDQS0jYBDJDpyRAh7t8HT0lwsGXxZmyXy1hNFxRmRkEbIWCSbOqmQu/YiaMSwGQqd9485PbT1OZDcZYiWWU3AtMXuMrqkgTo/1/gsHGxJJM7bEVpQQ8Vb5cy3SlnddvO2KEZWtM7ThdcWHxbsEsxm/21/qpUkzb4Drb4nYst4h0NJ9xQUEgw27pjmZx2jv+gZ7+9ianok+2hKbbFnIzrROm+wINwFfPXwyBxvNWmcsGOUfKhidXN2g7uwje7HYPEiMUU/v/IxvT3Dp6gF/Y+2jFL6uKxvQDjy0TOx4Ze3F1acNGNVK7WYMQmdz5QKMgHQ3nYIkCDNwtC0HzbJnGAt6LVeLgYEYqPVMeJa0f4jUcm8bO4vFbBdyfwv4PnYUt8Qip6sXYMA8U9oEo6Y995mVehcBjMBMnbhRuCOMnBgGboYrX8L0jQtWasRAgIfGOef43tsIdhYzMrjyAXVqceO9E210BNqDfWAYP3V4ZYBgW0RvUyadpNRuGgjb8l25EjJsrFrjVnEGPGZgOj7n1V2dAHfkFYKZEuOiXZh56QvsZM6eCdtCItXOd71MuHIB18jiJIbMAO3KBCw0ttaemLl6gzf3xffxbDHkS4i9RKDEl7jK60KHc8H7qIGsAjfcigumnH1hmwcLlr1t58GHRB1s7qaBEBz3Bo4SZsyyY5HN4p5dWQfP1v2+hk5Xbjzl+EKv03IcOkQMxGe4cgFHtN3shlFOPdJsE0TsjCSIdRVWhUa4u3DapoEQHGa6j5jSkUYgCcCIV2s3DYTZjiMCrqyjNhDEDN3rvFOgnfnMEK4Vg44rGzD71wMN8YwrG/A9dxZOxNmuTotmBhUjwR1ylaZC47O/puWz9gxkykhWwlTfy35xTax7jI6APXAzWynf3TQQxH+DGTV+ZyCIeDE7GzIKM/W9RYh2zw5lAW6fS99i/MQkrk5Ae7hYGW+Ce3V1HOkSQ+Slp3xgDX7+Pn5cpZ6BYFxsWHR/c+BWcd5gyroNMQ2ZNfd5I9CJyNBkq/m7bSB0QraCj8wCLQNBrIGReXT1RiD45f+MlWJxr2e8WeaSVDM7iV29gNS+S9ffShBHuzo1Q2twpDJZ/uf8g/uQGkZjsiSsm4zsueoZCJ2XAI0jldmUzPcyJbuzBiMieUBgzU7kUdeCLd+keUcWCjEQOkWLEQNx9YADU7WBhOjgbP4j+KRsfQ+0G9m4zLh5jhwDYPvMSNxGGcoyi9VJGTo36271PZSQJOilydlhwbW7+gFn5J2YXV4g4jrq6+d39Pedg1gt16cW5VhlJsgiHUbWglGaDyP44QPJMvDfMZgeR4WBsEjUEme046wHD4rgmmsgTcl3Ey8xShEYj/43x54OE5xZOYdgW3aMRIzU7BrmgBaHuCLNOyKuPZvVCD6bi1US19BaZeYauLbsWuhwsTUd15O2I1vDc5uyZ4zz8hcWDAo8A4JfBhSyYXQ4ZmJ22cbOhVq9dkDMaBhZTwycmSHRHgwemWiP6MuI8gx8vXq7ppEZZNas/ab9ueI7a9b/vWYDmTUr0Wwgs2Ylmg1k1qxEs4HMmpVoNpBZsxKNroNsS/yPpNYWesQ/K3Pnl2fN2gXt2fNfyZI1Yj63nO8AAAAASUVORK5CYII=)';
            }
        });
    }

    MFLogo();
    navTimer = setTimeout(MFNav, 1000);
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
    RR();
};