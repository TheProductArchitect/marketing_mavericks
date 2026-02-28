const fs = require('fs');

const tsvData = `Source ChannelProductProduct CategoryAge GroupCustomer PersonaIncome LevelHistorical Performance (Last 6 Months)Future Trend Outlook (Next 6 Months)Competition LevelSaturation LevelDominant Brand PresentPositioning QualityFixabilityTime to Fix (weeks)Why This Will WinRisk FlagsOpportunity Score (Summary)
Instagram ReelsCooling Sleep Eye MaskSleep & Recovery35-44Wellness BuyersHighStrong growth over last 6 monthsShort-term spike likelyHighHighNoStrongModerate6-8Strong persona fit with clear hookSeasonality risk50
Instagram ReelsAnti-Snoring Mouth TapeSleep & Recovery25-34Young ProfessionalsMediumSeasonal dip, recent recoveryModerate growth, stable demandLowLowNoWeakEasy6-8Underserved audience with high intentTrend fatigue possible84
TikTok ShopScalp Massager BrushMen's Grooming25-34Young ProfessionalsHighStrong growth over last 6 monthsShort-term spike likelyLowHighYesStrongEasy6-8Perfect fit for short-form contentTrend fatigue possible50
Instagram ReelsReusable Ice Face RollerSkincare25-34Gen ZLowConsistent upward momentumShort-term spike likelyLowHighYesStrongModerate8-12Clear pain point with better positioningQuality control risk50
Instagram ReelsPosture Corrector StrapWellness18-24Gen ZHighFlat earlier, breakout in last 60 daysModerate growth, stable demandMediumMediumYesAverageHard8-12Underserved audience with high intentHigh return rate risk50
AmazonPortable Neck MassagerWellness35-44ParentsMediumModerate growth, sharp rise in last 2 monthsSeasonal upside expectedLowLowNoWeakEasy8-12Perfect fit for short-form contentQuality control risk71
AlibabaBeard Growth RollerMen's Grooming45+Wellness BuyersMediumStrong growth over last 6 monthsSeasonal upside expectedLowLowNoAverageHard2-3Underserved audience with high intentSeasonality risk62
YouTubePosture Corrector StrapWellness25-34Wellness BuyersHighFlat earlier, breakout in last 60 daysHigh growth expected next 6 monthsMediumLowYesWeakEasy2-3Clear pain point with better positioningSeasonality risk76
TikTok ShopMagnesium Body SprayWellness45+Wellness BuyersMediumConsistent upward momentumModerate growth, stable demandLowLowYesAverageEasy2-3Strong persona fit with clear hookSeasonality risk74
YouTubePosture Corrector StrapWellness45+ParentsMediumFlat earlier, breakout in last 60 daysUncertain but improving signalsLowLowNoWeakModerate4-6Clear pain point with better positioningSeasonality risk67
AmazonAromatherapy Sleep SpraySleep & Recovery25-34ParentsMediumConsistent upward momentumHigh growth expected next 6 monthsMediumHighNoWeakHard2-3Better branding unlocks demandQuality control risk50
AlibabaCompact Standing Desk ConverterDesk Aesthetics45+ParentsMediumModerate growth, sharp rise in last 2 monthsSeasonal upside expectedHighLowYesAverageHard2-3Underserved audience with high intentSeasonality risk57
RedditPortable Neck MassagerWellness18-24Gen ZMediumStrong growth over last 6 monthsUncertain but improving signalsHighMediumYesAverageEasy6-8Perfect fit for short-form contentQuality control risk50
YouTubeUnder-Eye Cooling PatchesSkincare18-24CreatorsMediumModerate growth, sharp rise in last 2 monthsModerate growth, stable demandMediumMediumNoAverageModerate2-3Underserved audience with high intentQuality control risk61
TikTok ShopBeard Growth RollerMen's Grooming25-34Young ProfessionalsMediumSeasonal dip, recent recoverySeasonal upside expectedLowLowNoStrongModerate2-3Better branding unlocks demandQuality control risk72
YouTubeBeard Growth RollerMen's Grooming25-34Young ProfessionalsHighFlat earlier, breakout in last 60 daysHigh growth expected next 6 monthsHighHighNoAverageHard6-8Strong persona fit with clear hookTrend fatigue possible50
Instagram ReelsAromatherapy Sleep SpraySleep & Recovery18-24Gen ZLowModerate growth, sharp rise in last 2 monthsShort-term spike likelyLowLowYesAverageEasy2-3Clear pain point with better positioningHigh return rate risk55
AmazonAromatherapy Sleep SpraySleep & Recovery25-34Young ProfessionalsMediumFlat earlier, breakout in last 60 daysSeasonal upside expectedHighHighNoAverageEasy6-8Strong persona fit with clear hookQuality control risk51
AmazonReusable Ice Face RollerSkincare35-44Wellness BuyersMediumFlat earlier, breakout in last 60 daysUncertain but improving signalsHighLowNoWeakModerate2-3Better branding unlocks demandSeasonality risk76
Instagram ReelsCooling Sleep Eye MaskSleep & Recovery25-34Young ProfessionalsMediumFlat earlier, breakout in last 60 daysModerate growth, stable demandMediumLowNoAverageModerate8-12Better branding unlocks demandRegulatory claims risk53
AlibabaPosture Corrector StrapWellness45+Wellness BuyersMediumConsistent upward momentumModerate growth, stable demandHighLowYesStrongEasy4-6Clear pain point with better positioningRegulatory claims risk52
RedditScalp Massager BrushMen's Grooming25-34Young ProfessionalsLowConsistent upward momentumShort-term spike likelyHighMediumYesWeakModerate4-6Clear pain point with better positioningRegulatory claims risk50
AlibabaUnder-Eye Cooling PatchesSkincare35-44CreatorsMediumConsistent upward momentumModerate growth, stable demandLowMediumYesWeakModerate8-12Strong persona fit with clear hookQuality control risk50
RedditReusable Ice Face RollerSkincare35-44CreatorsHighConsistent upward momentumHigh growth expected next 6 monthsLowMediumYesAverageEasy6-8Perfect fit for short-form contentHigh return rate risk54
AmazonScalp Massager BrushMen's Grooming18-24Gen ZLowStrong growth over last 6 monthsUncertain but improving signalsHighMediumNoStrongEasy2-3Strong persona fit with clear hookSeasonality risk55
AmazonPosture Corrector StrapWellness25-34Young ProfessionalsMediumStrong growth over last 6 monthsHigh growth expected next 6 monthsMediumLowNoStrongEasy4-6Underserved audience with high intentSeasonality risk62
RedditCompact Standing Desk ConverterDesk Aesthetics25-34Young ProfessionalsMediumFlat earlier, breakout in last 60 daysUncertain but improving signalsMediumLowYesWeakEasy6-8Strong persona fit with clear hookQuality control risk58
RedditMagnesium Body SprayWellness35-44Wellness BuyersLowConsistent upward momentumUncertain but improving signalsMediumHighNoAverageModerate4-6Underserved audience with high intentQuality control risk50
Instagram ReelsCompact Standing Desk ConverterDesk Aesthetics45+Wellness BuyersMediumFlat earlier, breakout in last 60 daysUncertain but improving signalsMediumHighNoWeakHard8-12Strong persona fit with clear hookHigh return rate risk50
AlibabaCompact Standing Desk ConverterDesk Aesthetics35-44CreatorsHighConsistent upward momentumShort-term spike likelyMediumMediumYesAverageModerate8-12Underserved audience with high intentSeasonality risk50
AlibabaPortable Neck MassagerWellness35-44ParentsHighFlat earlier, breakout in last 60 daysModerate growth, stable demandMediumLowNoWeakModerate2-3Perfect fit for short-form contentQuality control risk78
AlibabaLED Desk Light BarDesk Aesthetics35-44CreatorsMediumStrong growth over last 6 monthsSeasonal upside expectedHighLowNoStrongModerate8-12Underserved audience with high intentTrend fatigue possible50
TikTok ShopCompact Standing Desk ConverterDesk Aesthetics25-34Wellness BuyersLowSeasonal dip, recent recoveryModerate growth, stable demandMediumLowYesAverageHard8-12Better branding unlocks demandRegulatory claims risk52
YouTubeScalp Massager BrushMen's Grooming25-34CreatorsLowFlat earlier, breakout in last 60 daysSeasonal upside expectedHighLowYesAverageEasy4-6Perfect fit for short-form contentQuality control risk72
Instagram ReelsAromatherapy Sleep SpraySleep & Recovery25-34CreatorsHighConsistent upward momentumSeasonal upside expectedHighHighNoWeakModerate6-8Clear pain point with better positioningQuality control risk50
TikTok ShopReusable Ice Face RollerSkincare35-44ParentsMediumSeasonal dip, recent recoverySeasonal upside expectedMediumLowNoWeakHard4-6Clear pain point with better positioningRegulatory claims risk57
TikTok ShopReusable Ice Face RollerSkincare25-34Young ProfessionalsMediumStrong growth over last 6 monthsShort-term spike likelyLowMediumYesWeakModerate6-8Better branding unlocks demandHigh return rate risk67
TikTok ShopPortable Neck MassagerWellness45+Wellness BuyersHighFlat earlier, breakout in last 60 daysUncertain but improving signalsMediumLowNoWeakModerate8-12Strong persona fit with clear hookRegulatory claims risk53
YouTubeMagnesium Body SprayWellness25-34Wellness BuyersHighFlat earlier, breakout in last 60 daysShort-term spike likelyLowHighNoWeakModerate2-3Underserved audience with high intentQuality control risk58
TikTok ShopCooling Sleep Eye MaskSleep & Recovery18-24Gen ZMediumConsistent upward momentumModerate growth, stable demandMediumLowYesWeakModerate2-3Underserved audience with high intentHigh return rate risk50
YouTubeUnder-Eye Cooling PatchesSkincare25-34ParentsMediumFlat earlier, breakout in last 60 daysSeasonal upside expectedMediumHighNoStrongEasy8-12Better branding unlocks demandRegulatory claims risk50
Instagram ReelsAnti-Snoring Mouth TapeSleep & Recovery25-34Young ProfessionalsMediumConsistent upward momentumHigh growth expected next 6 monthsHighMediumYesStrongHard8-12Better branding unlocks demandHigh return rate risk50
Instagram ReelsMagnesium Body SprayWellness35-44ParentsHighStrong growth over last 6 monthsModerate growth, stable demandHighLowYesAverageModerate8-12Clear pain point with better positioningSeasonality risk63
Instagram ReelsScalp Massager BrushMen's Grooming25-34Young ProfessionalsHighSeasonal dip, recent recoveryShort-term spike likelyHighHighNoWeakHard8-12Strong persona fit with clear hookSeasonality risk50
AlibabaReusable Ice Face RollerSkincare18-24CreatorsMediumConsistent upward momentumShort-term spike likelyHighLowYesAverageEasy6-8Underserved audience with high intentTrend fatigue possible52
Instagram ReelsAnti-Snoring Mouth TapeSleep & Recovery18-24CreatorsHighConsistent upward momentumShort-term spike likelyHighHighNoStrongEasy4-6Underserved audience with high intentHigh return rate risk50
YouTubeAnti-Snoring Mouth TapeSleep & Recovery25-34Wellness BuyersLowConsistent upward momentumShort-term spike likelyMediumHighNoWeakEasy8-12Underserved audience with high intentQuality control risk54
RedditCompact Standing Desk ConverterDesk Aesthetics45+Wellness BuyersHighStrong growth over last 6 monthsUncertain but improving signalsHighLowNoStrongHard8-12Clear pain point with better positioningRegulatory claims risk50
TikTok ShopCompact Standing Desk ConverterDesk Aesthetics25-34Young ProfessionalsMediumModerate growth, sharp rise in last 2 monthsShort-term spike likelyMediumLowYesAverageEasy8-12Perfect fit for short-form contentQuality control risk62
Instagram ReelsPortable Neck MassagerWellness35-44Wellness BuyersLowStrong growth over last 6 monthsUncertain but improving signalsMediumLowYesWeakEasy8-12Better branding unlocks demandSeasonality risk69
Instagram ReelsAnti-Snoring Mouth TapeSleep & Recovery35-44Wellness BuyersMediumStrong growth over last 6 monthsUncertain but improving signalsLowLowNoStrongEasy2-3Clear pain point with better positioningSeasonality risk78
YouTubeReusable Ice Face RollerSkincare35-44Wellness BuyersMediumModerate growth, sharp rise in last 2 monthsSeasonal upside expectedMediumMediumNoWeakModerate8-12Perfect fit for short-form contentQuality control risk50
YouTubeScalp Massager BrushMen's Grooming25-34Young ProfessionalsMediumModerate growth, sharp rise in last 2 monthsSeasonal upside expectedHighLowYesStrongHard4-6Perfect fit for short-form contentHigh return rate risk50
RedditTravel Compression Packing CubesTravel18-24Gen ZLowFlat earlier, breakout in last 60 daysUncertain but improving signalsMediumHighNoWeakHard6-8Clear pain point with better positioningSeasonality risk69
YouTubeMagnesium Body SprayWellness35-44Wellness BuyersMediumConsistent upward momentumHigh growth expected next 6 monthsLowHighNoWeakModerate6-8Better branding unlocks demandTrend fatigue possible60
TikTok ShopAnti-Snoring Mouth TapeSleep & Recovery45+ParentsMediumConsistent upward momentumModerate growth, stable demandLowLowYesStrongHard2-3Strong persona fit with clear hookQuality control risk70`;

const lines = tsvData.trim().split('\n');
const headers = lines[0].split('\t');

// Emoji map based on category
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

  // Synthesize realistic-looking dummy data for graph components
  const basePrice = Math.floor(Math.random() * 40) + 15;
  const cogs = Math.floor(basePrice * 0.25);
  const margin = Math.round(((basePrice-cogs)/basePrice)*100);
  
  const tamVal = Math.floor(Math.random() * 50) * 100000000 + 1000000000; // 1B - 6B range
  
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
    rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5 - 5.0
    reviewCount: Math.floor(Math.random() * 5000) + 100,
    expectedRating: 4.6,
    undersoldScore: parseInt(d['Opportunity Score (Summary)']),
    trendingRank: idx + 5,
    trendingRankChange: Math.floor(Math.random() * 10) - 4, // -4 to +5
    searchVolume: Math.floor(Math.random() * 400000) + 50000,
    monthlyRevenue: Math.floor(Math.random() * 300000) + 20000,
    tam: tamVal,
    tamGrowthRate: (Math.random() * 20 + 2).toFixed(1),
    saturation: d['Saturation Level'] === 'High' ? 80 : d['Saturation Level'] === 'Medium' ? 50 : 20,
    competition: d['Competition Level'],
    competitionScore: d['Competition Level'] === 'High' ? 85 : d['Competition Level'] === 'Medium' ? 50 : 25,
    viralityScore: Math.floor(Math.random() * 60) + 30, // 30-90
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

fs.writeFileSync('new_products.json', JSON.stringify(processed, null, 2));
