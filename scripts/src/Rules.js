async function defineActionByMode(mode){
    if (mode ==='redirect'){
        return {
            type: "redirect",
            redirect :{
               "url": await chrome.storage.sync.get('redirect-url') || 'https://www.google.com' 
                }    
            }
        }
    return {type: mode}
}

export default async function createRules(mode,urlPatterns){
   
    let rules = [];
    for(let index = 0; index <= urlPatterns.length; index++){
        rules.push({
            id: index+1,
            priority: 1,
            action: defineActionByMode(mode),
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