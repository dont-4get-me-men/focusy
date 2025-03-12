
import createRules, {deleteExistingRules} from './src/Rules.js';
const buttons = [
    {   
        'button':'whitelist',
        'storage':'whitelist-urls',
        'mode':'allow'
    },
    {
        'button':'blacklist',
        'storage':'blacklist-urls',
        'mode':'block'
    },
    {   
        'button':'default'
    }
];


async function getRulesFromStorage(mode){
    const rules = await chrome.storage.sync.get(mode);
    return rules[mode];
}

buttons.forEach(async(obj) => {
    const button = document.getElementById(obj['button']);
    button.addEventListener('click', async function(){
        await deleteExistingRules();
        if (obj['button'] === 'default'){
            return;
        }
        let mode = obj['mode'];
        if (await chrome.storage.sync.get('enable-redirection')) {mode = 'redirect'}
        const urlPatterns = await getRulesFromStorage(obj['storage']);
        await createRules(mode, urlPatterns);
    });
});