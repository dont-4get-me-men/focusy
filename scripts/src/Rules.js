function formRedirectRule(basicUrl){
        return {
            type: "redirect"
            , redirect :{
                "url": basicUrl
            }
        }
}
function defineActionByMode(mode,redirectURL=null){
    if (mode ==='redirect'){
        return {
            type: "redirect",
            redirect :{
               "url": redirectURL
                }    
            }
        }
    return {type: mode}
}

export default async function createRules(mode){
    if (mode === 'redirect') { 
        const DEFAULT_URL = chrome.storage.sync.get("redirectURL");
    }
    let rules = [];
    for(let index = 0; index <= urlPatterns.length; index++){
        rules.push({
            id: index+1,
            priority: 1,
            action: defineActionByMode(mode,DEFAULT_URL),
            condition: { urlFilter: "||"+urlPatterns[index],resourceTypes: ["main_frame"] }
        })
    }
    return rules;

}

export async function deleteExistingRules(){
    const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: oldRules 
    });
}