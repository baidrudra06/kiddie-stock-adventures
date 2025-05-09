
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface StockChartProps {
  stockId: string;
  color: string;
  animate?: boolean;
}

const generateChartData = (stockId: string, days = 30) => {
  // Generate pseudo-random data that looks like stock price movements
  // We'll use the stockId as a seed to get consistent results for the same stock
  const seed = Array.from(stockId).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const trend = seed % 3 === 0 ? 1 : seed % 3 === 1 ? -1 : 0; // up, down, or sideways trend
  const volatility = (seed % 10) / 10 + 0.05; // between 0.05 and 0.95
  
  let value = 100 + seed % 50; // starting value between 100 and 150
  const data = [];
  
  for (let i = 0; i < days; i++) {
    // Add some randomness and trend
    const change = (Math.random() - 0.5) * volatility * 10 + trend * 0.5;
    value = Math.max(value + change, 1); // Ensure value doesn't go below 1
    
    data.push({
      date: new Date(Date.now() - (days - i) * 86400000).toISOString().slice(0, 10),
      value: parseFloat(value.toFixed(2)),
    });
  }
  
  return data;
};

// Generate more realistic dynamic movement for stocks
const updateStockPrices = (data: {date: string; value: number}[]) => {
  if (!data || data.length === 0) return [];
  
  const lastPoint = { ...data[data.length - 1] };
  const momentum = Math.random() > 0.5 ? 1 : -1;
  const volatility = 0.5 + Math.random() * 1.5;
  
  // Drop first point, add new point
  const newData = [...data.slice(1)];
  
  // Calculate new value based on previous with some randomness
  let newValue = lastPoint.value + (momentum * Math.random() * volatility);
  newValue = Math.max(newValue, 1); // Ensure value doesn't go below 1
  
  // Add new point with current date
  newData.push({
    date: new Date().toISOString().slice(0, 10),
    value: parseFloat(newValue.toFixed(2))
  });
  
  return newData;
};

const StockChart = ({ stockId, color, animate = false }: StockChartProps) => {
  const [data, setData] = useState<{ date: string; value: number }[]>([]);
  
  useEffect(() => {
    setData(generateChartData(stockId));
    
    // If animate is true, update the chart data every few seconds
    let interval: ReturnType<typeof setInterval>;
    if (animate) {
      interval = setInterval(() => {
        setData(prevData => updateStockPrices(prevData));
      }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stockId, animate]);
  
  const startValue = data[0]?.value || 0;
  const endValue = data[data.length - 1]?.value || 0;
  const isPositive = endValue >= startValue;
  
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10 }} 
            tickFormatter={(value) => value.slice(5)} // Just show MM-DD
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
          <Tooltip 
            contentStyle={{ fontSize: '12px' }}
            formatter={(value) => [`$${value}`, 'Price']}
            labelFormatter={(label) => `Date: ${label}`} 
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={isPositive ? "#4ade80" : "#f87171"} 
            fill={`${color}40`} // 40 is hex for 25% opacity
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
