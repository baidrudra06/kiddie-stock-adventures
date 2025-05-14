
import { Stock, StockNews } from "@/types";
import { stocksData } from "@/data/stocksData";

// News templates with placeholders
const positiveTemplates = [
  "{company} reports record profits in Q2",
  "{company} stock surges after new product announcement",
  "Analysts upgrade {company} to 'buy' rating",
  "{company} expands into new markets, investors optimistic",
  "{company} announces strategic partnership with major player",
  "{company} exceeds quarterly expectations, shares up",
  "Insider reports suggest {company} to announce dividend increase",
  "{company} innovation praised by industry experts",
  "{company} restructuring leads to positive outlook",
  "New CEO appointment boosts confidence in {company}"
];

const negativeTemplates = [
  "{company} misses earnings targets, stock drops",
  "Regulatory concerns affect {company} market position",
  "{company} faces supply chain issues, warns of delays",
  "Analysts downgrade {company} amid competitive pressures",
  "{company} recalls product, shares tumble",
  "Profit warning issued by {company}, investors concerned",
  "{company} cuts growth forecast for upcoming quarter",
  "Lawsuit filed against {company}, legal costs expected to rise",
  "{company} loses key executive, succession plan unclear",
  "{company} struggles with rising costs, margins squeezed"
];

const neutralTemplates = [
  "{company} announces leadership restructuring",
  "Industry report mentions {company} among stable performers",
  "{company} maintains market position despite sector volatility",
  "No significant changes reported for {company} this quarter",
  "{company} to present at upcoming investor conference",
  "Annual shareholder meeting scheduled for {company}",
  "{company} releases sustainability report",
  "Market awaits {company}'s response to industry trends",
  "{company} neither gains nor loses ground in latest rankings",
  "{company} remains consistent amid market fluctuations"
];

// Generate a single news item for a stock
const generateStockNews = (stock: Stock, forceImpact?: 'positive' | 'negative' | 'neutral'): StockNews => {
  // Determine impact based on stock change or forced value
  const impact = forceImpact || (stock.change > 1 ? 'positive' : stock.change < -1 ? 'negative' : 'neutral');
  
  // Select template based on impact
  let templates;
  switch (impact) {
    case 'positive':
      templates = positiveTemplates;
      break;
    case 'negative':
      templates = negativeTemplates;
      break;
    default:
      templates = neutralTemplates;
  }
  
  // Randomly select a template
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Fill in the company name
  const title = template.replace("{company}", stock.name);
  
  // Generate more detailed content
  const content = `${title}. ${generateAdditionalDetails(stock, impact)}`;
  
  return {
    id: `news-${stock.id}-${Date.now()}`,
    title,
    content,
    date: new Date().toISOString(),
    stockId: stock.id,
    impact
  };
};

// Generate additional details for news content
const generateAdditionalDetails = (stock: Stock, impact: 'positive' | 'negative' | 'neutral'): string => {
  if (impact === 'positive') {
    return `Industry analysts are optimistic about ${stock.name}'s performance in the ${stock.industry} sector. Market watchers suggest that young investors should keep an eye on this stock for potential growth opportunities.`;
  } else if (impact === 'negative') {
    return `This development might create some challenges for ${stock.name} in the competitive ${stock.industry} market. Young investors are advised to monitor the situation closely before making investment decisions.`;
  } else {
    return `${stock.name} continues to operate steadily in the ${stock.industry} sector. Educators suggest this provides a good learning opportunity for young investors to understand market stability.`;
  }
};

// Generate a batch of news items for the news channel
export const generateDailyNews = (): StockNews[] => {
  // Select 5-10 random stocks to generate news for
  const newsCount = Math.floor(Math.random() * 6) + 5; // 5 to 10 news items
  const selectedStocks = [...stocksData]
    .sort(() => Math.random() - 0.5)
    .slice(0, newsCount);
  
  // Generate news for each selected stock
  const newsItems: StockNews[] = selectedStocks.map(stock => generateStockNews(stock));
  
  // Add 1-3 general market news items (not tied to specific stocks)
  const generalNewsCount = Math.floor(Math.random() * 3) + 1;
  
  const generalImpacts: Array<'positive' | 'negative' | 'neutral'> = ['positive', 'negative', 'neutral'];
  
  for (let i = 0; i < generalNewsCount; i++) {
    const randomImpact = generalImpacts[Math.floor(Math.random() * generalImpacts.length)];
    
    let title = '';
    let content = '';
    
    if (randomImpact === 'positive') {
      title = "Market shows positive signs as economy strengthens";
      content = "Economic indicators suggest a strong outlook for the market, with multiple sectors showing growth potential. Young investors are encouraged to learn about diversifying their portfolios.";
    } else if (randomImpact === 'negative') {
      title = "Markets cautious amid economic uncertainty";
      content = "Investors are exercising caution as economic data presents a mixed picture. This provides an educational opportunity to understand how markets react to uncertainty.";
    } else {
      title = "Market remains stable as traders await new data";
      content = "Trading volumes remain average as investors await new economic reports. This stability demonstrates the importance of patience in investment strategies.";
    }
    
    newsItems.push({
      id: `general-news-${i}-${Date.now()}`,
      title,
      content,
      date: new Date().toISOString(),
      impact: randomImpact
    });
  }
  
  // Sort all news by impact (positive first, then neutral, then negative)
  return newsItems.sort((a, b) => {
    const impactOrder = { positive: 0, neutral: 1, negative: 2 };
    return impactOrder[a.impact] - impactOrder[b.impact];
  });
};
