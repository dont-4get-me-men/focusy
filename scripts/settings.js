
import { processUrlsString } from "./src/processUrl.js" ;

function getTextAreaData(elementId){
    return document.getElementById(elementId).value; 
}

//
const saveButton = document.getElementById('settings-save-button');

saveButton.addEventListener('click', function() {
    const whiteListLinks = getTextAreaData('whitelist-input');
    console.log(whiteListLinks);
    const {links: rightWhiteLinks,wrongLinks: wrongWhiteLinks} = processUrlsString(whiteListLinks);
    chrome.storage.sync.set({'whitelist': rightWhiteLinks}, function() {
        console.log('Whitelist is set to ' + rightWhiteLinks);
    });

    const blackListLinks = getTextAreaData('blacklist-input');
    const {links: rightBlackLinks,wrongLinks: wrongBlackLinks} = processUrlsString(blackListLinks);
    
    chrome.storage.sync.set({'blacklist-urls': rightBlackLinks}, function() {
        console.log('Blacklist is set to ' + rightBlackLinks);
    });

    console.log('Wrong whitelist links: ', wrongWhiteLinks);
    console.log('Wrong blacklist links: ', wrongBlackLinks);
});

