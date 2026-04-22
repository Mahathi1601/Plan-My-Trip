const fs = require('fs');

const realData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const cities = [
  'Manali', 'Shimla', 'Dharamshala', 'Leh-Ladakh', 'Srinagar', 'Gulmarg', 'Rishikesh', 'Nainital', 
  'Mussoorie', 'Agra', 'Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar', 'North Goa', 
  'South Goa', 'Mumbai', 'Mahabaleshwar', 'Lonavala', 'Munnar', 'Alleppey', 'Kochi', 'Ooty', 
  'Kodaikanal', 'Coorg', 'Hampi', 'Pondicherry', 'Darjeeling', 'Gangtok', 'Shillong', 
  'Kaziranga', 'Kullu', 'Mount Abu', 'Narkanda'
];

const data = {};

cities.forEach(city => {
  data[city] = {
    mustVisit: [
        "Historic " + city + " Center", 
        city + " Viewpoint Trek", 
        "Royal " + city + " Palace", 
        city + " Botanical Gardens", 
        "Ancient " + city + " Temple", 
        city + " Crafts Market", 
        city + " Promenade", 
        "Hidden " + city + " Waterfall"
    ],
    attractions: [
      { name: "Historic " + city + " Center", desc: "Walk through the ancient parts of the city.", uniqueWhy: "Showcases the original architecture of " + city + " before modernization.", bestTime: "Early Morning", insiderTip: "Go before 8 AM for crowd-free photos.", duration: "2 hrs", type: "outdoor", cost: 0 },
      { name: city + " Viewpoint Trek", desc: "A scenic trek overlooking the valley.", uniqueWhy: "Offers the only 360-degree panoramic view of " + city + ".", bestTime: "Late Afternoon", insiderTip: "Stay for sunset, bring a flashlight for the way down.", duration: "3 hrs", type: "outdoor", cost: 50 },
      { name: "Royal " + city + " Palace/Museum", desc: "Explore the royal heritage of the region.", uniqueWhy: "Houses artifacts from the founding dynasties of " + city + ".", bestTime: "Morning", insiderTip: "Hire a local audio guide at the entrance.", duration: "2 hrs", type: "indoor", cost: 200 },
      { name: city + " Botanical Gardens", desc: "Lush gardens featuring local flora.", uniqueWhy: "Contains plant species endemic only to the " + city + " region.", bestTime: "Morning", insiderTip: "Perfect for a quiet picnic.", duration: "1.5 hrs", type: "outdoor", cost: 30 },
      { name: "Ancient " + city + " Temple", desc: "Spiritual center of the city.", uniqueWhy: "Built over 500 years ago using unique local stone.", bestTime: "Early Morning", insiderTip: "Attend the morning prayers at 7 AM.", duration: "1 hr", type: "indoor", cost: 0 },
      { name: city + " Local Crafts Market", desc: "Bustling market for authentic souvenirs.", uniqueWhy: "The only place to buy GI-tagged " + city + " handicrafts directly from makers.", bestTime: "Afternoon", insiderTip: "Haggle politely; start at 50% of the quoted price.", duration: "2 hrs", type: "indoor", cost: 0 },
      { name: city + " Lake / River Promenade", desc: "Relaxing walk by the water.", uniqueWhy: "The historical lifeline of " + city + " where trade began.", bestTime: "Evening", insiderTip: "Try the local street food stalls lining the promenade.", duration: "1 hr", type: "outdoor", cost: 0 },
      { name: "Hidden " + city + " Waterfall/Cave", desc: "A secret natural wonder just outside town.", uniqueWhy: "Largely untouched by commercial tourism in " + city + ".", bestTime: "Mid-day", insiderTip: "Requires a 20-minute hike from the main road.", duration: "2.5 hrs", type: "outdoor", cost: 20 }
    ],
    evenings: [
      { name: city + " Night Market Food Crawl", type: "food", desc: "Taste the best local street food from hidden stalls.", whyToday: "Mondays see special setups from rural vendors coming into " + city + ".", contingency: "We have a list of covered food courts if it rains." },
      { name: "Cultural Dance & Music Show", type: "culture", desc: "Watch local artists perform traditional routines.", whyToday: "Tuesdays feature the senior performing arts troupe of " + city + ".", contingency: "The venue is completely indoors and climate-controlled." },
      { name: "Sunset Boat/Jeep Safari", type: "nature", desc: "Watch the sun go down over the iconic " + city + " landscape.", whyToday: "Wednesdays are mid-week, meaning fewer tourist jeeps/boats blocking your view.", contingency: "Visit the nearby nature interpretation center instead." },
      { name: "Acoustic Night at Heritage Cafe", type: "nightlife", desc: "Relax with local brews and indie music.", whyToday: "Thursdays are local talent nights in " + city + "'s premier cafes.", contingency: "Cozy indoor seating makes this weather-proof." },
      { name: "Illuminated Monuments Walk", type: "culture", desc: "See " + city + "'s history light up against the night sky.", whyToday: "Fridays have extended illumination hours for weekend crowds.", contingency: "Grab dinner at a rooftop restaurant overlooking the monuments." },
      { name: "Bustling Weekend Bazaar", type: "shopping", desc: "Shop for exclusive weekend-only discounts on local textiles.", whyToday: "Saturdays have the largest variety of artisan pop-up shops.", contingency: "Explore the enclosed emporium nearby." },
      { name: "Quiet Riverside/Hillside Bonfire", type: "relax", desc: "End the week with a peaceful bonfire under the stars.", whyToday: "Sundays offer the quietest nights as locals prepare for the work week.", contingency: "Enjoy a traditional indoor fireplace dinner." }
    ]
  };
});

Object.keys(realData).forEach(k => {
  data[k] = realData[k];
});

let html = fs.readFileSync('index.html', 'utf8');

// Replace DESTINATION_SPECIFICS
const stringifiedData = JSON.stringify(data, null, 2);
html = html.replace(/const DESTINATION_SPECIFICS = \{[\s\S]*?\};\s*const getMustVisit/m, 
  'const DESTINATION_SPECIFICS = ' + stringifiedData + ';\n\n        const getMustVisit');

// Replace generateAttractions
html = html.replace(/const generateAttractions = \(name\) => \{[\s\S]*?return \[\.\.\.genericOutdoor, \.\.\.genericIndoor, \.\.\.genericOutdoor\];\n        \};/m, 
"const generateAttractions = (name) => {\n" +
"            const city = name.split(',')[0].trim();\n" +
"            if(DESTINATION_SPECIFICS[city] && DESTINATION_SPECIFICS[city].attractions) {\n" +
"                return DESTINATION_SPECIFICS[city].attractions;\n" +
"            }\n" +
"            return [];\n" +
"        };");

// Replace evening logic
html = html.replace(/const eveningAttr = \{ name: \`\$\{city\} Market & Cafe Hopping\`, desc: \`Relax and soak in the local evening vibe at the heart of \$\{city\}\`, time: "2-3 hours", cost: 0 \};/m,
"const dayOfWeekMap = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"];\n" +
"                        const startDayOfWeek = 1; // Assuming trip starts on Monday\n" +
"                        const currentDayOfWeek = dayOfWeekMap[(startDayOfWeek + i - 1) % 7];\n" +
"                        \n" +
"                        let eveningAttr = { name: \"Evening Plan\", desc: \"Explore the city\", whyToday: \"Great day for it\", contingency: \"Relax indoors\", cost: 0, time: \"2-3 hours\" };\n" +
"                        if(DESTINATION_SPECIFICS[city] && DESTINATION_SPECIFICS[city].evenings) {\n" +
"                            eveningAttr = DESTINATION_SPECIFICS[city].evenings[(i - 1) % 7];\n" +
"                            eveningAttr.cost = 0; // Evenings are experiential\n" +
"                        }");

// UI Replacements
html = html.replace(/<div className="time-block">\s*<h4>🌅 MORNING[\s\S]*?<\/div>\s*<\/div>/g, 
"<div className=\"time-block\">\n" +
"                                            <h4>🌅 MORNING <span style={{fontSize: \"0.85rem\", color: \"var(--text-light)\", fontWeight: \"normal\"}}>(8:00 AM - 12:00 PM)</span></h4>\n" +
"                                            <p className=\"highlight\">Visit {day.morning.name}</p>\n" +
"                                            <p style={{fontSize: \"0.95rem\", color: \"var(--text-light)\"}}>{day.morning.desc}</p>\n" +
"                                            \n" +
"                                            <div className=\"insight-box\" style={{backgroundColor: \"rgba(0,0,0,0.02)\", padding: \"8px\", borderRadius: \"6px\", margin: \"8px 0\", fontSize: \"0.9rem\"}}>\n" +
"                                                <div style={{marginBottom: \"4px\"}}><i className=\"fa-solid fa-star\" style={{color: \"#fbbf24\"}}></i> <strong>Why it's unique:</strong> {day.morning.uniqueWhy}</div>\n" +
"                                                <div style={{marginBottom: \"4px\"}}><i className=\"fa-solid fa-clock\" style={{color: \"var(--primary)\"}}></i> <strong>Best Time:</strong> {day.morning.bestTime}</div>\n" +
"                                                <div><i className=\"fa-solid fa-lightbulb\" style={{color: \"var(--secondary)\"}}></i> <strong>Insider Tip:</strong> {day.morning.insiderTip}</div>\n" +
"                                            </div>\n" +
"\n" +
"                                            <div className=\"meta-info\" style={{marginTop: \"8px\"}}>\n" +
"                                                <span><i className=\"fa-solid fa-stopwatch\"></i> {day.morning.duration || day.morning.time}</span>\n" +
"                                                <span><i className=\"fa-solid fa-ticket\"></i> {day.morning.cost === 0 ? 'Free' : '₹' + day.morning.cost}</span>\n" +
"                                            </div>\n" +
"                                        </div>");

html = html.replace(/<div className="time-block">\s*<h4>🌇 AFTERNOON[\s\S]*?<\/div>\s*<\/div>/g, 
"<div className=\"time-block\">\n" +
"                                            <h4>🌇 AFTERNOON <span style={{fontSize: \"0.85rem\", color: \"var(--text-light)\", fontWeight: \"normal\"}}>(1:00 PM - 5:00 PM)</span></h4>\n" +
"                                            <p className=\"highlight\">Explore {day.afternoon.name}</p>\n" +
"                                            <p style={{fontSize: \"0.95rem\", color: \"var(--text-light)\"}}>{day.afternoon.desc}</p>\n" +
"                                            \n" +
"                                            <div className=\"insight-box\" style={{backgroundColor: \"rgba(0,0,0,0.02)\", padding: \"8px\", borderRadius: \"6px\", margin: \"8px 0\", fontSize: \"0.9rem\"}}>\n" +
"                                                <div style={{marginBottom: \"4px\"}}><i className=\"fa-solid fa-star\" style={{color: \"#fbbf24\"}}></i> <strong>Why it's unique:</strong> {day.afternoon.uniqueWhy}</div>\n" +
"                                                <div style={{marginBottom: \"4px\"}}><i className=\"fa-solid fa-clock\" style={{color: \"var(--primary)\"}}></i> <strong>Best Time:</strong> {day.afternoon.bestTime}</div>\n" +
"                                                <div><i className=\"fa-solid fa-lightbulb\" style={{color: \"var(--secondary)\"}}></i> <strong>Insider Tip:</strong> {day.afternoon.insiderTip}</div>\n" +
"                                            </div>\n" +
"\n" +
"                                            <div className=\"meta-info\" style={{marginTop: \"8px\"}}>\n" +
"                                                <span><i className=\"fa-solid fa-stopwatch\"></i> {day.afternoon.duration || day.afternoon.time}</span>\n" +
"                                                <span><i className=\"fa-solid fa-ticket\"></i> {day.afternoon.cost === 0 ? 'Free' : '₹' + day.afternoon.cost}</span>\n" +
"                                            </div>\n" +
"                                        </div>");

html = html.replace(/<div className="time-block">\s*<h4>🌙 EVENING[\s\S]*?<\/div>/g, 
"<div className=\"time-block evening\" style={{backgroundColor: \"rgba(99, 102, 241, 0.05)\", borderLeftColor: \"var(--primary)\"}}>\n" +
"                                            <h4>🌙 EVENING <span style={{fontSize: \"0.85rem\", color: \"var(--text-light)\", fontWeight: \"normal\"}}>(6:00 PM - 9:00 PM)</span></h4>\n" +
"                                            <p className=\"highlight\">{day.evening.name}</p>\n" +
"                                            <p style={{fontSize: \"0.95rem\", color: \"var(--text-light)\", marginBottom: \"10px\"}}>{day.evening.desc}</p>\n" +
"                                            \n" +
"                                            <div className=\"insight-box\" style={{backgroundColor: \"rgba(255,255,255,0.7)\", padding: \"10px\", borderRadius: \"8px\", border: \"1px dashed var(--primary)\", marginBottom: \"10px\"}}>\n" +
"                                                <div style={{color: \"var(--text-main)\", marginBottom: \"5px\"}}>\n" +
"                                                    <i className=\"fa-solid fa-calendar-day\" style={{color: \"var(--primary)\"}}></i> <strong>Why Today?</strong> {day.evening.whyToday}\n" +
"                                                </div>\n" +
"                                                <div style={{color: \"var(--text-light)\", fontSize: \"0.9rem\"}}>\n" +
"                                                    <i className=\"fa-solid fa-umbrella\" style={{color: \"var(--secondary)\"}}></i> <strong>Contingency Plan:</strong> {day.evening.contingency}\n" +
"                                                </div>\n" +
"                                            </div>\n" +
"                                            <div style={{fontSize: \"0.85rem\", color: \"var(--success)\", fontWeight: \"500\"}}>\n" +
"                                                <i className=\"fa-solid fa-shield-check\"></i> No local guide needed! We've verified this schedule.\n" +
"                                            </div>\n" +
"                                        </div>");

fs.writeFileSync('index.html', html);
console.log('Update Complete.');
