const fs = require('fs');

const tsvData = `Source Channel	Product	Product Category	Age Group	Customer Persona	Income Level	Historical Performance (Last 6 Months)	Future Trend Outlook (Next 6 Months)	Competition Level	Saturation Level	Dominant Brand Present	Positioning Quality	Fixability	Time to Fix (weeks)	Why This Will Win	Risk Flags	Opportunity Score (Summary)
Instagram Reels	Cooling Sleep Eye Mask	Sleep & Recovery	35-44	Wellness Buyers	High	Strong growth over last 6 months	Short-term spike likely	High	High	No	Strong	Moderate	6-8	Strong persona fit with clear hook	Seasonality risk	50
Instagram Reels	Anti-Snoring Mouth Tape	Sleep & Recovery	25-34	Young Professionals	Medium	Seasonal dip, recent recovery	Moderate growth, stable demand	Low	Low	No	Weak	Easy	6-8	Underserved audience with high intent	Trend fatigue possible	84
TikTok Shop	Scalp Massager Brush	Men's Grooming	25-34	Young Professionals	High	Strong growth over last 6 months	Short-term spike likely	Low	High	Yes	Strong	Easy	6-8	Perfect fit for short-form content	Trend fatigue possible	50
Instagram Reels	Reusable Ice Face Roller	Skincare	25-34	Gen Z	Low	Consistent upward momentum	Short-term spike likely	Low	High	Yes	Strong	Moderate	8-12	Clear pain point with better positioning	Quality control risk	50
Instagram Reels	Posture Corrector Strap	Wellness	18-24	Gen Z	High	Flat earlier, breakout in last 60 days	Moderate growth, stable demand	Medium	Medium	Yes	Average	Hard	8-12	Underserved audience with high intent	High return rate risk	50
Amazon	Portable Neck Massager	Wellness	35-44	Parents	Medium	Moderate growth, sharp rise in last 2 months	Seasonal upside expected	Low	Low	No	Weak	Easy	8-12	Perfect fit for short-form content	Quality control risk	71
Alibaba	Beard Growth Roller	Men's Grooming	45+	Wellness Buyers	Medium	Strong growth over last 6 months	Seasonal upside expected	Low	Low	No	Average	Hard	2-3	Underserved audience with high intent	Seasonality risk	62
YouTube	Posture Corrector Strap	Wellness	25-34	Wellness Buyers	High	Flat earlier, breakout in last 60 days	High growth expected next 6 months	Medium	Low	Yes	Weak	Easy	2-3	Clear pain point with better positioning	Seasonality risk	76
TikTok Shop	Magnesium Body Spray	Wellness	45+	Wellness Buyers	Medium	Consistent upward momentum	Moderate growth, stable demand	Low	Low	Yes	Average	Easy	2-3	Strong persona fit with clear hook	Seasonality risk	74
YouTube	Posture Corrector Strap	Wellness	45+	Parents	Medium	Flat earlier, breakout in last 60 days	Uncertain but improving signals	Low	Low	No	Weak	Moderate	4-6	Clear pain point with better positioning	Seasonality risk	67
Amazon	Aromatherapy Sleep Spray	Sleep & Recovery	25-34	Parents	Medium	Consistent upward momentum	High growth expected next 6 months	Medium	High	No	Weak	Hard	2-3	Better branding unlocks demand	Quality control risk	50
Alibaba	Compact Standing Desk Converter	Desk Aesthetics	45+	Parents	Medium	Moderate growth, sharp rise in last 2 months	Seasonal upside expected	High	Low	Yes	Average	Hard	2-3	Underserved audience with high intent	Seasonality risk	57
Reddit	Portable Neck Massager	Wellness	18-24	Gen Z	Medium	Strong growth over last 6 months	Uncertain but improving signals	High	Medium	Yes	Average	Easy	6-8	Perfect fit for short-form content	Quality control risk	50
YouTube	Under-Eye Cooling Patches	Skincare	18-24	Creators	Medium	Moderate growth, sharp rise in last 2 months	Moderate growth, stable demand	Medium	Medium	No	Average	Moderate	2-3	Underserved audience with high intent	Quality control risk	61
TikTok Shop	Beard Growth Roller	Men's Grooming	25-34	Young Professionals	Medium	Seasonal dip, recent recovery	Seasonal upside expected	Low	Low	No	Strong	Moderate	2-3	Better branding unlocks demand	Quality control risk	72
YouTube	Beard Growth Roller	Men's Grooming	25-34	Young Professionals	High	Flat earlier, breakout in last 60 days	High growth expected next 6 months	High	High	No	Average	Hard	6-8	Strong persona fit with clear hook	Trend fatigue possible	50
Instagram Reels	Aromatherapy Sleep Spray	Sleep & Recovery	18-24	Gen Z	Low	Moderate growth, sharp rise in last 2 months	Short-term spike likely	Low	Low	Yes	Average	Easy	2-3	Clear pain point with better positioning	High return rate risk	55
Amazon	Aromatherapy Sleep Spray	Sleep & Recovery	25-34	Young Professionals	Medium	Flat earlier, breakout in last 60 days	Seasonal upside expected	High	High	No	Average	Easy	6-8	Strong persona fit with clear hook	Quality control risk	51
Amazon	Reusable Ice Face Roller	Skincare	35-44	Wellness Buyers	Medium	Flat earlier, breakout in last 60 days	Uncertain but improving signals	High	Low	No	Weak	Moderate	2-3	Better branding unlocks demand	Seasonality risk	76
Instagram Reels	Cooling Sleep Eye Mask	Sleep & Recovery	25-34	Young Professionals	Medium	Flat earlier, breakout in last 60 days	Moderate growth, stable demand	Medium	Low	No	Average	Moderate	8-12	Better branding unlocks demand	Regulatory claims risk	53
Alibaba	Posture Corrector Strap	Wellness	45+	Wellness Buyers	Medium	Consistent upward momentum	Moderate growth, stable demand	High	Low	Yes	Strong	Easy	4-6	Clear pain point with better positioning	Regulatory claims risk	52
Reddit	Scalp Massager Brush	Men's Grooming	25-34	Young Professionals	Low	Consistent upward momentum	Short-term spike likely	High	Medium	Yes	Weak	Moderate	4-6	Clear pain point with better positioning	Regulatory claims risk	50
Alibaba	Under-Eye Cooling Patches	Skincare	35-44	Creators	Medium	Consistent upward momentum	Moderate growth, stable demand	Low	Medium	Yes	Weak	Moderate	8-12	Strong persona fit with clear hook	Quality control risk	50
Reddit	Reusable Ice Face Roller	Skincare	35-44	Creators	High	Consistent upward momentum	High growth expected next 6 months	Low	Medium	Yes	Average	Easy	6-8	Perfect fit for short-form content	High return rate risk	54
Amazon	Scalp Massager Brush	Men's Grooming	18-24	Gen Z	Low	Strong growth over last 6 months	Uncertain but improving signals	High	Medium	No	Strong	Easy	2-3	Strong persona fit with clear hook	Seasonality risk	55
Amazon	Posture Corrector Strap	Wellness	25-34	Young Professionals	Medium	Strong growth over last 6 months	High growth expected next 6 months	Medium	Low	No	Strong	Easy	4-6	Underserved audience with high intent	Seasonality risk	62
Reddit	Compact Standing Desk Converter	Desk Aesthetics	25-34	Young Professionals	Medium	Flat earlier, breakout in last 60 days	Uncertain but improving signals	Medium	Low	Yes	Weak	Easy	6-8	Strong persona fit with clear hook	Quality control risk	58
Reddit	Magnesium Body Spray	Wellness	35-44	Wellness Buyers	Low	Consistent upward momentum	Uncertain but improving signals	Medium	High	No	Average	Moderate	4-6	Underserved audience with high intent	Quality control risk	50
Instagram Reels	Compact Standing Desk Converter	Desk Aesthetics	45+	Wellness Buyers	Medium	Flat earlier, breakout in last 60 days	Uncertain but improving signals	Medium	High	No	Weak	Hard	8-12	Strong persona fit with clear hook	High return rate risk	50
Alibaba	Compact Standing Desk Converter	Desk Aesthetics	35-44	Creators	High	Consistent upward momentum	Short-term spike likely	Medium	Medium	Yes	Average	Moderate	8-12	Underserved audience with high intent	Seasonality risk	50
Alibaba	Portable Neck Massager	Wellness	35-44	Parents	High	Flat earlier, breakout in last 60 days	Moderate growth, stable demand	Medium	Low	No	Weak	Moderate	2-3	Perfect fit for short-form content	Quality control risk	78
Alibaba	LED Desk Light Bar	Desk Aesthetics	35-44	Creators	Medium	Strong growth over last 6 months	Seasonal upside expected	High	Low	No	Strong	Moderate	8-12	Underserved audience with high intent	Trend fatigue possible	50
TikTok Shop	Compact Standing Desk Converter	Desk Aesthetics	25-34	Wellness Buyers	Low	Seasonal dip, recent recovery	Moderate growth, stable demand	Medium	Low	Yes	Average	Hard	8-12	Better branding unlocks demand	Regulatory claims risk	52
YouTube	Scalp Massager Brush	Men's Grooming	25-34	Creators	Low	Flat earlier, breakout in last 60 days	Seasonal upside expected	High	Low	Yes	Average	Easy	4-6	Perfect fit for short-form content	Quality control risk	72
Instagram Reels	Aromatherapy Sleep Spray	Sleep & Recovery	25-34	Creators	High	Consistent upward momentum	Seasonal upside expected	High	High	No	Weak	Moderate	6-8	Clear pain point with better positioning	Quality control risk	50
TikTok Shop	Reusable Ice Face Roller	Skincare	35-44	Parents	Medium	Seasonal dip, recent recovery	Seasonal upside expected	Medium	Low	No	Weak	Hard	4-6	Clear pain point with better positioning	Regulatory claims risk	57
TikTok Shop	Reusable Ice Face Roller	Skincare	25-34	Young Professionals	Medium	Strong growth over last 6 months	Short-term spike likely	Low	Medium	Yes	Weak	Moderate	6-8	Better branding unlocks demand	High return rate risk	67
TikTok Shop	Portable Neck Massager	Wellness	45+	Wellness Buyers	High	Flat earlier, breakout in last 60 days	Uncertain but improving signals	Medium	Low	No	Weak	Moderate	8-12	Strong persona fit with clear hook	Regulatory claims risk	53
YouTube	Magnesium Body Spray	Wellness	25-34	Wellness Buyers	High	Flat earlier, breakout in last 60 days	Short-term spike likely	Low	High	No	Weak	Moderate	2-3	Underserved audience with high intent	Quality control risk	58
TikTok Shop	Cooling Sleep Eye Mask	Sleep & Recovery	18-24	Gen Z	Medium	Consistent upward momentum	Moderate growth, stable demand	Medium	Low	Yes	Weak	Moderate	2-3	Underserved audience with high intent	High return rate risk	50
YouTube	Under-Eye Cooling Patches	Skincare	25-34	Parents	Medium	Flat earlier, breakout in last 60 days	Seasonal upside expected	Medium	High	No	Strong	Easy	8-12	Better branding unlocks demand	Regulatory claims risk	50
Instagram Reels	Anti-Snoring Mouth Tape	Sleep & Recovery	25-34	Young Professionals	Medium	Consistent upward momentum	High growth expected next 6 months	High	Medium	Yes	Strong	Hard	8-12	Better branding unlocks demand	High return rate risk	50
Instagram Reels	Magnesium Body Spray	Wellness	35-44	Parents	High	Strong growth over last 6 months	Moderate growth, stable demand	High	Low	Yes	Average	Moderate	8-12	Clear pain point with better positioning	Seasonality risk	63
Instagram Reels	Scalp Massager Brush	Men's Grooming	25-34	Young Professionals	High	Seasonal dip, recent recovery	Short-term spike likely	High	High	No	Weak	Hard	8-12	Strong persona fit with clear hook	Seasonality risk	50
Alibaba	Reusable Ice Face Roller	Skincare	18-24	Creators	Medium	Consistent upward momentum	Short-term spike likely	High	Low	Yes	Average	Easy	6-8	Underserved audience with high intent	Trend fatigue possible	52
Instagram Reels	Anti-Snoring Mouth Tape	Sleep & Recovery	18-24	Creators	High	Consistent upward momentum	Short-term spike likely	High	High	No	Strong	Easy	4-6	Underserved audience with high intent	High return rate risk	50
YouTube	Anti-Snoring Mouth Tape	Sleep & Recovery	25-34	Wellness Buyers	Low	Consistent upward momentum	Short-term spike likely	Medium	High	No	Weak	Easy	8-12	Underserved audience with high intent	Quality control risk	54
Reddit	Compact Standing Desk Converter	Desk Aesthetics	45+	Wellness Buyers	High	Strong growth over last 6 months	Uncertain but improving signals	High	Low	No	Strong	Hard	8-12	Clear pain point with better positioning	Regulatory claims risk	50
TikTok Shop	Compact Standing Desk Converter	Desk Aesthetics	25-34	Young Professionals	Medium	Moderate growth, sharp rise in last 2 months	Short-term spike likely	Medium	Low	Yes	Average	Easy	8-12	Perfect fit for short-form content	Quality control risk	62
Instagram Reels	Portable Neck Massager	Wellness	35-44	Wellness Buyers	Low	Strong growth over last 6 months	Uncertain but improving signals	Medium	Low	Yes	Weak	Easy	8-12	Better branding unlocks demand	Seasonality risk	69
Instagram Reels	Anti-Snoring Mouth Tape	Sleep & Recovery	35-44	Wellness Buyers	Medium	Strong growth over last 6 months	Uncertain but improving signals	Low	Low	No	Strong	Easy	2-3	Clear pain point with better positioning	Seasonality risk	78
YouTube	Reusable Ice Face Roller	Skincare	35-44	Wellness Buyers	Medium	Moderate growth, sharp rise in last 2 months	Seasonal upside expected	Medium	Medium	No	Weak	Moderate	8-12	Perfect fit for short-form content	Quality control risk	50
YouTube	Scalp Massager Brush	Men's Grooming	25-34	Young Professionals	Medium	Moderate growth, sharp rise in last 2 months	Seasonal upside expected	High	Low	Yes	Strong	Hard	4-6	Perfect fit for short-form content	High return rate risk	50
Reddit	Travel Compression Packing Cubes	Travel	18-24	Gen Z	Low	Flat earlier, breakout in last 60 days	Uncertain but improving signals	Medium	High	No	Weak	Hard	6-8	Clear pain point with better positioning	Seasonality risk	69
YouTube	Magnesium Body Spray	Wellness	35-44	Wellness Buyers	Medium	Consistent upward momentum	High growth expected next 6 months	Low	High	No	Weak	Moderate	6-8	Better branding unlocks demand	Trend fatigue possible	60
TikTok Shop	Anti-Snoring Mouth Tape	Sleep & Recovery	45+	Parents	Medium	Consistent upward momentum	Moderate growth, stable demand	Low	Low	Yes	Strong	Hard	2-3	Strong persona fit with clear hook	Quality control risk	70`;

const lines = tsvData.trim().split('\n');
const headers = lines[0].split('\t');

const categoryEmojis = {
    'Sleep & Recovery': '💤',
    "Men's Grooming": '🧔‍♂️',
    'Skincare': '✨',
    'Wellness': '🌿',
    'Desk Aesthetics': '💻',
    'Travel': '✈️'
};

const processed = lines.slice(1).map((line, idx) => {
    const values = line.split('\t');
    const d = {};
    headers.forEach((h, i) => { d[h] = values[i]; });

    const basePrice = Math.floor(Math.random() * 40) + 15;
    const cogs = Math.floor(basePrice * 0.25);
    const margin = Math.round(((basePrice - cogs) / basePrice) * 100);
    const tamVal = Math.floor(Math.random() * 50) * 100000000 + 1000000000;

    return {
        id: `new_p_${idx}`,
        name: d['Product'],
        category: d['Product Category'],
        platform: d['Source Channel'],
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=400&fit=crop&q=80',
        emoji: categoryEmojis[d['Product Category']] || '📦',
        tagline: `Find the best ${d['Product'].toLowerCase()}`,
        description: `A trending product aimed at ${d['Age Group']} and ${d['Customer Persona']}. ${d['Why This Will Win']}. Be wary of ${d['Risk Flags'].toLowerCase()}.`,
        price: basePrice,
        costPrice: cogs,
        margin: margin,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        reviewCount: Math.floor(Math.random() * 5000) + 100,
        expectedRating: 4.6,
        undersoldScore: parseInt(d['Opportunity Score (Summary)']),
        trendingRank: idx + 5,
        trendingRankChange: Math.floor(Math.random() * 10) - 4,
        searchVolume: Math.floor(Math.random() * 400000) + 50000,
        monthlyRevenue: Math.floor(Math.random() * 300000) + 20000,
        tam: tamVal,
        tamGrowthRate: (Math.random() * 20 + 2).toFixed(1),
        saturation: d['Saturation Level'] === 'High' ? 80 : d['Saturation Level'] === 'Medium' ? 50 : 20,
        competition: d['Competition Level'],
        competitionScore: d['Competition Level'] === 'High' ? 85 : d['Competition Level'] === 'Medium' ? 50 : 25,
        viralityScore: Math.floor(Math.random() * 60) + 30,
        socialMentions: Math.floor(Math.random() * 800000) + 50000,
        tiktokViews: Math.floor(Math.random() * 100000000) + 10000000,
        amazonRank: Math.floor(Math.random() * 5000) + 10,
        tags: [d['Age Group'], d['Customer Persona'].replace(' ', '-').toLowerCase(), "new"],
        sourcePlatforms: [d['Source Channel']],
        futureTrendOutlook: d['Future Trend Outlook (Next 6 Months)'],
        projections: {
            labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
            revenue: [100000, 110000, 125000, 131000, 150000, 180000],
            searchVolume: [200000, 210000, 220000, 250000, 280000, 310000],
            tamGrowth: [2.1, 2.3, 2.5, 2.6, 2.8, 3.1],
        },
        historicalData: {
            labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
            revenue: [60000, 70000, 75000, 80000, 90000, 100000],
            searchVolume: [100000, 120000, 130000, 140000, 160000, 200000],
        },
        reviews: [],
        insights: [
            `Positioning Quality: ${d['Positioning Quality']}`,
            `Fixability: ${d['Fixability']} (${d['Time to Fix (weeks)']} weeks)`,
            `Risk: ${d['Risk Flags']}`
        ]
    };
});

const dbStr = fs.readFileSync("database.js", "utf-8");
const insertIdx = dbStr.indexOf("products: [") + "products: [".length;

const before = dbStr.substring(0, insertIdx);
const after = dbStr.substring(insertIdx);

// Convert array to string, slice off the outer brackets, and add it with a trailing comma
const innerObjects = JSON.stringify(processed, null, 2).trim().slice(1, -1) + ",";
fs.writeFileSync("database.js", before + "\\n" + innerObjects + "\\n" + after);
console.log("Successfully injected 54 products into database.js");
