const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const deletedBlock = `            }
            return [\`\${city} Viewpoint\`, \`Historic \${city} Center\`, \`\${city} Main Bazaar\`];
        };

        const generateAttractions = (name) => {
            const city = name.split(',')[0].trim();
            const spec = DESTINATION_SPECIFICS[city];
            if(spec) {
                if (spec.attractions) return spec.attractions;
                if (spec.mustVisit) {
                    return spec.mustVisit.map(attrName => ({
                        name: attrName,
                        desc: "Explore " + attrName,
                        uniqueWhy: "A top-rated location in " + city,
                        bestTime: spec.bestTime ? (spec.bestTime[attrName] || "Anytime") : "Anytime",
                        insiderTip: "Plan ahead and enjoy your visit.",
                        duration: "2-3 hrs",
                        type: "outdoor",
                        cost: spec.costs ? (spec.costs[attrName] || 0) : 0
                    }));
                }
            }
            return [
                { name: "Local Market", desc: "Explore local handicrafts", uniqueWhy: "Feel the local vibe", bestTime: "Evening", type: "outdoor", cost: 0, duration: "2 hrs" },
                { name: "City Viewpoint", desc: "Panoramic views", uniqueWhy: "Great for photos", bestTime: "Morning", type: "outdoor", cost: 0, duration: "1 hr" },
                { name: "Heritage Museum", desc: "Learn local history", uniqueWhy: "Cultural deep dive", bestTime: "Afternoon", type: "indoor", cost: 100, duration: "2 hrs" },
                { name: "Main Plaza Walk", desc: "Heart of the city", uniqueWhy: "People watching", bestTime: "Evening", type: "outdoor", cost: 0, duration: "2 hrs" }
            ];
        };

        const getBestSeasons = (name) => {
            if(name.includes('Himachal') || name.includes('Uttarakhand') || name.includes('Sikkim') || name.includes('Kashmir')) return ["Summer", "Winter", "Peak Season"];
            if(name.includes('Rajasthan') || name.includes('Goa') || name.includes('Maharashtra') || name.includes('Kerala')) return ["Winter", "Peak Season"];`;

// The tool left this behind:
//             const city = name.split(',')[0].trim();
//             if(DESTINATION_SPECIFICS[city] && DESTINATION_SPECIFICS[city].mustVisit) {
//                 return DESTINATION_SPECIFICS[city].mustVisit;
//             if(name.includes('Meghalaya') || name.includes('Assam')) return ["Winter", "Summer"];

// Let's replace the mangled area
const target = `            const city = name.split(',')[0].trim();
            if(DESTINATION_SPECIFICS[city] && DESTINATION_SPECIFICS[city].mustVisit) {
                return DESTINATION_SPECIFICS[city].mustVisit;
            if(name.includes('Meghalaya') || name.includes('Assam')) return ["Winter", "Summer"];`;

const fixed = `            const city = name.split(',')[0].trim();
            if(DESTINATION_SPECIFICS[city] && DESTINATION_SPECIFICS[city].mustVisit) {
                return DESTINATION_SPECIFICS[city].mustVisit;
${deletedBlock}
            if(name.includes('Meghalaya') || name.includes('Assam')) return ["Winter", "Summer"];`;

html = html.replace(target, fixed);

// Also handle \r\n issues
html = html.replace(target.replace(/\n/g, '\r\n'), fixed.replace(/\n/g, '\r\n'));

fs.writeFileSync('index.html', html);
console.log("Fixed!");
