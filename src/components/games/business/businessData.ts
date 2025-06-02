
// Business-themed Monopoly game data

export interface BusinessProperty {
  id: number;
  name: string;
  type: 'property' | 'startup' | 'corporation' | 'event' | 'tax' | 'go' | 'jail';
  colorGroup: string;
  price: number;
  rent: number[];
  upgradeCost?: number;
  upgradeNames?: string[];
  description: string;
  owner?: number;
  upgrades?: number;
}

export interface BusinessPlayer {
  id: number;
  name: string;
  money: number;
  position: number;
  properties: number[];
  isInJail: boolean;
  jailTurns: number;
  token: string;
  role: 'entrepreneur' | 'investor' | 'executive' | 'startup_founder';
  portfolioValue: number;
  netWorth: number;
}

export interface EventCard {
  id: string;
  title: string;
  description: string;
  moneyChange: number;
  type: 'opportunity' | 'crisis' | 'market' | 'innovation';
}

export interface PlayerToken {
  id: string;
  name: string;
  icon: string;
  description: string;
  ability?: string;
}

// 40-space business board layout
export const businessProperties: BusinessProperty[] = [
  // Corner 1: GO
  { id: 0, name: "Business Incubator (GO)", type: 'go', colorGroup: 'special', price: 0, rent: [0], description: "Collect 2,000 BC when you pass" },
  
  // Purple Group - Tech Startups
  { id: 1, name: "AI Startup", type: 'startup', colorGroup: 'purple', price: 600, rent: [20, 100, 300, 900, 1600, 2500], upgradeCost: 500, upgradeNames: ['MVP', 'Beta', 'Series A', 'Scale-up', 'IPO'], description: "Cutting-edge AI technology company" },
  { id: 2, name: "Innovation Fund", type: 'event', colorGroup: 'special', price: 0, rent: [0], description: "Draw an opportunity card" },
  { id: 3, name: "Blockchain Venture", type: 'startup', colorGroup: 'purple', price: 800, rent: [40, 200, 600, 1800, 3200, 4500], upgradeCost: 500, upgradeNames: ['Proof of Concept', 'Alpha', 'Beta', 'Launch', 'Enterprise'], description: "Revolutionary blockchain solution" },
  
  // Business Tax
  { id: 4, name: "Corporate Tax", type: 'tax', colorGroup: 'special', price: 0, rent: [0], description: "Pay 2,000 BC in business taxes" },
  
  // Transportation - Logistics
  { id: 5, name: "Global Logistics Hub", type: 'corporation', colorGroup: 'transportation', price: 2000, rent: [250, 500, 1000, 2000], description: "International shipping and logistics" },
  
  // Light Blue Group - E-commerce
  { id: 6, name: "Online Marketplace", type: 'property', colorGroup: 'lightblue', price: 1000, rent: [60, 300, 900, 2700, 4000, 5500], upgradeCost: 500, upgradeNames: ['Storefront', 'Marketing Dept', 'Fulfillment Center', 'Analytics Team', 'Global HQ'], description: "Digital commerce platform" },
  { id: 7, name: "Market Opportunity", type: 'event', colorGroup: 'special', price: 0, rent: [0], description: "Draw an opportunity card" },
  { id: 8, name: "Digital Payment Systems", type: 'property', colorGroup: 'lightblue', price: 1000, rent: [60, 300, 900, 2700, 4000, 5500], upgradeCost: 500, upgradeNames: ['Gateway', 'Security Team', 'Mobile App', 'Global Expansion', 'Financial HQ'], description: "Fintech payment solutions" },
  { id: 9, name: "Subscription Platform", type: 'property', colorGroup: 'lightblue', price: 1200, rent: [80, 400, 1000, 3000, 4500, 6000], upgradeCost: 500, upgradeNames: ['Beta Platform', 'User Acquisition', 'Premium Features', 'Enterprise Sales', 'Content HQ'], description: "SaaS subscription service" },
  
  // Corner 2: Visiting Jail
  { id: 10, name: "Compliance Review", type: 'jail', colorGroup: 'special', price: 0, rent: [0], description: "Just visiting regulatory compliance" },
  
  // Pink Group - Entertainment & Media
  { id: 11, name: "Streaming Service", type: 'property', colorGroup: 'pink', price: 1400, rent: [100, 500, 1500, 4500, 6250, 7500], upgradeCost: 1000, upgradeNames: ['Content Library', 'Original Series', 'Global Distribution', 'Premium Tier', 'Media Empire'], description: "Digital entertainment platform" },
  { id: 12, name: "Creative Agency", type: 'corporation', colorGroup: 'utilities', price: 1500, rent: [40, 100], description: "Full-service marketing and branding" },
  { id: 13, name: "Gaming Studio", type: 'property', colorGroup: 'pink', price: 1400, rent: [100, 500, 1500, 4500, 6250, 7500], upgradeCost: 1000, upgradeNames: ['Indie Game', 'Mobile Games', 'AAA Title', 'Gaming Platform', 'Entertainment HQ'], description: "Video game development" },
  { id: 14, name: "Social Media Platform", type: 'property', colorGroup: 'pink', price: 1600, rent: [120, 600, 1800, 5400, 7000, 8500], upgradeCost: 1000, upgradeNames: ['User Base', 'Monetization', 'Global Reach', 'Creator Economy', 'Social Empire'], description: "Next-gen social network" },
  
  // Transportation - Aviation
  { id: 15, name: "Private Aviation", type: 'corporation', colorGroup: 'transportation', price: 2000, rent: [250, 500, 1000, 2000], description: "Executive travel services" },
  
  // Orange Group - Manufacturing
  { id: 16, name: "Smart Factory", type: 'property', colorGroup: 'orange', price: 1800, rent: [140, 700, 2000, 5500, 7500, 9500], upgradeCost: 1000, upgradeNames: ['Automation', 'IoT Systems', 'AI Quality Control', 'Global Production', 'Manufacturing HQ'], description: "Industry 4.0 manufacturing" },
  { id: 17, name: "Business Crisis", type: 'event', colorGroup: 'special', price: 0, rent: [0], description: "Draw a crisis card" },
  { id: 18, name: "Renewable Energy", type: 'property', colorGroup: 'orange', price: 1800, rent: [140, 700, 2000, 5500, 7500, 9500], upgradeCost: 1000, upgradeNames: ['Solar Farm', 'Wind Turbines', 'Energy Storage', 'Grid Integration', 'Green Energy HQ'], description: "Sustainable energy solutions" },
  { id: 19, name: "Electric Vehicle Manufacturer", type: 'property', colorGroup: 'orange', price: 2000, rent: [160, 800, 2200, 6000, 8000, 10000], upgradeCost: 1000, upgradeNames: ['Prototype', 'Production Line', 'Charging Network', 'Autonomous Tech', 'Mobility HQ'], description: "Future of transportation" },
  
  // Corner 3: Free Parking - Innovation Lab
  { id: 20, name: "Innovation Lab", type: 'go', colorGroup: 'special', price: 0, rent: [0], description: "Free innovation space" },
  
  // Red Group - Real Estate
  { id: 21, name: "Smart City Development", type: 'property', colorGroup: 'red', price: 2200, rent: [180, 900, 2500, 7000, 8750, 10500], upgradeCost: 1500, upgradeNames: ['Planning', 'Infrastructure', 'Smart Systems', 'Residents', 'Urban Empire'], description: "Future urban development" },
  { id: 22, name: "Market Disruption", type: 'event', colorGroup: 'special', price: 0, rent: [0], description: "Draw a disruption card" },
  { id: 23, name: "Commercial Real Estate", type: 'property', colorGroup: 'red', price: 2200, rent: [180, 900, 2500, 7000, 8750, 10500], upgradeCost: 1500, upgradeNames: ['Office Space', 'Tenant Mix', 'Premium Location', 'Corporate Campus', 'Real Estate Empire'], description: "Prime business properties" },
  { id: 24, name: "Luxury Hospitality", type: 'property', colorGroup: 'red', price: 2400, rent: [200, 1000, 3000, 9000, 11000, 12500], upgradeCost: 1500, upgradeNames: ['Boutique Hotel', 'Resort Chain', 'Luxury Brand', 'Global Presence', 'Hospitality Empire'], description: "Premium hospitality brand" },
  
  // Transportation - Shipping
  { id: 25, name: "Container Shipping", type: 'corporation', colorGroup: 'transportation', price: 2000, rent: [250, 500, 1000, 2000], description: "Global cargo transport" },
  
  // Yellow Group - Financial Services
  { id: 26, name: "Investment Bank", type: 'property', colorGroup: 'yellow', price: 2600, rent: [220, 1100, 3300, 10000, 12000, 14000], upgradeCost: 1500, upgradeNames: ['Trading Floor', 'Investment Team', 'Global Offices', 'Wealth Management', 'Financial Empire'], description: "Premier financial institution" },
  { id: 27, name: "Cryptocurrency Exchange", type: 'property', colorGroup: 'yellow', price: 2600, rent: [220, 1100, 3300, 10000, 12000, 14000], upgradeCost: 1500, upgradeNames: ['Trading Platform', 'Security Systems', 'DeFi Integration', 'Global Exchange', 'Crypto Empire'], description: "Digital asset trading" },
  { id: 28, name: "Tech Infrastructure", type: 'corporation', colorGroup: 'utilities', price: 1500, rent: [40, 100], description: "Cloud computing and data centers" },
  { id: 29, name: "Venture Capital Fund", type: 'property', colorGroup: 'yellow', price: 2800, rent: [240, 1200, 3600, 11000, 13000, 15000], upgradeCost: 1500, upgradeNames: ['Seed Fund', 'Growth Capital', 'Unicorn Investments', 'IPO Portfolio', 'VC Empire'], description: "Premier startup funding" },
  
  // Corner 4: Go to Jail - Regulatory Investigation
  { id: 30, name: "Regulatory Investigation", type: 'jail', colorGroup: 'special', price: 0, rent: [0], description: "Go directly to compliance review" },
  
  // Green Group - Healthcare & Biotech
  { id: 31, name: "Biotech Research", type: 'property', colorGroup: 'green', price: 3000, rent: [260, 1300, 3900, 12000, 14000, 17000], upgradeCost: 2000, upgradeNames: ['Research Lab', 'Clinical Trials', 'FDA Approval', 'Global Distribution', 'Pharma Empire'], description: "Cutting-edge medical research" },
  { id: 32, name: "Digital Health Platform", type: 'property', colorGroup: 'green', price: 3000, rent: [260, 1300, 3900, 12000, 14000, 17000], upgradeCost: 2000, upgradeNames: ['Telemedicine', 'AI Diagnostics', 'Wearable Tech', 'Global Health', 'MedTech Empire'], description: "Revolutionary healthcare technology" },
  { id: 33, name: "Innovation Opportunity", type: 'event', colorGroup: 'special', price: 0, rent: [0], description: "Draw an innovation card" },
  { id: 34, name: "Medical Device Manufacturing", type: 'property', colorGroup: 'green', price: 3200, rent: [280, 1500, 4500, 12500, 15000, 18000], upgradeCost: 2000, upgradeNames: ['R&D Lab', 'Manufacturing', 'Regulatory Approval', 'Global Sales', 'MedDevice Empire'], description: "Life-saving medical technology" },
  
  // Transportation - High-Speed Rail
  { id: 35, name: "High-Speed Rail", type: 'corporation', colorGroup: 'transportation', price: 2000, rent: [250, 500, 1000, 2000], description: "Future of ground transportation" },
  
  // Market Volatility
  { id: 36, name: "Market Volatility", type: 'event', colorGroup: 'special', price: 0, rent: [0], description: "Economic uncertainty ahead" },
  
  // Blue Group - Luxury & Premium
  { id: 37, name: "Luxury Fashion Empire", type: 'property', colorGroup: 'blue', price: 3500, rent: [350, 1750, 5000, 15000, 18500, 22000], upgradeCost: 2000, upgradeNames: ['Designer Collection', 'Flagship Store', 'Global Brand', 'Luxury Empire', 'Fashion Dynasty'], description: "Premium lifestyle brand" },
  
  // Luxury Tax
  { id: 38, name: "Wealth Tax", type: 'tax', colorGroup: 'special', price: 0, rent: [0], description: "Pay 10% of net worth" },
  
  { id: 39, name: "Tech Conglomerate", type: 'property', colorGroup: 'blue', price: 4000, rent: [500, 2000, 6000, 17000, 20000, 24000], upgradeCost: 2000, upgradeNames: ['Startup Acquisition', 'Product Suite', 'Global Dominance', 'Market Leadership', 'Tech Dynasty'], description: "Ultimate technology empire" }
];

// Event Cards (30 cards)
export const eventCards: EventCard[] = [
  // Opportunities (10 cards)
  { id: 'opp1', title: 'IPO Success', description: 'Your startup goes public! Collect 5,000 BC', moneyChange: 5000, type: 'opportunity' },
  { id: 'opp2', title: 'Viral Marketing Campaign', description: 'Your product goes viral! Collect 3,000 BC', moneyChange: 3000, type: 'opportunity' },
  { id: 'opp3', title: 'Patent Approved', description: 'Your innovation patent is approved! Collect 2,500 BC', moneyChange: 2500, type: 'opportunity' },
  { id: 'opp4', title: 'Government Contract', description: 'Secured a major government deal! Collect 4,000 BC', moneyChange: 4000, type: 'opportunity' },
  { id: 'opp5', title: 'Celebrity Endorsement', description: 'A celebrity endorses your product! Collect 2,000 BC', moneyChange: 2000, type: 'opportunity' },
  { id: 'opp6', title: 'Tech Innovation Award', description: 'Won industry recognition! Collect 1,500 BC', moneyChange: 1500, type: 'opportunity' },
  { id: 'opp7', title: 'Strategic Partnership', description: 'Formed alliance with tech giant! Collect 3,500 BC', moneyChange: 3500, type: 'opportunity' },
  { id: 'opp8', title: 'Acquisition Offer', description: 'Received buyout offer! Collect 6,000 BC', moneyChange: 6000, type: 'opportunity' },
  { id: 'opp9', title: 'International Expansion', description: 'Successfully entered new markets! Collect 2,800 BC', moneyChange: 2800, type: 'opportunity' },
  { id: 'opp10', title: 'AI Breakthrough', description: 'Your AI research pays off! Collect 4,500 BC', moneyChange: 4500, type: 'opportunity' },

  // Crises (10 cards)
  { id: 'crisis1', title: 'Supply Chain Disruption', description: 'Global shortage affects production. Pay 3,000 BC', moneyChange: -3000, type: 'crisis' },
  { id: 'crisis2', title: 'Cybersecurity Breach', description: 'Data breach requires costly remediation. Pay 2,500 BC', moneyChange: -2500, type: 'crisis' },
  { id: 'crisis3', title: 'Regulatory Fine', description: 'Compliance violation penalty. Pay 2,000 BC', moneyChange: -2000, type: 'crisis' },
  { id: 'crisis4', title: 'Product Recall', description: 'Safety concerns force expensive recall. Pay 4,000 BC', moneyChange: -4000, type: 'crisis' },
  { id: 'crisis5', title: 'Economic Recession', description: 'Market downturn affects revenue. Pay 1,500 BC', moneyChange: -1500, type: 'crisis' },
  { id: 'crisis6', title: 'Talent Shortage', description: 'High-cost recruitment needed. Pay 1,800 BC', moneyChange: -1800, type: 'crisis' },
  { id: 'crisis7', title: 'Technology Obsolescence', description: 'Your tech becomes outdated. Pay 3,500 BC', moneyChange: -3500, type: 'crisis' },
  { id: 'crisis8', title: 'Legal Settlement', description: 'Lawsuit settlement required. Pay 2,200 BC', moneyChange: -2200, type: 'crisis' },
  { id: 'crisis9', title: 'Currency Devaluation', description: 'Exchange rate losses. Pay 1,200 BC', moneyChange: -1200, type: 'crisis' },
  { id: 'crisis10', title: 'Natural Disaster', description: 'Facility damage from earthquake. Pay 2,800 BC', moneyChange: -2800, type: 'crisis' },

  // Market Events (5 cards)
  { id: 'market1', title: 'Bull Market Surge', description: 'Market optimism boosts valuations! Collect 3,000 BC', moneyChange: 3000, type: 'market' },
  { id: 'market2', title: 'Bear Market Crash', description: 'Market pessimism hurts portfolio. Pay 2,500 BC', moneyChange: -2500, type: 'market' },
  { id: 'market3', title: 'Sector Rotation', description: 'Your industry gains favor! Collect 2,000 BC', moneyChange: 2000, type: 'market' },
  { id: 'market4', title: 'Interest Rate Change', description: 'Fed policy affects business costs. Pay 1,000 BC', moneyChange: -1000, type: 'market' },
  { id: 'market5', title: 'Commodity Price Spike', description: 'Raw material costs increase. Pay 1,500 BC', moneyChange: -1500, type: 'market' },

  // Innovation Events (5 cards)
  { id: 'innov1', title: 'Quantum Computing Breakthrough', description: 'Tech revolution creates opportunities! Collect 5,500 BC', moneyChange: 5500, type: 'innovation' },
  { id: 'innov2', title: 'Green Energy Subsidy', description: 'Government supports clean tech! Collect 3,200 BC', moneyChange: 3200, type: 'innovation' },
  { id: 'innov3', title: 'Space Economy Boom', description: 'Commercial space ventures soar! Collect 4,200 BC', moneyChange: 4200, type: 'innovation' },
  { id: 'innov4', title: 'Biotech Regulatory Approval', description: 'Fast-track approval boosts sector! Collect 3,800 BC', moneyChange: 3800, type: 'innovation' },
  { id: 'innov5', title: 'Metaverse Platform Launch', description: 'Virtual worlds create new revenue! Collect 2,700 BC', moneyChange: 2700, type: 'innovation' }
];

// Player Tokens with abilities
export const playerTokens: PlayerToken[] = [
  { 
    id: 'laptop', 
    name: 'Laptop', 
    icon: '💻', 
    description: 'Digital Entrepreneur',
    ability: '+10% returns on tech properties'
  },
  { 
    id: 'briefcase', 
    name: 'Briefcase', 
    icon: '💼', 
    description: 'Corporate Executive',
    ability: '+500 BC when passing GO'
  },
  { 
    id: 'electric_car', 
    name: 'Electric Car', 
    icon: '🚗', 
    description: 'Green Innovator',
    ability: 'Half price on transportation spaces'
  },
  { 
    id: 'rocket', 
    name: 'Rocket', 
    icon: '🚀', 
    description: 'Space Pioneer',
    ability: 'Double movement on rolls of 6+'
  },
  { 
    id: 'diamond', 
    name: 'Diamond', 
    icon: '💎', 
    description: 'Luxury Mogul',
    ability: '+20% rent on premium properties'
  },
  { 
    id: 'robot', 
    name: 'Robot', 
    icon: '🤖', 
    description: 'AI Specialist',
    ability: 'Immune to technology crisis cards'
  },
  { 
    id: 'globe', 
    name: 'Globe', 
    icon: '🌍', 
    description: 'Global Trader',
    ability: 'No penalties for international events'
  },
  { 
    id: 'chart', 
    name: 'Chart', 
    icon: '📈', 
    description: 'Financial Analyst',
    ability: 'Preview next event card'
  }
];

// Currency system: Business Credits (BC)
export const currencySystem = {
  name: 'Business Credits',
  symbol: 'BC',
  denominations: [1, 5, 10, 20, 50, 100, 500, 1000, 5000],
  startingAmount: 15000,
  salaryAmount: 2000,
  colors: {
    1: '#8B4513',      // Brown
    5: '#FF69B4',      // Pink  
    10: '#87CEEB',     // Sky Blue
    20: '#90EE90',     // Light Green
    50: '#FFD700',     // Gold
    100: '#FF6347',    // Tomato
    500: '#9370DB',    // Medium Purple
    1000: '#FF4500',   // Orange Red
    5000: '#32CD32'    // Lime Green
  }
};

// Game balance and rules
export const gameRules = {
  startingMoney: 15000,
  salaryAmount: 2000,
  maxPlayers: 6,
  maxTurns: 100,
  bankruptcyThreshold: 0,
  jailFine: 500,
  taxAmount: 2000,
  wealthTaxRate: 0.1,
  propertyDevelopmentLimit: 5,
  monopolyRentMultiplier: 2,
  utilityBaseRent: 40,
  utilityMultipliedRent: 100,
  transportationBaseRent: 250
};
