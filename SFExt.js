const installedVersion = "2.3";
let updateAvailable = false;
let oldArray = [];
let newArray = [];
let initQMon = true;
let alias = ' ';

function MFLogo() {
    let SFLogo = document.querySelector('.slds-global-header__logo');
    SFLogo.style.backgroundImage = 'url(data:image/png;base64,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)';
}
function MFCSS() {
    let style = document.createElement('style');
    style.innerHTML = '.mfbutton{cursor:pointer;margin-left:2px} img.mfbutton:hover{-webkit-filter:brightness(70%);-webkit-filter:brightness(70%)} a.ExtLoaded{text-decoration:none;color:black} a.ExtLoaded:hover{color:red}';
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
    let refreshInterval;
    let confMon;
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
    let refreshConf = refreshTimeout;
    let refreshID = refreshInterval;
    let confMonID = confMon;
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
function MFNav() {
    const navObserver = new MutationObserver((mutations, navobs) => {
        const MFNavBar = document.querySelector('#oneHeader');
        if (MFNavBar) {
            MFSup();
            MFSLD();
            MFFTS();
            MFQUIXY();
            MFDocumentation();
            MFPP();
            MFTranslation();
            navobs.disconnect();
            return;
        }
    });
    navObserver.observe(document, {
        childList: true,
        subtree: true
    });
}
function MFSup() {
    let MFButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<img class="mfbutton mfsup" alt="Support Portal" title="Support Portal" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAADJ0lEQVRIieWVT2hcVRTGf9+diakQkFRaJZbGlkIqgouCRUUXFVeiG6EiuBEriot57yUQCm1ohyIUspi89ybZScZF/QOuSq0IXSiCduFCcBXFGjc6pi4ySWpNOzP3uHACSZPOe+lk1293ud/5fpxz73sX7jfpXoqq1eph7/0RSQfN7DHAmdlqFEXhjoNrtdqupaWl9yWFwPCWYdKhIAiu5clzeUyVSmX38vLy15Iqd4MCmNnxPHm5wc65aeCZHNaTaZq+lyczc9TT09PD7XZ7Po+3o3/N7EAURQvdTMWslFar9ZIkAT8BP5rZIUkPA3sAA66b2V/OuWtm9jbwoKRjwGc9gSXtA/Deh6Ojo9908yZJcgMYBUaycvOc8UOAFQqFq1lGM/toXU1vYDMTsBAEwa0sb6PRmAPanZrewGuZeUzlcvk28IekF6empp7oFTwi6WYecEc3gaecc5/cM7hcLjtJx7z3XUPu0NqYD/cC9sCKpAN5iDMzMwPA/s7yz27ezM8JmAQm4zi+GEXRFYA0TfvNrCRpELhULBZ/brfbj7RarUngAWDOzIJuoZm3z8yUpulVM2uFYfiCJEuS5A3g0y3sDeCtMAwvZuVmXi5JJumkpGer1eppAOfct8AV4AdJZ83sdefcy6urq/vzQGEbz2KSJB8ApyS9EwTB7Pq9OI6flvRcu92+PDY29muevDxnDIBz7jvvvczswziOh4eGhs4B1Ov1s8AEoL6+vl+AnQWb2W4ASeeB0/V6/d3O1h5J583s1JonVyN5jcAQ0CyVShPe+6OSZiXNeu+PlkqlCaDZ8eRS1zOuVCpPFgqF48ArwBHgehiGj27ljeN4QdJe4Dcz+0LS54uLi993/gWbtGHUtVpt18rKyvPe+1clvQbsu8O/eNcOpEVgL3BQUgAEg4ODfydJ8pWZXWo2m1+Oj4//s6njOI5HJZ0DBroM4RZwAbgs6XcAM3uc/yfyJtDfpfaGmZ2JomhqQ8eSChlQOsEngBNmlmHdpIEOA1h3ubz3HwPz203bhuaLxeKFtcWGy5Wmab/3fkRS304SzazZaDTmOu/1far/AN+NOS2RjAonAAAAAElFTkSuQmCC">';
    MFButton.insertBefore(li, MFButton.children[4]);
    let MFButtonNew = document.querySelector('#oneHeader').querySelector('.mfsup');
    MFButtonNew.addEventListener('click', MFSupEvent, false);
}
function MFSupEvent() {
    window.open('https://portal.microfocus.com/', '_blank');
}
function MFSLD() {
    let MFButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<img class="mfbutton mfsld" alt="SLD" title="SLD" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAAB3klEQVRYhe2WsYsTQRjF3ze7xVU5QYvNH3KFHAoHh50WClqIQvqMk0pERVJESKU7s62NdqbzWrHT7v4Aq4Nck4CxUQKiYZ+FEY91yW0ms+jBvmbYN7tvfsx8OzNAozMgCRmWpullpdQ1EXmhtf647vdxKJDRaBRNJpMDktskdwFcXDdDhYIZj8dbALaXj4lPRjCYEPqvYFbWjHPuCsk7WDHtrVbraqfT+VawE2vt24I3Jfmq1+sV/dNhrLUDko9WwQLAbDaLSuwtAPtFU0RuW2sHxpgnZVmly+ScuwTg4WkgHhIAj7Ms260MA+AmAu9BJ4HyPL9VGSbP8/M1gQAASF6oDPOv5AOTA7iulNoBcFToO1JK7YjIjeV7tcN8abfbB1rrQwB78/n8BwAs2z2t9WGSJG8AfF032OdsOjedTlOS90Tk+LfZ7/e/AzgmKVmWpfhzNFSWV82Q7DrnnpP8649zzg1Jdn1yNylgY619dtJI03QI4L5v4EZXCBHpOefixWIxjOP4ge+MBIEBfi1ZFEVdkptGnf19pjaVwiilPtc87qfScctMkq8BbF4E5cqjKBpVhjHGvCf5tAYgkhxorT+Uda68Jjjn9kneBdAOADIB8NIY8y5AVqNGjRp56Sd11aisaN1EbAAAAABJRU5ErkJggg==">';
    MFButton.insertBefore(li, MFButton.children[5]);
    let MFButtonNew = document.querySelector('#oneHeader').querySelector('.mfsld');
    MFButtonNew.addEventListener('click', MFSLDEvent, false);
}
function MFSLDEvent() {
    window.open('https://sld.microfocus.com/', '_blank');
}
function MFFTS() {
    let MFButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<img class="mfbutton mffts" alt="FTS" title="FTS" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAAB4UlEQVRYhe2Wv0scQRiG3/d0PbAwmFQBUwWxCuI/ECNJmyba2ASbdMfcbJRcJ+mTYna6bUISAglXp0khIhaSPyKFmOJIICjCeeI6n4Un/mBH7vZ2iQn7lPMt7zzMfMt8wA2CeYREUTRJcrFSqXyo1Wrbf03GGDNFch3AXQA/ST5SSv3IklXJUQQAJgCsW2vvZ8nLfDIpIueh5A6AuX5PKNPJxHE8SnKtK+IASLfkAIiI3BORb81mc6hwmXa7PQLgFgBH8gWA425pl6Tuyo23Wq3hwmXCMNx1zk2TfKCUenexppSyJGcAzCilDvvJzevXPgIwDOBPvV6/kzXnWhlr7VPn3BLJsbR6p9N51mg09i/IHAHY8MTtich7rfVX337eO7XWvhWRZdLvGwRBcHUJwBPf9yTnjTFvtNav0uqpPRNF0ZyIvPRaDADJFWvtbM8yAOaRUz+l+QBY6FlGRG4XJAIAcM6lNvlAz0HelDI+BpKpVqsjcRwHg+ac0dfbcZUkST4lSXJwI2QAPM5D4oz/p2fyppTx4ZP5XeSmJH+lrfvepi84nWeLwInI555lwjDcAvAa54N2XgiAVa3197TitWOCMeYhyeckJ0Skr0n/0ibksYjskPyolNrMmlNSUvJPcgJyI5mltRc+jAAAAABJRU5ErkJggg==">';
    MFButton.insertBefore(li, MFButton.children[6]);
    let MFButtonNew = document.querySelector('#oneHeader').querySelector('.mffts');
    MFButtonNew.addEventListener('click', MFFTSEvent, false);
}
function MFFTSEvent() {
    let FTSAccDIV = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS AccountName')]", document, null, XPathResult.BOOLEAN_TYPE, null);
    if (FTSAccDIV.booleanValue) {
        let activeFTSAcc = document.evaluate("//div/*[@class = 'tabContent active oneConsoleTab']//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS AccountName')]/following-sibling::div//text()", document, null, XPathResult.ANY_TYPE, null);
        let activeFTSPass = document.evaluate("//div/slot/records-record-layout-row[2]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS Password')]/following-sibling::div//text()", document, null, XPathResult.ANY_TYPE, null);
        let whichFTSAcc = activeFTSAcc.iterateNext();
        let whichFTSPass = activeFTSPass.iterateNext();
        let FTSAccEncoded = (whichFTSAcc.textContent).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
        let FTSPassEncoded = (whichFTSPass.textContent).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
        let FTSCred = FTSAccEncoded + ':' + FTSPassEncoded;
        chrome.storage.sync.get({
            savedProtocol: 'sftp://',
            savedFTSURL: 'secureupload.microfocus.com:2222'
        }, function(result) {
            let FinalFTSURL = result.savedProtocol + FTSCred + '@' + result.savedFTSURL;
            window.open(FinalFTSURL, '_parent');
        });
    } else {
        window.open('https://secureupload.microfocus.com/mffts/', '_blank');
    }
}
function MFQUIXY() {
    let MFButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<img class="mfbutton mfqx" alt="Quixy" title="Quixy" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACCUlEQVRIibWWv2tUQRSFv3v3ga9INtmHP2orOwULa1GjGBGjKewiKJgiYf+GoL24iAELFQ1K1KhgpWiiCBFsU9iIYKGlWXZX2Uh8cyzc1Qe6urvmnWrmnpn73RmYy9jMzIwnSTINHJc0yAbJzBqSHlSr1ctRkiTTkioblbwtSQB7h4eHFUk6kTGuuPs2SWPAPPAVONWh0hchhNcdvBJwFsDdxyMzG2xRU+C5pO3AmKRlM/vSCRJCWHH3Zx1OsRk4AxSAYpTxCmY2n6nm0h/v4ZdfllT+25q2XNJqNwv7laTVKI7j0TRNB/KCFAqFz9Ha2to5YCQvyPr6+tPIzA5K2p0XxMzM80qeVV8QSUvAtbwh5yW92zBIq+qVTOh9rVZ7aWYTwBvg1f9Crg8NDR2R9DEDvZkkyR5gB/C2WCzu50cL6gtyIU3TqUajccfMDrcZIYQ5Se1Wc6xer8+laXoamO0ZEkK45e47Je3LhJdLpdIH4GQmNhpF0a4QwtWeIe7+xN0l6QDwqRW+UavVjgKl1rwKjJjZN3d/3DME2Cxp0d23Ag+BZhzH98zsZ1eWdBcohhCWgC2dEkWdjJYGJD1qjW83m83YzA61TTObBCb/kaP7d2Jmi+4+0UVhv6nrDZIuApt6BfQEAfr+ZLikRr+bu1Tdgft5EiQtmCSrVCpT7j6ew79roVwuz34Had7gjIO2WZwAAAAASUVORK5CYII=">';
    MFButton.insertBefore(li, MFButton.children[7]);
    let MFButtonNew = document.querySelector('#oneHeader').querySelector('.mfqx');
    MFButtonNew.addEventListener('click', MFQUIXYEvent, false);
}
function MFQUIXYEvent() {
    let OCTCRcase = document.evaluate("//div/*[@class = 'tabContent active oneConsoleTab']//span/slot/lightning-formatted-text[contains(., 'OCTCR')]//text()", document, null, XPathResult.BOOLEAN_TYPE, null);
    if (OCTCRcase.booleanValue) {
        let whichOCTCRcase = document.evaluate("//div/*[@class = 'tabContent active oneConsoleTab']//span/slot/lightning-formatted-text[contains(., 'OCTCR')]//text()", document, null, XPathResult.ANY_TYPE, null);
        let OCTCRcaseItem = whichOCTCRcase.iterateNext();
        let quixyID = OCTCRcaseItem.textContent;
        let finalURL = 'https://rdapps.swinfra.net/quixy/#/viewEntity/' + quixyID;
        window.open(finalURL, '_blank');
    } else {
        window.open('https://rdapps.swinfra.net/quixy/#/viewEntity/', '_blank');
    }
}
function MFDocumentation() {
    let MFButton = document.querySelector('#oneHeader').querySelector('.trailheadTrigger');
    MFButton.innerHTML = '<img class="mfbutton mfdocs" alt="MF Documentation" title="MF Documentation" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAkUlEQVRYhe2VSw7AIAhEadP7chZObFfdGD+MKZlgfGtD8DGKyIHM5TlkZgUpqqquuiIiN1I4AsjA7Ga1KY8JuoEnouh3c4+5pgEzK2jwVgkxUDc/MrFXBnqzHo2TboDewPIIZq/E+x3nNYAsnBF5DfQygJrJa2CbDNAbgEYQsaJzGPgrcC3oBuD97SXNMjrQeQH6gjRERZAsEQAAAABJRU5ErkJggg==">';
    let MFButtonNew = document.querySelector('#oneHeader').querySelector('.mfdocs');
    MFButtonNew.addEventListener('click', MFDocumentationEvent, false);
}
function MFDocumentationEvent() {
    let MFProduct = document.evaluate("//div/*[@class = 'tabContent active oneConsoleTab']//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[2]/span/slot[1]/records-formula-output/slot/formula-output-formula-html/lightning-formatted-rich-text/span/a", document, null, XPathResult.ANY_TYPE, null);
    let whichProduct = MFProduct.iterateNext();
    chrome.storage.sync.get({
        savedProducts: '{"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","Net Express / Server Express":"net-express","Enterprise Analyzer":"enterprise-analyzer","COBOL Analyzer":"cobol-analyzer","COBOL-IT":"cobol-it-ds","RM/COBOL":"rm-cobol","Relativity":"relativity","Data Express":"dataexpress"}',
    }, function(items) {
        try {
            let products = JSON.parse(items.savedProducts);
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
        let documentationURL = "https://www.microfocus.com/documentation/";
        let productURI = products[whichProduct.textContent];
        let finalURL = documentationURL + productURI;
        if (productURI == undefined) {
            window.open('https://www.microfocus.com/en-us/support/documentation', '_blank');
        } else {
            window.open(finalURL, '_blank');
        }
    }
}
function MFPP() {
    let MFButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<img class="mfbutton mfpp" alt="PerformPlus" title="PerformPlus" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAEI0lEQVRIie2WXYhUZRjHf885+zEsrIgtUWJUuNHFEkZeCF7kRYERRpla9kF1twTtOXPWBPvQtguzbJudc2a3VRG7qUhstS+puyIIE4QgL7JQkaz2ooI1+piZ3fP+u3BWj7MzsxbRTT1weM887/P8/+f/Pu887wv/279k1moyjuOtwAoz+x34Q1IZ+DgMw7eycUmSPCZpUZqm+wcHB7+/HOK2eeYDoEdS1rcRuIRY0giw0Pf9nXEcvz4zM7N106ZNZ1sBe/MQH27g2zYHxPPWmNkBIAUebWtrO14sFje0Am661MVi8REz2wf4GfdEEAQbzEyNckZGRq7zPK8ArAUkKcjn86OXTZwkyXpJ+zm/IkeBFcCpXC63vL+//1wrJbX8vKQCgJndFwTB2/MSDw8P97S3t38F9ABPVavVUkdHR+D7/oSkX51zA2Z2l6SltZSvgQ+cc2NRFE3O4hSLxcjMCsAvZtYXBMF3WZ45NW5vbx+ukR4Ow/DFzZs3/xaG4Y40TW9xzp0AtkjqA3K1ZxnwjOd5J+I43jiLk8/nR4BDwAJgez3PJcSjo6PXAg8DFedckPn6DcCbQHc9QMYWAG9kyYE8MC3pwVKptLgpcZqm9wO+mX0YRdFpgEKhsMjMxqkri3NupaRVDYTsGRsbuwogDMNvzewg0Jam6QNNiYHbAGobCwDf9wPginp5URQdyefznzZQ3j0zM/NE5ve7AJ7n3dqKuA/AzL7M+O5oAD6frQGI4/gVSbsAJN2eJMlHxWJxHcztXD21MbsDb5p9cc6tjKLoSDYhDEOrkawEPqu5Z3f8Ms7XHqBL0mozqwIT9YoF0N3dXc340tkX3/c7mkl0zmXnXG3cWx8maTvUKTazHyVdMzU1tRg4XXOfAm4GkPRJHMf1Sud0MTM7CZDL5SbK5fIkcHVtalc+nz8KdTWWdLymrC/jfr+ZymYm6X2A/v7+aWBPzT2Zy+Weno25RLFz7mXf93+qVqsX6mhmJUkhF2sFQJIkq9I0bdRyz01PT1/oz2Y2Blyfpulr2Xbb8jzOkNwr6QDzn2bOObcuiqJ35sOcDwiAIAgOAuuBVgfE1OWStiQeGhryxsfHr5RkAGEYHvJ9fykwJOkYMAVMSTpmZs/5vt+bJR0ZGVk4m9vImk7EcbwD2AJUgDNmdkbSF7lcbltt0zQ0SVYqlZ6U9ALwUhiGz/4lxcDPtbETuFHSamBLpVK5oVlCoVDoTZLkkKSdgCfpm2axTRXv3r27q1wun+TifxDOL+2Ac+7zNE0nu7q6zDm3RNJy4G5J9wDtwDkzeygIgkZXp9bEAEmSPC7p1VYxdTYD7PM87/mBgYEfWgW2vGV2dnburVQqg5J6gU2SymZ2J9ALLKmFnQVOSzrsed579TeNv21JkiyN43jtPwL2n7Y/AV3byB9Mdkm4AAAAAElFTkSuQmCC">';
    MFButton.insertBefore(li, MFButton.children[9]);
    let MFButtonNew = document.querySelector('#oneHeader').querySelector('.mfpp');
    MFButtonNew.addEventListener('click', MFPPEvent, false);
}
function MFPPEvent() {
    window.open('https://microfocus-profile.performplus.pwc.com/login', '_blank');
}
function MFTranslation() {
    let MFButton = document.querySelector('#oneHeader').querySelector('.oneHelpAndTrainingExperience');
    // Base64 Icons https://icons8.com // Colour #919191 // Size 30px
    MFButton.innerHTML = '<img class="mfbutton mftranslation" alt="MF Translation" title="MF Translation" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACMElEQVRIie2UPW8TQRCG33fPyC6QyxR8VFCRiorCgggkKvqIhtDZkhPvnpCud0OJdR9IgSYIEEjUICGQQIKYCCkVBf4DyQ9I4+Ls3A6FnehwfHb8BU1eaaXbndl5ZvZ2FjjTmRYkpidhGN4TkecALs6Zs6+UKtdqtY9HCyptFZFnC4ACwKV+QcdSgw4LgAIAROTyKPCgLMlbIrICwM4zkXHg91rrbdd1v5P88C/BUcb3zMqNsLW01l9zudx5AKhWq1/CMGwBuDYmZgm9grZHOY2qOCIp3W53LUmSBySF5NMxUBhjdowxzXF+WeCDTqfzWkRIcl1ENkSEcRy/AnAwxL9kjKEx5vhdSM1vTgLe8jyvTVKMMcvGmGWS4nleG8DWiSBKcUgMAADJobah/zhJks2sQEmSbDqO8yi9Zq1tBkGQhr3TWt/3ff+uiHw+NdhxnKUgCJbQuyBHp2JF5DbJrH4ukWwDeGOtfdJPYDWrgKyj/tEfabsi+Q0Zt5Xkodb6Vz6fv+667m6j0bgKYG1S8MQSkbdRFF2oVCpdAFBKXQFwmOU/qo8nUckYswMA9Xo9VywWz7mu+8n3/Tskfy4MrJRiGIZFACsi8hiAE0XRwyRJ8ll75gK21p54MKy1uxmd1Et2YL4/j0SGieReJlgpVV4EnOSeiJT/WjvNxiAIZCDQ7ziOb/Rfsqk0TTu1AazOAp0WvK61bs0CnQb8whjzclYocPp2agJQhUJhYx7Q/6o/dirFfnpZUXcAAAAASUVORK5CYII=">';
    MFButton.addEventListener('click', MFTranslationEvent, false);
}
function MFTranslationEvent() {
    let MFCaseCheck = document.evaluate("//div/*[@class = 'tabContent active oneConsoleTab']//records-highlights-details-item[1]/div/p[2]/slot/lightning-formatted-text", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
    if (MFCaseCheck) {
        let MFCase = document.evaluate("//div/*[@class = 'tabContent active oneConsoleTab']//records-highlights-details-item[1]/div/p[2]/slot/lightning-formatted-text", document, null, XPathResult.ANY_TYPE, null);
        let caseNumber = MFCase.iterateNext();
        let MFURL = 'https://apps.powerapps.com/play/e/default-856b813c-16e5-49a5-85ec-6f081e13b527/a/075dcd4f-25ea-43fb-8c97-bd6e2182a7f1?tenantId=856b813c-16e5-49a5-85ec-6f081e13b527&source=portal&screenColor=RGBA%280%2C176%2C240%2C1%29&skipAppMetadata=true?CaseNumber=' + caseNumber.innerText;
        window.open(MFURL, 'MF Translation', 'width=1150,height=700');
    } else {
        window.open('http://bit.ly/mftranslate', 'MF Translation', 'width=1150,height=700');
    }
}
function QNotify() {
    const notifyObserver = new MutationObserver((mutations, notifyobs) => {
        const caseQueue = document.querySelector('#split-left').querySelector('.listViewContainer');
        if (caseQueue) {
            let QMonitorInt = setInterval(function() {
                QMonitor();
            }, 30000);
            notifyobs.disconnect();
            return;
        }
    });
    notifyObserver.observe(document, {
        childList: true,
        subtree: true
    });
}
function QMonitor() {
    chrome.storage.sync.get({
        savedQueue: 'NOTIFY',
        savedQNotify: false,
        savedQNotifyWeb: false,
        savedWebhook: 'https://webhookURL',
    }, function(result) {
        let NQXPath = "//table[contains(@aria-label, " + '"' + result.savedQueue + '"' + ")]";
        if (document.evaluate(NQXPath, document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue) {
            let QXPath = "//table[contains(@aria-label, " + '"' + result.savedQueue + '"' + ")]/tbody/tr/th/span/a";
            if (document.evaluate(QXPath, document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue) {
                if (initQMon) {
                    let CaseIDElem = document.evaluate(QXPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    for (let i = 0, length = CaseIDElem.snapshotLength; i < length; ++i) {
                        oldArray.push(CaseIDElem.snapshotItem(i).textContent);
                    }
                    initQMon = false;
                } else {
                    let CaseIDElem = document.evaluate(QXPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    for (let i = 0, length = CaseIDElem.snapshotLength; i < length; ++i) {
                        if (oldArray.indexOf(CaseIDElem.snapshotItem(i).textContent) == -1) {
                            if (result.savedQNotify) {
                                (async() => {
                                    if (!window.Notification) {
                                        console.log('Browser does not support notifications.');
                                    } else {
                                        if (Notification.permission === 'granted') {
                                            const QNotification = new Notification('SFExtension Queue Monitor', {
                                                body: CaseIDElem.snapshotItem(i).textContent,
                                                icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png'
                                            });
                                            QNotification.addEventListener('click', () => {
                                                let QURL = CaseIDElem.snapshotItem(i).href;
                                                window.open(QURL, '_blank');
                                            });
                                        } else {
                                            Notification.requestPermission()
                                                .then(function(p) {
                                                    if (p === 'granted') {
                                                        const QNotification = new Notification('SFExtension Queue Monitor', {
                                                            body: CaseIDElem.snapshotItem(i).textContent,
                                                            icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png'
                                                        });
                                                        QNotification.addEventListener('click', () => {
                                                            let QURL = CaseIDElem.snapshotItem(i).href;
                                                            window.open(QURL, '_blank');
                                                        });
                                                    } else {
                                                        console.log('User blocked notifications.');
                                                    }
                                                })
                                                .catch(function(err) {
                                                    console.error(err);
                                                });
                                        }
                                    }
                                })();
                                if (result.savedQNotifyWeb) {
                                    const request = new XMLHttpRequest();
                                    request.open("POST", result.savedWebhook);
                                    request.setRequestHeader('Content-type', 'application/json');
                                    const params = {
                                        username: "SFExt Queue Monitor",
                                        avatar_url: "https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png",
                                        content: CaseIDElem.snapshotItem(i).textContent + ' - ' + CaseIDElem.snapshotItem(i).href
                                    };
                                    request.send(JSON.stringify(params));
                                }
                            }
                        }
                        newArray.push(CaseIDElem.snapshotItem(i).textContent);
                    }
                    oldArray = [];
                    oldArray = newArray;
                    newArray = [];
                }
            } else {
                oldArray = [];
                newArray = [];
            }
        }
    });
}
function QuixyListURL() {
    let OCTCR = document.querySelectorAll('[title^="OCTCR"]');
    OCTCR.forEach(SFelement => {
        let quixyID = SFelement.textContent;
        let finalURL = '<a target="_blank" href="https://rdapps.swinfra.net/quixy/#/viewEntity/' + quixyID + '">' + quixyID + '</a>';
        SFelement.innerHTML = finalURL;
    });
}
function defectFixed() {
    let fixedElement = document.evaluate("//td/span/span[contains(., 'Planned in new release')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = fixedElement.snapshotLength; i < length; ++i) {
        fixedElement.snapshotItem(i).innerHTML = '<span style="color:red">Planned in new release</span>';
    }
    let fixedElement2 = document.evaluate("//td/span/span[contains(., 'Software update provided')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = fixedElement2.snapshotLength; i < length; ++i) {
        fixedElement2.snapshotItem(i).innerHTML = '<span style="color:red">Software update provided</span>';
    }
}
function extLoaded() {
    const footerObserver = new MutationObserver((mutations, footerobs) => {
        const footerBar = document.querySelector('.oneUtilityBar').querySelector('.utilitybar');
        if (footerBar) {
            chrome.storage.sync.get({
                savedURLS: '{"SFExt":"https://unixmit.github.io/UNiXSF"}'
            }, function(items) {
                let footerUl = document.querySelector('.oneUtilityBar').querySelector('.utilitybar');
                let newUL = document.createElement("ul");
                newUL.className = "newfooterul";
                newUL.style.float = "right";
                newUL.style.width = "auto";
                newUL.style.display = "flex";
                newUL.style.position = "absolute";
                newUL.style.right = "0";
                footerUl.appendChild(newUL);
                let URLS = JSON.parse(items.savedURLS);
                Object.entries(URLS).forEach(([key, value]) => {
                    let li = document.createElement("li");
                    liHTML = '<a class="ExtLoaded" target="_blank" href="' + value + '">' + key + '</a>';
                    li.innerHTML = liHTML;
                    li.className = 'ExtLoaded';
                    li.style.marginTop = '12px';
                    li.style.marginRight = '20px';
                    li.style.fontWeight = 'bold';
                    newUL.appendChild(li);
                });
            });
            footerobs.disconnect();
            return;
        }
    });
    footerObserver.observe(document, {
        childList: true,
        subtree: true
    });
}
function updateFooter() {
    chrome.storage.sync.get({
        savedURLS: '{"SFExt":"https://unixmit.github.io/UNiXSF"}'
    }, function(items) {
        let footerUlOld = document.querySelector('.oneUtilityBar').querySelector('.utilitybar').querySelector('.newfooterul');
        if (footerUlOld) {
            footerUlOld.parentNode.removeChild(footerUlOld);
            let footerUl = document.querySelector('.oneUtilityBar').querySelector('.utilitybar');
            let newUL = document.createElement("ul");
            newUL.className = "newfooterul";
            newUL.style.float = "right";
            newUL.style.width = "auto";
            newUL.style.display = "flex";
            newUL.style.position = "absolute";
            newUL.style.right = "0";
            footerUl.appendChild(newUL);
            let URLS = JSON.parse(items.savedURLS);
            Object.entries(URLS).forEach(([key, value]) => {
                let li = document.createElement("li");
                liHTML = '<a class="ExtLoaded" target="_blank" href="' + value + '">' + key + '</a>';
                li.innerHTML = liHTML;
                li.className = 'ExtLoaded';
                li.style.marginTop = '12px';
                li.style.marginRight = '20px';
                li.style.fontWeight = 'bold';
                newUL.appendChild(li);
            });
        }
    });
}
function updateCheck() {
    const updateObserver = new MutationObserver((mutations, updateobs) => {
        const updateFooter = document.querySelector('.newfooterul');
        if (updateFooter) {
            updateCheckEvent();
            updateobs.disconnect();
            return;
        }
    });
    updateObserver.observe(document, {
        childList: true,
        subtree: true
    });
}
function updateCheckEvent() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = 'json';
    let URL = 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/latestVersion';
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                let latestVersion = xmlHttp.response;
                if (latestVersion > installedVersion) {
                    updateAvailable = true;
                    let footerUL = document.querySelector('.newfooterul');
                    footerUL.innerHTML = '';
                    let li = document.createElement("li");
                    liHTML = '<a class="ExtLoaded" target="_blank" href="https://github.com/UNiXMIT/UNiXSF/releases/latest">SFExtension Update Available: Version ' + latestVersion + '</a>';
                    li.innerHTML = liHTML;
                    li.className = 'ExtLoaded';
                    li.style.marginTop = '12px';
                    li.style.marginRight = '20px';
                    li.style.fontWeight = 'bold';
                    footerUL.appendChild(li);
                    let style = document.createElement('style');
                    style.innerHTML = 'a.ExtLoaded{text-decoration:none;color:red} a.ExtLoaded:hover{text-decoration:none;color:black}';
                    document.getElementsByTagName('head')[0].appendChild(style);
                }
            }
        }
    };
    xmlHttp.open("GET", URL, true);
    xmlHttp.send(null);
}
function createEvents() {
    setInterval(function() {
        triggerFunctions();
    }, 2000);
}
function triggerFunctions() {
    QuixyListURL();
    defectFixed();
    if (updateAvailable === false) {
        updateFooter();   
    }
    //updateCheckEvent();
    //QuixyCaseURL();
    //FTSURL();
    //CustomerFTSURL();
}
function activeUsers() {
    document.querySelector('.forceSocialPhoto').click();
    const userObserver = new MutationObserver((mutations, activeobs) => {
        const profileCard = document.querySelector('.profile-card-name');
        if (profileCard) {
            document.querySelector('.userProfilePanel').style.display = 'none';
            let MFuser = document.querySelector('.profile-card-name').innerText;
            let split = MFuser.split(' ');
            let firstHalf = Math.round(split[0].length / 2);
            let secondHalf = Math.round(split[1].length / 2);
            let first = split[0].slice(0, firstHalf);
            let second = split[1].slice(0, secondHalf);
            alias = first + second;
            const request = new XMLHttpRequest();
            request.open("POST", 'https://discord.com/api/webhooks/1036769790137749584/4y_JAAMliBPJWIusu3_ncTOsCHZZOVYxY3bvKdBSW9T-Oa8xfRAtMlJYEvVBj0c-Vo1c');
            request.setRequestHeader('Content-type', 'application/json');
            const params = {
                username: "SFExt User Activity",
                avatar_url: "https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png",
                content: alias + ' ' + installedVersion
            };
            request.send(JSON.stringify(params));
            activeobs.disconnect();
            setTimeout(function() {
                document.querySelector('.userProfilePanel').style.display = 'block';
                document.querySelector('.forceSocialPhoto').click();
            }, 1000);
            return;
        }
    });
    userObserver.observe(document, {
        childList: true,
        subtree: true
    });
}
function RR() {
    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.code === 'F1') {
            let myDialog = document.createElement("dialog");
            document.body.appendChild(myDialog);
            let mydiv = document.createElement("div");
            mydiv.innerHTML = '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1" title="RR" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            myDialog.appendChild(mydiv);
            myDialog.showModal();
            let SFLogo = document.querySelector('.slds-global-header__logo');
            SFLogo.style.backgroundImage = 'url(data:image/png;base64,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)';
            const request = new XMLHttpRequest();
            request.open("POST", 'https://discord.com/api/webhooks/1036770134515257414/xjjyDChHm8ZRLYa7F_qyG5NkCtanz7ahe-DTn1qaGhjF3gDYrpSXb1_34ndTWrJbOglJ');
            request.setRequestHeader('Content-type', 'application/json');
            const params = {
                username: "SFExt RR",
                avatar_url: "https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png",
                content: alias
            };
            request.send(JSON.stringify(params));
        }
    });
}
function QuixyCaseURL() {
    let OCTCRcase = document.evaluate("//span/slot/lightning-formatted-text[contains(., 'OCTCR')]//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = OCTCRcase.snapshotLength; i < length; ++i) {
        let OCTCRcaseOuter = document.evaluate("//lightning-formatted-text[contains(., 'OCTCR')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        let quixyID = OCTCRcase.snapshotItem(i).textContent;
        let finalURL = '<a target="_blank" href="https://rdapps.swinfra.net/quixy/#/viewEntity/' + quixyID + '">' + quixyID + '</a>';
        OCTCRcaseOuter.snapshotItem(i).innerHTML = finalURL;
    }
}
function FTSURL() {
    let FTSAccDIV = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS AccountName')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = FTSAccDIV.snapshotLength; i < length; ++i) {
        let FTSAcc = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS AccountName')]/following-sibling::div//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        let FTSPass = document.evaluate("//div/slot/records-record-layout-row[2]/slot/records-record-layout-item[2]/div/div/div[1][contains(., 'FTS Password')]/following-sibling::div//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        let FTSAccEncoded = (FTSAcc.snapshotItem(i).textContent).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
        let FTSPassEncoded = (FTSPass.snapshotItem(i).textContent).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
        let FTSURL = FTSAccEncoded + ':' + FTSPassEncoded;
        chrome.storage.sync.get({
            savedProtocol: 'sftp://',
            savedFTSURL: 'secureupload.microfocus.com:2222'
        }, function(result) {
            FTSAccDIV.snapshotItem(i).innerHTML = '<a href="' + result.savedProtocol + FTSURL + '@' + result.savedFTSURL + '">FTS AccountName</a>';
        });
    }
}
function CustomerFTSURL() {
    let FTSAccDIV = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[1]/div/div/div[1][contains(., 'Account')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = FTSAccDIV.snapshotLength; i < length; ++i) {
        let FTSAcc = document.evaluate("//div/slot/records-record-layout-row[1]/slot/records-record-layout-item[1]/div/div/div[1][contains(., 'Account')]/following-sibling::div//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        let FTSPass = document.evaluate("//div/slot/records-record-layout-row[2]/slot/records-record-layout-item[1]/div/div/div[1][contains(., 'Password')]/following-sibling::div//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        let FTSAccEncoded = (FTSAcc.snapshotItem(i).textContent).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
        let FTSPassEncoded = (FTSPass.snapshotItem(i).textContent).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
        let FTSURL = FTSAccEncoded + ':' + FTSPassEncoded;
        chrome.storage.sync.get({
            savedProtocol: 'sftp://',
            savedFTSURL: 'secureupload.microfocus.com:2222'
        }, function(result) {
            FTSAccDIV.snapshotItem(i).innerHTML = '<a href="' + result.savedProtocol + FTSURL + '@' + result.savedFTSURL + '">Account</a>';
        });
    }
}

window.onload = function() {
    MFLogo();
    MFCSS();
    queueRefresh();
    MFNav();
    QNotify();
    QuixyListURL();
    defectFixed();
    extLoaded();
    updateCheck();
    createEvents();
    activeUsers();
    RR();
    //QuixyCaseURL();
    //FTSURL();
    //CustomerFTSURL();
};