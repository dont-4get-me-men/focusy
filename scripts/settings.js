
import { processUrlsString } from "./src/processUrl.js" ;

function getTextAreaData(elementId){
    return document.getElementById(elementId).value; 
}

//
const saveButton = document.getElementById('settings-save-button');

saveButton.addEventListener('click', function() {
    const whiteListLinks = getTextAreaData('whitelist-input');
    const {links: rightWhiteLinks,wrongLinks: wrongWhiteLinks} = processUrlsString(whiteListLinks);
    chrome.storage.sync.set({'whitelist-urls': rightWhiteLinks}, function() {
        console.log('Whitelist is set to ' + rightWhiteLinks);
    });

    const blackListLinks = getTextAreaData('blacklist-input');
    const {links: rightBlackLinks,wrongLinks: wrongBlackLinks} = processUrlsString(blackListLinks);
    
    chrome.storage.sync.set({'blacklist-urls': rightBlackLinks}, function() {
        console.log('Blacklist is set to ' + rightBlackLinks);
    });

});

