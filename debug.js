const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (scriptMatch) {
    let scriptContent = scriptMatch[1];
    
    // We want to run generateAttractions for 'Kochi, Kerala' and 'Gangtok, Sikkim'
    // Find where the app component starts so we only evaluate definitions
    const evalCode = scriptContent.substring(0, scriptContent.indexOf('const BUDGET_RATES'));
    
    try {
        const codeToRun = `
            const React = { useState: () => [], useEffect: () => {} };
            ${evalCode}
            console.log("Attractions count for Kochi:", generateAttractions('Kochi, Kerala').length);
            console.log("Attractions count for Gangtok:", generateAttractions('Gangtok, Sikkim').length);
        `;
        eval(codeToRun);
    } catch (e) {
        console.log("Eval error:", e.stack);
    }
}
