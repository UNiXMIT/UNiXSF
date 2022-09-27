window.onload = function () {

    function queueRefresh() {
        document.querySelector('#split-left').querySelector('button[name="refreshButton"]').click();
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
        var OCTCRcaseOuter = document.evaluate("//lightning-formatted-text[contains(., 'OCTCR')]", document, null, XPathResult.ANY_TYPE, null);
        var thisOCTCR = OCTCRcase.iterateNext();
        var thisOCTCRouter = OCTCRcaseOuter.iterateNext();
        var quixyID = thisOCTCR.textContent;
        var finalURL = '<a target="_blank" href="https://rdapps.swinfra.net/quixy/#/viewEntity/' + quixyID + '">' + quixyID + '</a>';
        thisOCTCRouter.innerHTML = finalURL;
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
    setInterval(function() {
        queueRefresh();
    }, 60000);
    setInterval(function() {
        QuixyListURL();
    }, 2000);
    setInterval(function() {
        QuixyCaseURL();
    }, 3000);
    setInterval(function() {
        FTSURL();
    }, 4000);
    setInterval(function() {
        CustomerFTSURL();
    }, 5000);
};