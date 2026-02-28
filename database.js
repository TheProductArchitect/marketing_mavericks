// ============================================================
// Marketing Mavericks – In-Browser Database (localStorage)
// ============================================================

const DB = {
  products: [
    {
      id: "p001",
      name: "Posture Corrector Pro",
      category: "Health & Wellness",
      platform: "Amazon",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&q=80",
      emoji: "🦴",
      tagline: "Ergonomic back support for remote workers",
      description:
        "A clinically-designed posture corrector that uses adjustable straps and breathable mesh to realign the spine. Trending heavily among remote workers and gamers. Low competition, high search volume.",
      price: 29.99,
      costPrice: 6.5,
      margin: 78,
      rating: 4.2,
      reviewCount: 1847,
      expectedRating: 4.7,
      undersoldScore: 88, // 0-100, higher = more undersold
      trendingRank: 3,
      trendingRankChange: +5,
      searchVolume: 246000,
      monthlyRevenue: 184000,
      tam: 4200000000, // $4.2B
      tamGrowthRate: 12.4,
      saturation: 22, // % market saturation
      competition: "Low",
      competitionScore: 28,
      viralityScore: 74,
      socialMentions: 128400,
      tiktokViews: 48200000,
      amazonRank: 312,
      tags: ["trending", "low-competition", "high-margin"],
      sourcePlatforms: ["Amazon", "TikTok", "Google Trends"],
      projections: {
        labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        revenue: [184000, 201000, 228000, 267000, 310000, 358000],
        searchVolume: [246000, 271000, 305000, 352000, 401000, 455000],
        tamGrowth: [4.2, 4.4, 4.7, 5.0, 5.4, 5.8],
      },
      historicalData: {
        labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
        revenue: [92000, 108000, 131000, 155000, 168000, 184000],
        searchVolume: [142000, 163000, 188000, 210000, 228000, 246000],
      },
      reviews: [
        {
          author: "Sarah M.",
          rating: 5,
          text: "Completely changed my posture after 2 weeks. Worth every penny!",
          date: "Feb 2026",
          platform: "Amazon",
        },
        {
          author: "James K.",
          rating: 4,
          text: "Good quality but sizing runs small. Order one size up.",
          date: "Jan 2026",
          platform: "Amazon",
        },
        {
          author: "TikTok User @wellness_daily",
          rating: 5,
          text: "Went viral on my page – 2.1M views. Everyone wants this!",
          date: "Feb 2026",
          platform: "TikTok",
        },
      ],
      insights: [
        "4.2★ rating vs 4.7★ expected – significant quality gap opportunity",
        "TikTok views up 340% in 60 days – viral momentum building",
        "Only 22% market saturation – early mover advantage available",
        "Remote work trend driving sustained demand growth",
      ],
    },
    {
      id: "p002",
      name: "LED Sunset Lamp",
      category: "Home Décor",
      platform: "TikTok",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80",
      emoji: "🌅",
      tagline: "Aesthetic ambient lighting for content creators",
      description:
        "A projection lamp that creates a stunning sunset gradient effect. Exploding on TikTok and Instagram as a must-have aesthetic room accessory. Extremely low cost, very high perceived value.",
      price: 34.99,
      costPrice: 4.8,
      margin: 86,
      rating: 4.0,
      reviewCount: 3241,
      expectedRating: 4.6,
      undersoldScore: 94,
      trendingRank: 1,
      trendingRankChange: +12,
      searchVolume: 412000,
      monthlyRevenue: 267000,
      tam: 1800000000,
      tamGrowthRate: 28.7,
      saturation: 31,
      competition: "Medium",
      competitionScore: 45,
      viralityScore: 96,
      socialMentions: 892000,
      tiktokViews: 312000000,
      amazonRank: 87,
      tags: ["viral", "high-margin", "aesthetic"],
      sourcePlatforms: ["TikTok", "Instagram", "Amazon"],
      projections: {
        labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        revenue: [267000, 318000, 389000, 445000, 498000, 541000],
        searchVolume: [412000, 487000, 578000, 651000, 712000, 768000],
        tamGrowth: [1.8, 2.0, 2.3, 2.6, 2.9, 3.2],
      },
      historicalData: {
        labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
        revenue: [48000, 79000, 124000, 189000, 228000, 267000],
        searchVolume: [89000, 148000, 231000, 318000, 368000, 412000],
      },
      reviews: [
        {
          author: "Emma R.",
          rating: 5,
          text: "My room looks like a Pinterest board now. Obsessed!",
          date: "Feb 2026",
          platform: "TikTok",
        },
        {
          author: "Alex T.",
          rating: 4,
          text: "Great for photos and videos. Battery life could be better.",
          date: "Feb 2026",
          platform: "Amazon",
        },
        {
          author: "Priya S.",
          rating: 3,
          text: "Looks amazing but the build quality is a bit flimsy.",
          date: "Jan 2026",
          platform: "Amazon",
        },
      ],
      insights: [
        "312M TikTok views – one of the fastest-growing home products",
        "86% margin makes this ideal for dropshipping",
        "4.0★ vs 4.6★ expected – quality improvement = market dominance",
        "TAM growing at 28.7% YoY – still early in the trend cycle",
      ],
    },
    {
      id: "p003",
      name: "Portable Blender Bottle",
      category: "Kitchen & Fitness",
      platform: "Amazon",
      image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&h=400&fit=crop&q=80",
      emoji: "🥤",
      tagline: "USB-rechargeable smoothie blender on the go",
      description:
        "A compact, USB-rechargeable personal blender that fits in a bag. Trending among fitness enthusiasts and busy professionals. Strong repeat purchase potential with replacement blades.",
      price: 39.99,
      costPrice: 8.2,
      margin: 79,
      rating: 3.8,
      reviewCount: 5612,
      expectedRating: 4.5,
      undersoldScore: 91,
      trendingRank: 2,
      trendingRankChange: +8,
      searchVolume: 334000,
      monthlyRevenue: 312000,
      tam: 2900000000,
      tamGrowthRate: 18.2,
      saturation: 38,
      competition: "Medium",
      competitionScore: 52,
      viralityScore: 82,
      socialMentions: 445000,
      tiktokViews: 89000000,
      amazonRank: 156,
      tags: ["trending", "repeat-purchase", "fitness"],
      sourcePlatforms: ["Amazon", "TikTok", "YouTube"],
      projections: {
        labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        revenue: [312000, 341000, 378000, 421000, 468000, 512000],
        searchVolume: [334000, 362000, 398000, 441000, 489000, 534000],
        tamGrowth: [2.9, 3.1, 3.3, 3.6, 3.9, 4.2],
      },
      historicalData: {
        labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
        revenue: [198000, 221000, 248000, 278000, 294000, 312000],
        searchVolume: [218000, 244000, 271000, 298000, 316000, 334000],
      },
      reviews: [
        {
          author: "Mike D.",
          rating: 4,
          text: "Perfect for post-gym smoothies. Charges fast and blends well.",
          date: "Feb 2026",
          platform: "Amazon",
        },
        {
          author: "Lisa W.",
          rating: 3,
          text: "Good concept but leaks occasionally. Needs better seal.",
          date: "Jan 2026",
          platform: "Amazon",
        },
        {
          author: "FitLife @tiktok",
          rating: 5,
          text: "This thing is a game changer for meal prep on the go!",
          date: "Feb 2026",
          platform: "TikTok",
        },
      ],
      insights: [
        "3.8★ vs 4.5★ expected – biggest quality gap in our dataset",
        "Leaking complaints = clear product improvement opportunity",
        "Fitness trend driving 18.2% YoY TAM growth",
        "Replacement blades create recurring revenue stream",
      ],
    },
    {
      id: "p004",
      name: "Smart Reusable Notebook",
      category: "Productivity",
      platform: "Amazon",
      image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=400&fit=crop&q=80",
      emoji: "📓",
      tagline: "Write, scan, erase – infinitely reusable",
      description:
        "A Rocketbook-style smart notebook with erasable pages and cloud sync via QR code. Appeals to students, professionals, and eco-conscious consumers. Strong brand loyalty and word-of-mouth.",
      price: 24.99,
      costPrice: 5.1,
      margin: 80,
      rating: 4.4,
      reviewCount: 2189,
      expectedRating: 4.8,
      undersoldScore: 76,
      trendingRank: 4,
      trendingRankChange: +2,
      searchVolume: 178000,
      monthlyRevenue: 142000,
      tam: 3600000000,
      tamGrowthRate: 9.8,
      saturation: 18,
      competition: "Low",
      competitionScore: 22,
      viralityScore: 61,
      socialMentions: 98000,
      tiktokViews: 22400000,
      amazonRank: 428,
      tags: ["eco-friendly", "low-competition", "loyal-customers"],
      sourcePlatforms: ["Amazon", "Reddit", "YouTube"],
      projections: {
        labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        revenue: [142000, 152000, 164000, 178000, 194000, 211000],
        searchVolume: [178000, 189000, 203000, 219000, 237000, 256000],
        tamGrowth: [3.6, 3.7, 3.9, 4.1, 4.3, 4.5],
      },
      historicalData: {
        labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
        revenue: [98000, 108000, 118000, 128000, 135000, 142000],
        searchVolume: [128000, 140000, 152000, 162000, 170000, 178000],
      },
      reviews: [
        {
          author: "David L.",
          rating: 5,
          text: "Replaced all my paper notebooks. Eco-friendly and practical!",
          date: "Feb 2026",
          platform: "Amazon",
        },
        {
          author: "Nina P.",
          rating: 4,
          text: "Cloud sync works great. Wish it had more page styles.",
          date: "Jan 2026",
          platform: "Amazon",
        },
        {
          author: "StudyWithMe @youtube",
          rating: 5,
          text: "Featured in my study setup video – 800K views and counting!",
          date: "Feb 2026",
          platform: "YouTube",
        },
      ],
      insights: [
        "Lowest competition score (22) – ideal entry point for new dropshippers",
        "18% saturation – significant untapped market remaining",
        "Eco-conscious trend driving steady, sustainable growth",
        "4.4★ vs 4.8★ expected – premium positioning opportunity",
      ],
    },
  ],

  // Market overview stats
  marketStats: {
    totalProductsTracked: 12847,
    newTrendsDetected: 234,
    avgMarketGrowth: 17.3,
    dataFreshness: "Live – updated 4 min ago",
  },

  // Get product by ID
  getProduct(id) {
    return this.products.find((p) => p.id === id) || null;
  },

  // Search products
  search(query) {
    const q = query.toLowerCase();
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.description.toLowerCase().includes(q)
    );
  },

  // Sort products
  sort(field, direction = "desc") {
    const sorted = [...this.products];
    sorted.sort((a, b) => {
      if (direction === "desc") return b[field] - a[field];
      return a[field] - b[field];
    });
    return sorted;
  },

  // Format currency
  formatCurrency(value) {
    if (value >= 1000000000)
      return "$" + (value / 1000000000).toFixed(1) + "B";
    if (value >= 1000000) return "$" + (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return "$" + (value / 1000).toFixed(0) + "K";
    return "$" + value.toFixed(2);
  },

  // Format number
  formatNumber(value) {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return (value / 1000).toFixed(0) + "K";
    return value.toString();
  },
};

// Persist to localStorage
function saveDB() {
  localStorage.setItem("mm_db", JSON.stringify(DB.products));
}

function loadDB() {
  const saved = localStorage.getItem("mm_db");
  if (saved) {
    // Merge saved data (preserve structure)
    const parsed = JSON.parse(saved);
    // Only use saved if it has the same IDs
    if (parsed.length === DB.products.length) {
      DB.products = parsed;
    }
  }
}

// Initialize
loadDB();
