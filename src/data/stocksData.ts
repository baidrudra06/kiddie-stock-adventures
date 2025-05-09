
import { Stock } from '../types';

export const stocksData: Stock[] = [
  {
    id: '1',
    name: 'Fruit Company',
    ticker: 'FRUT',
    price: 150.75,
    change: 2.5,
    description: 'A company that makes delicious fruit gadgets and software.',
    industry: 'Technology',
    color: '#4287f5',
    logoUrl: '🍎'
  },
  {
    id: '2',
    name: 'Soda Pop',
    ticker: 'SODA',
    price: 55.25,
    change: -1.2,
    description: 'The world\'s favorite fizzy drink maker.',
    industry: 'Consumer Goods',
    color: '#f54242',
    logoUrl: '🥤'
  },
  {
    id: '3',
    name: 'Toy Blocks',
    ticker: 'BLOX',
    price: 85.90,
    change: 3.7,
    description: 'Creator of the most popular building blocks for kids.',
    industry: 'Entertainment',
    color: '#f5d442',
    logoUrl: '🧩'
  },
  {
    id: '4',
    name: 'Ice Cream Co',
    ticker: 'ICEC',
    price: 32.10,
    change: 0.8,
    description: 'Delicious ice cream in hundreds of flavors.',
    industry: 'Food',
    color: '#42f5e3',
    logoUrl: '🍦'
  },
  {
    id: '5',
    name: 'Rocket Ships',
    ticker: 'RCKT',
    price: 220.45,
    change: 5.2,
    description: 'Building rockets to explore space.',
    industry: 'Aerospace',
    color: '#9d42f5',
    logoUrl: '🚀'
  }
];

export const getStockById = (id: string): Stock | undefined => {
  return stocksData.find(stock => stock.id === id);
};
