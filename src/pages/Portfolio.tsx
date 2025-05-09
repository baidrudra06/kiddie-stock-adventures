
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
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import TransactionTable from "@/components/TransactionTable";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";

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
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-500">Cash Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${cash.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-500">Stocks Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalPortfolioValue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="holdings">
          <TabsList className="mb-6">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
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
        </Tabs>
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Portfolio;
