
import { stocksData, getStockById } from "@/data/stocksData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useGameContext } from "@/contexts/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import TransactionTable from "@/components/TransactionTable";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import PortfolioAchievements from "@/components/PortfolioAchievements";
import LiveStockUpdates from "@/components/LiveStockUpdates";
import StockChart from "@/components/StockChart";

const Portfolio = () => {
  const navigate = useNavigate();
  const { portfolio, getPortfolioValue, cash, transactions } = useGameContext();
  
  const totalPortfolioValue = getPortfolioValue();
  const totalValue = cash + totalPortfolioValue;
  
  const pieData = portfolio.map((item) => {
    const stock = getStockById(item.stockId);
    return {
      name: stock?.name || "Unknown",
      value: stock ? stock.price * item.shares : 0,
      color: stock?.color || "#888888",
    };
  });
  
  // Add cash to pie chart if there is any
  if (cash > 0) {
    pieData.push({
      name: "Cash",
      value: cash,
      color: "#94a3b8",
    });
  }

  // Generate historical portfolio data for chart
  const generatePortfolioHistory = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Generate a somewhat realistic portfolio value pattern
      // Starting from 70% of current value and growing to current
      const baseValue = totalValue * 0.7;
      const growthFactor = i === 0 ? 1 : (0.7 + ((30 - i) / 30) * 0.3);
      
      // Add some randomness
      const randomFactor = 0.98 + Math.random() * 0.04; // Between 0.98 and 1.02
      
      const value = baseValue + (totalValue - baseValue) * growthFactor * randomFactor;
      
      data.push({
        date: date.toISOString().slice(0, 10),
        value: parseFloat(value.toFixed(2)),
      });
    }
    
    return data;
  };

  const portfolioHistory = generatePortfolioHistory();
  const startValue = portfolioHistory[0]?.value || 0;
  const endValue = portfolioHistory[portfolioHistory.length - 1]?.value || 0;
  const portfolioGrowth = ((endValue - startValue) / startValue) * 100;
  const isPositiveGrowth = portfolioGrowth >= 0;

  // Get top performing stocks
  const topStocks = [...portfolio]
    .map(item => {
      const stock = getStockById(item.stockId);
      if (!stock) return null;
      
      const currentValue = stock.price * item.shares;
      const costBasis = item.averageCost * item.shares;
      const profit = currentValue - costBasis;
      const percentageReturn = (profit / costBasis) * 100;
      
      return {
        id: stock.id,
        name: stock.name,
        ticker: stock.ticker,
        logoUrl: stock.logoUrl,
        color: stock.color,
        percentageReturn,
        profit,
        shares: item.shares
      };
    })
    .filter(Boolean)
    .sort((a, b) => b!.percentageReturn - a!.percentageReturn);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <h1 className="text-3xl font-bold mb-6">Your Portfolio</h1>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-500">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalValue.toFixed(2)}</div>
              {isPositiveGrowth ? (
                <div className="flex items-center text-green-500 mt-1">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>{portfolioGrowth.toFixed(2)}% (30d)</span>
                </div>
              ) : (
                <div className="flex items-center text-red-500 mt-1">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span>{Math.abs(portfolioGrowth).toFixed(2)}% (30d)</span>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-500">Cash Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${cash.toFixed(2)}</div>
              <div className="text-sm text-gray-500 mt-1">
                {((cash / totalValue) * 100).toFixed(1)}% of portfolio
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-500">Stocks Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalPortfolioValue.toFixed(2)}</div>
              <div className="text-sm text-gray-500 mt-1">
                Across {portfolio.length} different stocks
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={portfolioHistory}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => value.slice(5)}
                      />
                      <YAxis 
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => `$${value}`} 
                      />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toFixed(2)}`, "Value"]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value"
                        stroke="#8884d8" 
                        fill="#8884d840" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <LiveStockUpdates />
          </div>
        </div>
        
        <Tabs defaultValue="holdings" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="holdings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {portfolio.length > 0 || cash > 0 ? (
                    <>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              innerRadius={40}
                              paddingAngle={2}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value) => [`$${Number(value).toFixed(2)}`, "Value"]} 
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Asset</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                              <TableHead className="text-right">Value</TableHead>
                              <TableHead className="text-right">% of Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {portfolio.map((item) => {
                              const stock = getStockById(item.stockId);
                              if (!stock) return null;
                              
                              const stockValue = stock.price * item.shares;
                              const percentage = (stockValue / totalValue) * 100;
                              
                              return (
                                <TableRow key={item.stockId}>
                                  <TableCell className="font-medium">
                                    <div 
                                      className="flex items-center gap-2 cursor-pointer"
                                      onClick={() => navigate(`/trade/${item.stockId}`)}
                                    >
                                      <span className="text-lg">{stock.logoUrl}</span>
                                      <span className="hover:underline">{stock.name}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {item.shares} shares
                                  </TableCell>
                                  <TableCell className="text-right">
                                    ${stockValue.toFixed(2)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {percentage.toFixed(1)}%
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                            
                            {/* Cash row */}
                            <TableRow>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">💰</span>
                                  <span>Cash</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                -
                              </TableCell>
                              <TableCell className="text-right">
                                ${cash.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right">
                                {((cash / totalValue) * 100).toFixed(1)}%
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2 py-12 text-center">
                      <div className="text-6xl mb-4 animate-pulse-slow">🏦</div>
                      <h3 className="text-xl font-bold mb-2">No Stocks Yet</h3>
                      <p className="text-gray-500 mb-6">
                        Start building your portfolio by buying some stocks!
                      </p>
                      <Button onClick={() => navigate("/trade")}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Go to Trading
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionTable transactions={transactions} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  {topStocks.length > 0 ? (
                    <div className="space-y-4">
                      {topStocks.slice(0, 5).map((stock) => (
                        <div 
                          key={stock!.id}
                          className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-slate-50"
                          onClick={() => navigate(`/trade/${stock!.id}`)}
                        >
                          <div className="flex items-center">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                              style={{ backgroundColor: `${stock!.color}20` }}
                            >
                              <span className="text-xl">{stock!.logoUrl}</span>
                            </div>
                            <div>
                              <div className="font-medium">{stock!.name}</div>
                              <div className="text-sm text-gray-500">{stock!.ticker} • {stock!.shares} shares</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${stock!.percentageReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {stock!.percentageReturn >= 0 ? '+' : ''}{stock!.percentageReturn.toFixed(2)}%
                            </div>
                            <div className="text-sm text-gray-500">
                              ${stock!.profit.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Buy some stocks to see your top performers!
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Industry Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  {portfolio.length > 0 ? (
                    <div className="h-[300px]">
                      {(() => {
                        // Calculate industry allocation
                        const industryData = portfolio.reduce((acc, item) => {
                          const stock = getStockById(item.stockId);
                          if (!stock) return acc;
                          
                          const industry = stock.industry;
                          const value = stock.price * item.shares;
                          
                          if (acc[industry]) {
                            acc[industry] += value;
                          } else {
                            acc[industry] = value;
                          }
                          
                          return acc;
                        }, {} as Record<string, number>);
                        
                        const barData = Object.entries(industryData).map(([industry, value]) => ({
                          industry,
                          value
                        })).sort((a, b) => b.value - a.value);
                        
                        return (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={barData}
                              layout="vertical"
                              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                              <YAxis type="category" dataKey="industry" width={120} />
                              <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, "Value"]} />
                              <Legend />
                              <Bar dataKey="value" name="Value" fill="#8884d8" />
                            </BarChart>
                          </ResponsiveContainer>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Buy some stocks to see your industry allocation!
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <PortfolioAchievements />
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Portfolio;
