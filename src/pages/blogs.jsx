// pages/Blogs.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Whatsapp from "../components/whatsapp";
import CartSidebar from "../components/cartsidebar";
import { useCart } from "../hooks/usecart";
import { useWishlist } from "../hooks/usewishlist";

// ══════════════════════════════════════════════════════════════════
// EDUCATIONAL VLOGS - SKINCARE, WELLNESS & NUTRITION
// ══════════════════════════════════════════════════════════════════

const VLOG_CATEGORIES = [
  { key: "cleansers",   label: "Cleansers",     icon: "🧼" },
  { key: "sunscreen",   label: "Sunscreen",     icon: "☀️" },
  { key: "moisturizer", label: "Moisturizers",  icon: "💧" },
  { key: "proteins",    label: "Proteins",      icon: "💪" },
  { key: "vitamins",    label: "Vitamins",      icon: "🌿" },
  { key: "skincare",    label: "Skin Routines", icon: "✨" },
];

const EDUCATIONAL_VLOGS = {
  cleansers: [
    {
      id: "c1",
      title: "CeraVe Hydrating Cleanser: The Science Behind Gentle Cleansing",
      brand: "CeraVe",
      category: "Cleansers",
      thumbnail: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
      videoUrl: "#",
      duration: "8 min read",
      description: "Understanding ceramides and hyaluronic acid - why CeraVe's hydrating cleanser is perfect for sensitive skin. This cleanser maintains your skin's natural barrier while removing dirt and makeup without stripping essential moisture.",
      keyPoints: [
        "Contains 3 essential ceramides (1, 3, 6-II)",
        "Hyaluronic acid retains moisture",
        "Non-comedogenic and fragrance-free",
        "pH-balanced formula (5.5)"
      ],
      content: "CeraVe Hydrating Cleanser is formulated with dermatologists and contains three essential ceramides that work together to restore and maintain your skin's natural protective barrier. The addition of hyaluronic acid helps retain skin's natural moisture, making it ideal for normal to dry skin types.",
      tags: ["sensitive-skin", "dry-skin", "barrier-repair"],
      date: "2025-05-01"
    },
    {
      id: "c2",
      title: "La Roche-Posay Toleriane: Ultra-Gentle Cleansing for Reactive Skin",
      brand: "La Roche-Posay",
      category: "Cleansers",
      thumbnail: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
      videoUrl: "#",
      duration: "7 min read",
      description: "Deep dive into thermal spring water benefits and why La Roche-Posay is recommended by dermatologists worldwide for sensitive and allergy-prone skin.",
      keyPoints: [
        "Prebiotic thermal water soothes skin",
        "Minimal 9-ingredient formula",
        "Tested on sensitive skin",
        "Removes makeup and impurities"
      ],
      content: "La Roche-Posay Toleriane Hydrating Gentle Cleanser features a minimalist formula with only 9 ingredients, including their signature prebiotic thermal spring water. This ultra-gentle face wash is specifically designed for sensitive skin that reacts to most products.",
      tags: ["sensitive-skin", "allergies", "minimal-ingredients"],
      date: "2025-04-28"
    },
    {
      id: "c3",
      title: "Oil Control Cleansing: Managing Sebum Production Effectively",
      brand: "Expert Guide",
      category: "Cleansers",
      thumbnail: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
      videoUrl: "#",
      duration: "10 min read",
      description: "Learn how to control excess oil without over-drying your skin. Understanding sebum regulation and the right ingredients for oily, acne-prone skin.",
      keyPoints: [
        "Salicylic acid for pore cleansing",
        "Niacinamide regulates oil production",
        "Gentle exfoliation prevents buildup",
        "pH balance is crucial"
      ],
      content: "Managing oily skin requires understanding that stripping all oil can actually trigger more oil production. The key is gentle, balanced cleansing with ingredients like salicylic acid (BHA) that penetrate pores, and niacinamide which regulates sebum without irritation.",
      tags: ["oily-skin", "acne", "oil-control"],
      date: "2025-04-25"
    }
  ],

  sunscreen: [
    {
      id: "s1",
      title: "La Roche-Posay Anthelios: Understanding SPF & Broad Spectrum Protection",
      brand: "La Roche-Posay",
      category: "Sunscreen",
      thumbnail: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
      videoUrl: "#",
      duration: "12 min read",
      description: "Everything you need to know about UVA and UVB protection, PPD ratings, and why La Roche-Posay Anthelios is a dermatologist favorite for daily sun protection.",
      keyPoints: [
        "SPF 50+ broad spectrum protection",
        "UVA-PF rating explained",
        "Water-resistant formula",
        "Suitable for sensitive skin"
      ],
      content: "La Roche-Posay Anthelios provides high broad-spectrum protection with advanced filter systems. Understanding SPF: it measures UVB protection (sunburn), while PA++++ indicates UVA protection (aging). This sunscreen offers both, plus thermal spring water to soothe skin.",
      tags: ["sun-protection", "anti-aging", "daily-defense"],
      date: "2025-05-03"
    },
    {
      id: "s2",
      title: "CeraVe Ultra-Light Moisturizing Lotion SPF 30: Daily Defense",
      brand: "CeraVe",
      category: "Sunscreen",
      thumbnail: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
      videoUrl: "#",
      duration: "9 min read",
      description: "Combining sun protection with skin barrier repair - how CeraVe's formula delivers ceramides and SPF in one lightweight application.",
      keyPoints: [
        "Ceramides restore skin barrier",
        "MVE technology for all-day hydration",
        "Non-greasy, suitable for face",
        "Zinc oxide mineral protection"
      ],
      content: "CeraVe's AM Facial Moisturizing Lotion combines essential ceramides with broad-spectrum SPF 30 protection. The MVE (MultiVesicular Emulsion) technology provides controlled release of moisturizing ingredients throughout the day, while zinc oxide offers gentle mineral sun protection.",
      tags: ["daily-sunscreen", "moisturizer", "barrier-repair"],
      date: "2025-04-30"
    },
    {
      id: "s3",
      title: "Mineral vs Chemical Sunscreen: Which Is Right for You?",
      brand: "Expert Guide",
      category: "Sunscreen",
      thumbnail: "https://images.unsplash.com/photo-1564932294833-037a58c90f31?w=800&q=80",
      videoUrl: "#",
      duration: "11 min read",
      description: "Breaking down the science of physical blockers (zinc oxide, titanium dioxide) versus chemical filters - benefits, drawbacks, and how to choose.",
      keyPoints: [
        "Mineral: sits on skin surface",
        "Chemical: absorbs into skin",
        "Sensitive skin often prefers mineral",
        "Reef-safe considerations"
      ],
      content: "Mineral sunscreens (zinc oxide, titanium dioxide) create a physical barrier that reflects UV rays, making them ideal for sensitive or reactive skin. Chemical sunscreens absorb UV radiation and convert it to heat. Both are effective when applied correctly (2mg per cm² of skin).",
      tags: ["sunscreen-guide", "ingredient-education", "skin-safety"],
      date: "2025-04-22"
    }
  ],

  moisturizer: [
    {
      id: "m1",
      title: "CeraVe Moisturizing Cream: The Gold Standard in Barrier Repair",
      brand: "CeraVe",
      category: "Moisturizers",
      thumbnail: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=800&q=80",
      videoUrl: "#",
      duration: "8 min read",
      description: "Why this tub is a holy grail product - understanding the ceramide ratio, MVE technology, and how it restores compromised skin barriers.",
      keyPoints: [
        "3 essential ceramides in optimal ratio",
        "MVE delivers 24-hour hydration",
        "Hyaluronic acid plumps skin",
        "Suitable for face and body"
      ],
      content: "CeraVe Moisturizing Cream contains the optimal 1:1:1 ratio of ceramides 1, 3, and 6-II, mimicking the skin's natural lipid profile. The patented MVE technology creates a moisture barrier that continuously releases hydrating ingredients for 24 hours, making it perfect for dry, compromised skin.",
      tags: ["dry-skin", "eczema", "barrier-repair"],
      date: "2025-05-02"
    },
    {
      id: "m2",
      title: "La Roche-Posay Toleriane Double Repair: Prebiotic Moisture",
      brand: "La Roche-Posay",
      category: "Moisturizers",
      thumbnail: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
      videoUrl: "#",
      duration: "9 min read",
      description: "Exploring the microbiome approach to skincare - how prebiotics support skin's natural defense system and maintain healthy bacterial balance.",
      keyPoints: [
        "Prebiotic thermal spring water",
        "Ceramide-3 for barrier function",
        "Niacinamide brightens and soothes",
        "Oil-free, non-comedogenic"
      ],
      content: "La Roche-Posay's Double Repair Moisturizer takes a microbiome-friendly approach with prebiotic thermal spring water that nourishes beneficial skin bacteria. Combined with ceramide-3 and niacinamide, it repairs the skin barrier while addressing sensitivity, making it suitable for all skin types including acne-prone.",
      tags: ["all-skin-types", "microbiome", "sensitive-skin"],
      date: "2025-04-27"
    },
    {
      id: "m3",
      title: "Hydration Layers: How to Build an Effective Moisture Routine",
      brand: "Expert Guide",
      category: "Moisturizers",
      thumbnail: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
      videoUrl: "#",
      duration: "10 min read",
      description: "The Korean skincare approach to layering hydration - from essences to occlusives, understanding humectants, emollients, and occlusives.",
      keyPoints: [
        "Humectants attract water (hyaluronic acid)",
        "Emollients smooth and soften",
        "Occlusives seal in moisture",
        "Layer from thinnest to thickest"
      ],
      content: "Effective moisturization requires understanding three types of ingredients: humectants (glycerin, hyaluronic acid) draw water into skin; emollients (ceramides, fatty acids) smooth and repair; occlusives (petrolatum, dimethicone) seal everything in. Layer them strategically for maximum hydration.",
      tags: ["skincare-routine", "hydration", "layering"],
      date: "2025-04-20"
    }
  ],

  proteins: [
    {
      id: "p1",
      title: "Diesel Protein: Complete Amino Acid Profile for Muscle Recovery",
      brand: "Diesel",
      category: "Proteins",
      thumbnail: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80",
      videoUrl: "#",
      duration: "12 min read",
      description: "Understanding whey protein isolate, BCAAs, and optimal timing for muscle protein synthesis. How Diesel Nutrition delivers premium quality protein.",
      keyPoints: [
        "25g protein per serving",
        "Complete essential amino acid profile",
        "Fast-absorbing whey isolate",
        "Post-workout recovery optimized"
      ],
      content: "Diesel Whey Protein Isolate provides 25 grams of high-quality protein with minimal carbs and fats. Whey isolate is the purest form of whey protein (90%+ protein), rapidly absorbed post-workout when muscles are primed for growth. Rich in leucine, the key trigger for muscle protein synthesis.",
      tags: ["muscle-building", "recovery", "fitness"],
      date: "2025-05-04"
    },
    {
      id: "p2",
      title: "Protein Intake Guide: How Much Do You Actually Need?",
      brand: "Expert Guide",
      category: "Proteins",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      videoUrl: "#",
      duration: "15 min read",
      description: "Science-based protein requirements for different goals - weight loss, muscle gain, athletic performance, and general health maintenance.",
      keyPoints: [
        "Sedentary: 0.8g per kg body weight",
        "Active: 1.4-2.0g per kg",
        "Athletes: up to 2.2g per kg",
        "Timing matters for muscle growth"
      ],
      content: "Protein needs vary based on activity level and goals. For muscle building, aim for 1.6-2.2g per kg of body weight daily, distributed across 4-5 meals. Post-workout, consume 20-40g within 2 hours. For weight loss, higher protein (2.0-2.4g/kg) preserves muscle mass while in a caloric deficit.",
      tags: ["nutrition", "muscle-gain", "weight-loss"],
      date: "2025-04-29"
    },
    {
      id: "p3",
      title: "Whey vs Casein vs Plant Protein: Complete Comparison",
      brand: "Expert Guide",
      category: "Proteins",
      thumbnail: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&q=80",
      videoUrl: "#",
      duration: "13 min read",
      description: "Breaking down protein sources - absorption rates, amino acid profiles, digestibility, and when to use each type for optimal results.",
      keyPoints: [
        "Whey: fast absorption (ideal post-workout)",
        "Casein: slow release (good before bed)",
        "Plant: sustainable, complete combos needed",
        "Digestibility scores explained"
      ],
      content: "Whey protein is absorbed within 1-2 hours, making it ideal post-workout. Casein takes 6-8 hours, providing steady amino acids overnight. Plant proteins (pea, rice, hemp) can match whey when combined properly for complete amino acid profiles. Choose based on timing, dietary needs, and goals.",
      tags: ["protein-types", "nutrition-guide", "supplementation"],
      date: "2025-04-24"
    }
  ],

  vitamins: [
    {
      id: "v1",
      title: "Jamieson Vitamin D3: The Sunshine Vitamin Explained",
      brand: "Jamieson",
      category: "Vitamins",
      thumbnail: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
      videoUrl: "#",
      duration: "10 min read",
      description: "Why 80% of people are deficient in Vitamin D - understanding bone health, immune function, and mood regulation with Jamieson's pharmaceutical-grade D3.",
      keyPoints: [
        "1000-4000 IU daily recommended",
        "D3 more effective than D2",
        "Supports bone density and immunity",
        "Take with fat for absorption"
      ],
      content: "Vitamin D3 (cholecalciferol) is essential for calcium absorption, immune function, and mood regulation. Jamieson's D3 provides bioavailable supplementation crucial for those with limited sun exposure. Most adults need 1000-2000 IU daily; those with deficiency may require 4000 IU under medical supervision.",
      tags: ["immunity", "bone-health", "supplements"],
      date: "2025-05-01"
    },
    {
      id: "v2",
      title: "Jamieson Omega-3: Essential Fatty Acids for Brain & Heart Health",
      brand: "Jamieson",
      category: "Vitamins",
      thumbnail: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
      videoUrl: "#",
      duration: "11 min read",
      description: "Understanding EPA and DHA - the omega-3s your body can't produce. How Jamieson's purified fish oil supports cardiovascular health and cognitive function.",
      keyPoints: [
        "EPA reduces inflammation",
        "DHA supports brain function",
        "1000-2000mg combined daily",
        "Purified to remove contaminants"
      ],
      content: "Omega-3 fatty acids (EPA and DHA) are essential nutrients from fish oil that your body cannot synthesize. EPA primarily supports cardiovascular health and reduces inflammation, while DHA is crucial for brain structure and function. Jamieson's purified omega-3 provides pharmaceutical-grade purity without fishy aftertaste.",
      tags: ["heart-health", "brain-health", "omega-3"],
      date: "2025-04-26"
    },
    {
      id: "v3",
      title: "Complete Multivitamin Guide: What Your Body Actually Needs",
      brand: "Expert Guide",
      category: "Vitamins",
      thumbnail: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=80",
      videoUrl: "#",
      duration: "14 min read",
      description: "Comprehensive breakdown of essential vitamins and minerals - recommended daily allowances, deficiency symptoms, and how to choose quality supplements.",
      keyPoints: [
        "Essential vitamins A, B-complex, C, D, E, K",
        "Key minerals: calcium, magnesium, zinc, iron",
        "Bioavailability matters more than dose",
        "Food first, supplement gaps"
      ],
      content: "A quality multivitamin should provide B-complex for energy, vitamin D for immunity, magnesium for muscle and nerve function, and zinc for immune support. Look for methylated B vitamins (methylcobalamin, methylfolate) for better absorption. Remember: supplements complement a healthy diet, they don't replace it.",
      tags: ["multivitamin", "nutrition", "wellness"],
      date: "2025-04-23"
    }
  ],

  skincare: [
    {
      id: "r1",
      title: "The Perfect Morning Skincare Routine: A Dermatologist's Approach",
      brand: "Expert Guide",
      category: "Skin Routines",
      thumbnail: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80",
      videoUrl: "#",
      duration: "12 min read",
      description: "Step-by-step AM routine for healthy, protected skin - from cleansing to SPF, featuring CeraVe and La Roche-Posay products.",
      keyPoints: [
        "1. Gentle cleanser (CeraVe Hydrating)",
        "2. Antioxidant serum (Vitamin C)",
        "3. Moisturizer with ceramides",
        "4. Broad spectrum SPF 30+"
      ],
      content: "Morning Routine: (1) Cleanse with CeraVe Hydrating to remove overnight oils without stripping. (2) Apply antioxidant serum like Vitamin C to protect against free radicals. (3) Lock in with La Roche-Posay Toleriane moisturizer. (4) Finish with broad-spectrum SPF - non-negotiable daily protection. Wait 1-2 minutes between steps.",
      tags: ["morning-routine", "skincare-basics", "sun-protection"],
      date: "2025-05-03"
    },
    {
      id: "r2",
      title: "Evening Repair Routine: Maximize Overnight Skin Recovery",
      brand: "Expert Guide",
      category: "Skin Routines",
      thumbnail: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
      videoUrl: "#",
      duration: "13 min read",
      description: "Nighttime is when skin repairs itself - learn how to support natural regeneration with active ingredients and barrier-supporting products.",
      keyPoints: [
        "1. Double cleanse to remove SPF",
        "2. Treatment actives (retinol/acids)",
        "3. Hydrating essence or serum",
        "4. Rich moisturizer to seal"
      ],
      content: "Evening Routine: (1) Oil cleanse then CeraVe Foaming for thorough cleansing. (2) Apply treatment (retinol 2-3x/week for beginners). (3) Layer hyaluronic acid serum on damp skin. (4) Seal with CeraVe Moisturizing Cream - the tub is ideal for overnight barrier repair. Skin regenerates during sleep; support it properly.",
      tags: ["evening-routine", "retinol", "anti-aging"],
      date: "2025-04-28"
    },
    {
      id: "r3",
      title: "Acne-Prone Skin: Building a Routine That Actually Works",
      brand: "Expert Guide",
      category: "Skin Routines",
      thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
      videoUrl: "#",
      duration: "15 min read",
      description: "Managing breakouts without destroying your skin barrier - the balance of exfoliation, hydration, and patience.",
      keyPoints: [
        "Gentle cleansing prevents over-drying",
        "Salicylic acid or benzoyl peroxide",
        "Don't skip moisturizer",
        "Consistency over intensity"
      ],
      content: "Acne-prone routine requires balance. Morning: CeraVe Foaming Cleanser, La Roche-Posay Effaclar Duo (2.5% benzoyl peroxide), oil-free moisturizer, SPF. Evening: Same cleanser, salicylic acid treatment (alternate nights), niacinamide serum, gel moisturizer. Don't over-exfoliate - this triggers more oil production. Takes 8-12 weeks to see results.",
      tags: ["acne", "oily-skin", "problem-skin"],
      date: "2025-04-21"
    }
  ]
};

// Editorial headlines that rotate
const EDITORIAL_HEADLINES = [
  { title: "Science-Backed Skincare", sub: "Evidence-based approaches to skin health and wellness" },
  { title: "Ingredient Deep Dives", sub: "Understanding what you put on your skin and in your body" },
  { title: "Expert Education", sub: "Dermatologist-approved routines and nutritional guidance" },
  { title: "Wellness Intelligence", sub: "Holistic health through smart skincare and nutrition" },
];

export default function Blogs() {
  const [isCartOpen, setIsCartOpen]       = useState(false);
  const [activeTab, setActiveTab]         = useState("cleansers");
  const [search, setSearch]               = useState("");
  const [featuredVlog, setFeaturedVlog]   = useState(null);

  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const { wishlist } = useWishlist();

  // Random headline
  const headline = EDITORIAL_HEADLINES[
    Math.floor(Math.random() * EDITORIAL_HEADLINES.length)
  ];

  // Set featured vlog on mount
  useEffect(() => {
    const allVlogs = Object.values(EDUCATIONAL_VLOGS).flat();
    const featured = allVlogs[Math.floor(Math.random() * allVlogs.length)];
    setFeaturedVlog(featured);
  }, []);

  // Get current tab vlogs
  const vlogs = EDUCATIONAL_VLOGS[activeTab] || [];

  // Filter vlogs based on search
  const filtered = search.trim()
    ? vlogs.filter(v =>
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.brand.toLowerCase().includes(search.toLowerCase()) ||
        v.content.toLowerCase().includes(search.toLowerCase()) ||
        v.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    : vlogs;

  const hero = filtered[0] || null;
  const grid = filtered.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
        
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .vlog-root {
          background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
          font-family: 'Inter', sans-serif;
          color: #1a1a1a;
          min-height: 100vh;
        }

        /* ══ HEADER ══ */
        .vlog-header {
          padding: 120px 0 70px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }
        .vlog-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="white" opacity="0.1"/></svg>');
          opacity: 0.3;
        }
        .vlog-eyebrow {
          font-size: 11px;
          letter-spacing: 0.25em;
          font-weight: 500;
          margin-bottom: 20px;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .vlog-eyebrow::before {
          content: '';
          width: 40px;
          height: 2px;
          background: rgba(255,255,255,0.5);
        }
        .vlog-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 7vw, 88px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .vlog-h1 em {
          font-style: italic;
          font-weight: 500;
          color: #ffd700;
        }
        .vlog-header-sub {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.7;
          max-width: 540px;
          opacity: 0.95;
        }

        /* ══ SEARCH ══ */
        .vlog-search-wrap {
          position: relative;
          max-width: 420px;
        }
        .vlog-search {
          width: 100%;
          padding: 14px 50px 14px 20px;
          border: 2px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: white;
          border-radius: 12px;
          outline: none;
          transition: all 0.3s;
        }
        .vlog-search::placeholder {
          color: rgba(255,255,255,0.6);
        }
        .vlog-search:focus {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.5);
        }
        .vlog-search-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.7);
          pointer-events: none;
        }

        /* ══ TABS ══ */
        .vlog-tabs-container {
          background: white;
          border-bottom: 2px solid #f0f0f0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .vlog-tabs {
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .vlog-tabs::-webkit-scrollbar {
          display: none;
        }
        .vlog-tab {
          padding: 18px 28px;
          font-size: 13px;
          letter-spacing: 0.05em;
          font-weight: 500;
          color: #666;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
          border-bottom: 3px solid transparent;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .vlog-tab:hover {
          color: #667eea;
          background: rgba(102,126,234,0.05);
        }
        .vlog-tab.active {
          color: #667eea;
          border-bottom-color: #667eea;
          background: rgba(102,126,234,0.08);
        }

        /* ══ FEATURED ══ */
        .vlog-featured {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          text-decoration: none;
          margin-bottom: 60px;
          transition: transform 0.4s, box-shadow 0.4s;
        }
        .vlog-featured:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(102,126,234,0.15);
        }
        .vlog-featured-img {
          height: 500px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .vlog-featured-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0.9;
          mix-blend-mode: luminosity;
        }
        .vlog-featured:hover .vlog-featured-img img {
          transform: scale(1.08);
        }
        .vlog-featured-badge {
          position: absolute;
          top: 24px;
          left: 24px;
          background: rgba(255,215,0,0.95);
          backdrop-filter: blur(8px);
          color: #1a1a1a;
          font-size: 10px;
          letter-spacing: 0.2em;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 20px;
        }
        .vlog-featured-duration {
          position: absolute;
          bottom: 24px;
          right: 24px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          color: white;
          font-size: 12px;
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .vlog-featured-body {
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .vlog-featured-cat {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .vlog-featured-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 1.3;
          margin-bottom: 20px;
        }
        .vlog-featured-desc {
          font-size: 15px;
          font-weight: 400;
          color: #666;
          line-height: 1.8;
          margin-bottom: 28px;
        }
        .vlog-featured-brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #1a1a1a;
          background: #f8f9fa;
          padding: 8px 16px;
          border-radius: 20px;
          margin-bottom: 24px;
          align-self: flex-start;
        }
        .vlog-read-more {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          letter-spacing: 0.05em;
          font-weight: 600;
          color: #667eea;
          border-bottom: 2px solid #667eea;
          padding-bottom: 4px;
          align-self: flex-start;
          transition: all 0.3s;
        }
        .vlog-featured:hover .vlog-read-more {
          gap: 14px;
          color: #764ba2;
          border-color: #764ba2;
        }

        /* ══ GRID ══ */
        .vlog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 32px;
        }
        .vlog-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          text-decoration: none;
          transition: all 0.4s;
          display: flex;
          flex-direction: column;
        }
        .vlog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(102,126,234,0.12);
        }
        .vlog-card-img {
          height: 220px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .vlog-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0.85;
          mix-blend-mode: luminosity;
        }
        .vlog-card:hover .vlog-card-img img {
          transform: scale(1.1);
          opacity: 0.95;
        }
        .vlog-card-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #667eea;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 16px;
        }
        .vlog-card-duration {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          color: white;
          font-size: 11px;
          padding: 6px 12px;
          border-radius: 16px;
        }
        .vlog-card-body {
          padding: 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .vlog-card-brand {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: #667eea;
          background: rgba(102,126,234,0.1);
          padding: 6px 12px;
          border-radius: 12px;
          margin-bottom: 14px;
          align-self: flex-start;
        }
        .vlog-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 1.35;
          margin-bottom: 14px;
        }
        .vlog-card-desc {
          font-size: 13px;
          font-weight: 400;
          color: #666;
          line-height: 1.75;
          flex: 1;
          margin-bottom: 20px;
        }
        .vlog-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .vlog-card-tags span {
          font-size: 9px;
          letter-spacing: 0.05em;
          color: #999;
          background: #f8f9fa;
          padding: 4px 10px;
          border-radius: 10px;
        }
        .vlog-card-arrow {
          font-size: 12px;
          font-weight: 600;
          color: #667eea;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.3s;
        }
        .vlog-card:hover .vlog-card-arrow {
          gap: 10px;
        }

        /* ══ RESULTS COUNT ══ */
        .vlog-results {
          font-size: 13px;
          color: #999;
          letter-spacing: 0.03em;
          margin-bottom: 32px;
          font-weight: 500;
        }
        .vlog-results span {
          color: #667eea;
          font-weight: 600;
        }

        /* ══ LOADING / EMPTY ══ */
        .vlog-center {
          text-align: center;
          padding: 100px 0;
        }
        .vlog-empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.3;
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 1024px) {
          .vlog-featured {
            grid-template-columns: 1fr;
          }
          .vlog-featured-img {
            height: 320px;
          }
          .vlog-featured-body {
            padding: 40px;
          }
        }
        @media (max-width: 768px) {
          .vlog-header {
            padding: 100px 0 60px;
          }
          .vlog-featured-body {
            padding: 32px;
          }
          .vlog-featured-title {
            font-size: 28px;
          }
          .vlog-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 480px) {
          .vlog-tabs {
            padding: 0 20px;
          }
          .vlog-featured-body {
            padding: 24px;
          }
        }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
      />

      <div className="vlog-root">
        {/* ══ HEADER ══ */}
        <header className="vlog-header">
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }}>
              <div>
                <div className="vlog-eyebrow">EDUCATIONAL WELLNESS JOURNAL</div>
                <h1 className="vlog-h1">
                  {headline.title.split(" ").slice(0, -1).join(" ")} <em>{headline.title.split(" ").slice(-1)}</em>
                </h1>
                <p className="vlog-header-sub">{headline.sub}</p>
              </div>

              {/* Search */}
              <div className="vlog-search-wrap">
                <input
                  className="vlog-search"
                  type="text"
                  placeholder="Search topics, brands, ingredients..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <span className="vlog-search-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ══ TABS ══ */}
        <div className="vlog-tabs-container">
          <div className="vlog-tabs">
            {VLOG_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`vlog-tab${activeTab === cat.key ? " active" : ""}`}
                onClick={() => { setActiveTab(cat.key); setSearch(""); }}
              >
                <span>{cat.icon}</span>
                {cat.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ══ CONTENT ══ */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 40px 120px" }}>
          
          {/* Results count */}
          {filtered.length > 0 && (
            <p className="vlog-results">
              Showing <span>{filtered.length}</span> educational article{filtered.length !== 1 ? "s" : ""}
              {search && <> matching "<span>{search}</span>"</>}
            </p>
          )}

          {/* Featured */}
          {hero && (
            <a
              href={hero.videoUrl}
              className="vlog-featured"
              onClick={e => {
                if (hero.videoUrl === "#") e.preventDefault();
              }}
            >
              <div className="vlog-featured-img">
                <img src={hero.thumbnail} alt={hero.title} />
                <div className="vlog-featured-badge">FEATURED ARTICLE</div>
                <div className="vlog-featured-duration">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  {hero.duration}
                </div>
              </div>
              <div className="vlog-featured-body">
                <p className="vlog-featured-cat">{hero.category}</p>
                <h2 className="vlog-featured-title">{hero.title}</h2>
                <p className="vlog-featured-desc">{hero.description}</p>
                <span className="vlog-featured-brand">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  {hero.brand}
                </span>
                <span className="vlog-read-more">
                  READ FULL ARTICLE
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </a>
          )}

          {/* Grid */}
          {grid.length > 0 && (
            <div className="vlog-grid">
              {grid.map(vlog => (
                <a
                  key={vlog.id}
                  href={vlog.videoUrl}
                  className="vlog-card"
                  onClick={e => {
                    if (vlog.videoUrl === "#") e.preventDefault();
                  }}
                >
                  <div className="vlog-card-img">
                    <img src={vlog.thumbnail} alt={vlog.title} />
                    <div className="vlog-card-tag">{vlog.category.toUpperCase()}</div>
                    <div className="vlog-card-duration">{vlog.duration}</div>
                  </div>
                  <div className="vlog-card-body">
                    <span className="vlog-card-brand">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      {vlog.brand}
                    </span>
                    <h3 className="vlog-card-title">{vlog.title}</h3>
                    <p className="vlog-card-desc">{vlog.description.slice(0, 120)}...</p>
                    <div className="vlog-card-tags">
                      {vlog.tags.slice(0, 3).map(tag => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                    <span className="vlog-card-arrow">
                      Read More
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* No results */}
          {filtered.length === 0 && (
            <div className="vlog-center">
              <div className="vlog-empty-icon">🔍</div>
              <p style={{ fontSize: 18, color: "#666", marginBottom: 12 }}>
                No articles found for "{search}"
              </p>
              <button
                onClick={() => setSearch("")}
                style={{
                  marginTop: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: "white",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  padding: "14px 32px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform = "translateY(0)"}
              >
                CLEAR SEARCH
              </button>
            </div>
          )}
        </div>
      </div>

      <Whatsapp />
      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        total={cartTotal}
      />
    </>
  );
}