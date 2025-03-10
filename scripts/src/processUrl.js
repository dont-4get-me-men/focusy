export function processUrlsString(linksString){
    let links = [];
    let wrongLinks = [];
    linksString.split('\n').forEach(link => {
        try{
            const url = new URL(link);
            links.push(url.hostname);

        }
        catch{
           wrongLinks.push(link); 
        }
    }
    );
    return {'links': links, 'wrongLinks': wrongLinks};
}

export function compareUrls(oldUrls, newUrls){
    return newUrls.filter(url => !oldUrls.inclues(url));
}


