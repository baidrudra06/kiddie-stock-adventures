import { LessonContent } from '../types';

export const lessonData: LessonContent[] = [
  {
    id: '1',
    title: 'What is Money?',
    description: 'Learn the basics about money and why we use it.',
    content: `
      <h1>What is Money?</h1>
      <p>Money is something we use to buy things we need and want.</p>
      <p>Long ago, people traded things like shells or animals to get what they needed. Now, we use coins and paper money.</p>
      <p>We can also save money in a bank to use later!</p>
    `,
    image: '💰',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q1-1',
        question: 'What do we use money for?',
        options: [
          'To play games with',
          'To buy things we need and want',
          'To make paper airplanes',
          'To give to animals'
        ],
        correctAnswer: 1
      },
      {
        id: 'q1-2',
        question: 'Where can we keep our money safe?',
        options: [
          'Under our pillow',
          'In a toy box',
          'In a bank',
          'In our pocket'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '2',
    title: 'What is a Stock?',
    description: 'Learn about stocks and why companies sell them.',
    content: `
      <h1>What is a Stock?</h1>
      <p>A stock is a tiny piece of a company that you can buy.</p>
      <p>When you own a stock, you own a small part of that company!</p>
      <p>If the company does well and makes money, your stock might be worth more later.</p>
      <p>If the company doesn't do well, your stock might be worth less.</p>
    `,
    image: '📈',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q2-1',
        question: 'What is a stock?',
        options: [
          'A kind of soup',
          'A small piece of a company you can buy',
          'A type of car',
          'A game you play with friends'
        ],
        correctAnswer: 1
      },
      {
        id: 'q2-2',
        question: 'What happens if a company does well?',
        options: [
          'Your stock might be worth less',
          'Nothing happens',
          'Your stock might be worth more',
          'The company gives you candy'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '3',
    title: 'Buying and Selling Stocks',
    description: 'Learn how to buy and sell stocks.',
    content: `
      <h1>Buying and Selling Stocks</h1>
      <p>You can buy stocks when you think a company will do well.</p>
      <p>You can sell stocks when you think you've made enough money, or if you think the company might not do as well anymore.</p>
      <p>The goal is to "buy low and sell high" - that means buying stocks at a low price and selling them later at a higher price!</p>
    `,
    image: '🔄',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q3-1',
        question: 'When should you buy stocks?',
        options: [
          'When you think a company will do poorly',
          'When you think a company will do well',
          'Only on Mondays',
          'When it\'s raining outside'
        ],
        correctAnswer: 1
      },
      {
        id: 'q3-2',
        question: 'What does "buy low, sell high" mean?',
        options: [
          'Buy stocks when you feel low, sell when you feel happy',
          'Buy stocks when they cost a little, sell when they cost a lot',
          'Buy from short people, sell to tall people',
          'Nothing, it\'s just a saying'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '4',
    title: 'What is a Company?',
    description: 'Learn what companies are and how they work.',
    content: `
      <h1>What is a Company?</h1>
      <p>A company is a group of people who work together to make or sell things.</p>
      <p>Companies make products like toys, food, or clothes. They also provide services like delivering packages or fixing computers.</p>
      <p>When a company makes money by selling their products or services, they make a profit!</p>
    `,
    image: '🏢',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q4-1',
        question: 'What is a company?',
        options: [
          'A place where we go to school',
          'A group of people who work together to make or sell things',
          'A type of food',
          'A kind of animal'
        ],
        correctAnswer: 1
      },
      {
        id: 'q4-2',
        question: 'What is profit?',
        options: [
          'When a company loses money',
          'When a company changes its name',
          'Money a company makes after selling products or services',
          'When a company hires new workers'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '5',
    title: 'The Stock Market',
    description: 'Learn what the stock market is and how it works.',
    content: `
      <h1>The Stock Market</h1>
      <p>The stock market is like a big store where people buy and sell stocks.</p>
      <p>Instead of buying toys or food, people buy small pieces (shares) of companies.</p>
      <p>The stock market helps companies get money to grow their business, and it helps people invest their money to hopefully earn more later.</p>
    `,
    image: '🏛️',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q5-1',
        question: 'What is the stock market?',
        options: [
          'A place to buy groceries',
          'A market where people sell old toys',
          'A place where people buy and sell stocks',
          'A place where companies go shopping'
        ],
        correctAnswer: 2
      },
      {
        id: 'q5-2',
        question: 'How does the stock market help companies?',
        options: [
          'It gives them free products',
          'It helps them get money to grow',
          'It teaches them how to make toys',
          'It cleans their offices'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '6',
    title: 'What is Investing?',
    description: 'Learn about investing and why people do it.',
    content: `
      <h1>What is Investing?</h1>
      <p>Investing means using your money to buy something that you hope will be worth more in the future.</p>
      <p>When you invest in stocks, you're buying parts of companies that you think will grow and become more valuable.</p>
      <p>Investing is a way to make your money grow over time, but it also comes with risks.</p>
    `,
    image: '🌱',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q6-1',
        question: 'What does investing mean?',
        options: [
          'Spending all your money on toys',
          'Putting money in a piggy bank',
          'Using money to buy something you hope will be worth more later',
          'Giving money to friends'
        ],
        correctAnswer: 2
      },
      {
        id: 'q6-2',
        question: 'Why do people invest in stocks?',
        options: [
          'To help the stock market',
          'To make their money grow over time',
          'Because they have too much money',
          'To get free company products'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '7',
    title: 'What is Risk?',
    description: 'Learn about investment risk and how to think about it.',
    content: `
      <h1>What is Risk?</h1>
      <p>When we invest, there's always a chance we might lose some money. This chance is called "risk."</p>
      <p>Some investments have higher risk, which means there's a bigger chance you might lose money.</p>
      <p>But higher risk investments might also give you more money if they do well!</p>
      <p>It's important to think about how much risk you're comfortable with when investing.</p>
    `,
    image: '⚠️',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q7-1',
        question: 'What is risk in investing?',
        options: [
          'The chance that you might lose some money',
          'The color of the stock certificate',
          'The name of the company you invest in',
          'How old the company is'
        ],
        correctAnswer: 0
      },
      {
        id: 'q7-2',
        question: 'What often happens with higher risk investments?',
        options: [
          'They always lose money',
          'They might lose money, but they might also make more money',
          'They never change in value',
          'They are always safe'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '8',
    title: 'Diversification',
    description: 'Learn why it\'s important not to put all your eggs in one basket.',
    content: `
      <h1>Diversification: Don't Put All Your Eggs in One Basket</h1>
      <p>Imagine you had a basket of eggs and you dropped it. All your eggs would break!</p>
      <p>But if you had several baskets with a few eggs in each, dropping one basket wouldn't be as bad.</p>
      <p>Diversification in investing means buying different types of investments instead of putting all your money in just one.</p>
      <p>If one investment doesn't do well, the others might still be okay!</p>
    `,
    image: '🧺',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q8-1',
        question: 'What is diversification?',
        options: [
          'Buying only one type of stock',
          'Spending all your money at once',
          'Spreading your money across different investments',
          'Saving all your money in a piggy bank'
        ],
        correctAnswer: 2
      },
      {
        id: 'q8-2',
        question: 'Why is diversification important?',
        options: [
          'It makes investing more complicated',
          'It helps protect your money if some investments don\'t do well',
          'It guarantees you\'ll make more money',
          'It means you need less money to invest'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '9',
    title: 'Long-Term Investing',
    description: 'Learn why time is your friend when investing.',
    content: `
      <h1>Long-Term Investing</h1>
      <p>Investing for a long time (like many years) is often better than trying to buy and sell quickly.</p>
      <p>The stock market goes up and down every day, but over many years, it has historically grown.</p>
      <p>When you invest for a long time, you give your money more chance to grow!</p>
      <p>It's like planting a tree - it takes time to grow big and strong.</p>
    `,
    image: '🌳',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q9-1',
        question: 'What is long-term investing?',
        options: [
          'Buying and selling stocks every day',
          'Keeping your investments for many years',
          'Only investing a small amount of money',
          'Investing in old companies'
        ],
        correctAnswer: 1
      },
      {
        id: 'q9-2',
        question: 'Why is long-term investing often good?',
        options: [
          'Because the stock market always goes up every day',
          'Because it\'s easier than short-term investing',
          'Because it gives your money more time to grow',
          'Because you don\'t need to think about your money'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '10',
    title: 'Stock Prices',
    description: 'Learn what makes stock prices go up and down.',
    content: `
      <h1>Stock Prices: Up and Down</h1>
      <p>Stock prices change all the time, sometimes many times in one day!</p>
      <p>Prices go up when more people want to buy a stock than sell it.</p>
      <p>Prices go down when more people want to sell a stock than buy it.</p>
      <p>Many things can affect stock prices, like how well the company is doing, news about the company, or what's happening in the world.</p>
    `,
    image: '📊',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q10-1',
        question: 'When do stock prices go up?',
        options: [
          'When the company builds a new office',
          'When more people want to buy than sell',
          'When the stock market closes',
          'When the company changes its name'
        ],
        correctAnswer: 1
      },
      {
        id: 'q10-2',
        question: 'What can affect stock prices?',
        options: [
          'Only the color of the company logo',
          'Only the day of the week',
          'Many things, like company performance and news',
          'Only the stock market opening hours'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '11',
    title: 'What is a Portfolio?',
    description: 'Learn about investment portfolios and how to build one.',
    content: `
      <h1>What is a Portfolio?</h1>
      <p>A portfolio is a collection of all the investments you own.</p>
      <p>Think of it like a digital backpack that holds all your stocks and other investments.</p>
      <p>A good portfolio usually has different types of investments (diversification).</p>
      <p>Keeping track of your portfolio helps you see how your investments are doing.</p>
    `,
    image: '📁',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q11-1',
        question: 'What is an investment portfolio?',
        options: [
          'A special kind of wallet',
          'A collection of all the investments you own',
          'A type of stock',
          'A place where companies work'
        ],
        correctAnswer: 1
      },
      {
        id: 'q11-2',
        question: 'What should a good portfolio have?',
        options: [
          'Only one type of stock',
          'Only investments that are doing well',
          'Different types of investments',
          'At least 100 different stocks'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '12',
    title: 'Saving vs. Investing',
    description: 'Learn the difference between saving and investing.',
    content: `
      <h1>Saving vs. Investing</h1>
      <p>Saving means keeping your money safe, usually in a bank account.</p>
      <p>When you save money, it's very safe, but it doesn't grow much.</p>
      <p>Investing means using your money to buy things like stocks that might grow in value.</p>
      <p>When you invest, your money might grow more than savings, but there's also a risk of losing some.</p>
      <p>It's good to both save AND invest money!</p>
    `,
    image: '💵',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q12-1',
        question: 'What is saving?',
        options: [
          'Buying stocks',
          'Spending money on things you want',
          'Keeping money safe, usually in a bank account',
          'Giving money to friends'
        ],
        correctAnswer: 2
      },
      {
        id: 'q12-2',
        question: 'How is investing different from saving?',
        options: [
          'Investing is always safer than saving',
          'With investing, your money might grow more but there\'s more risk',
          'Saving is only for adults',
          'Investing is only for buying toys'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '13',
    title: 'What are Dividends?',
    description: 'Learn how some companies share profits with investors.',
    content: `
      <h1>What are Dividends?</h1>
      <p>Some companies share part of their profits with people who own their stock.</p>
      <p>These payments are called "dividends."</p>
      <p>Not all companies pay dividends - some use their profits to grow the company instead.</p>
      <p>Dividends are like a thank you gift for investing in the company!</p>
    `,
    image: '💸',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q13-1',
        question: 'What are dividends?',
        options: [
          'New stocks a company gives you',
          'Payments companies give to shareholders from their profits',
          'Money you pay to buy stocks',
          'The name of the stock market building'
        ],
        correctAnswer: 1
      },
      {
        id: 'q13-2',
        question: 'Do all companies pay dividends?',
        options: [
          'Yes, every company must pay dividends',
          'No, some use their profits to grow instead',
          'Only the oldest companies pay dividends',
          'Only the smallest companies pay dividends'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '14',
    title: 'Bull and Bear Markets',
    description: 'Learn about market trends and what these animal terms mean.',
    content: `
      <h1>Bull and Bear Markets</h1>
      <p>In the stock market, we use animal names to describe how the market is doing!</p>
      <p>A "bull market" is when stock prices are going up for a long time. We call it that because bulls charge upward with their horns.</p>
      <p>A "bear market" is when stock prices are falling for a long time. We call it that because bears swipe downward with their paws.</p>
      <p>Markets can't always be bulls - sometimes they need to be bears for a while too!</p>
    `,
    image: '🐂',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q14-1',
        question: 'What is a bull market?',
        options: [
          'When the stock market is closed',
          'When stock prices are going up for a long time',
          'When animals are allowed on the trading floor',
          'When stock prices stay the same'
        ],
        correctAnswer: 1
      },
      {
        id: 'q14-2',
        question: 'What is a bear market?',
        options: [
          'When stock prices are falling for a long time',
          'When the market is only open in winter',
          'When new companies join the stock market',
          'When people bring their pets to the stock exchange'
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: '15',
    title: 'What is Compound Interest?',
    description: 'Learn about the magic of compound interest.',
    content: `
      <h1>Compound Interest: Money Magic!</h1>
      <p>Compound interest is like magic for your money. It helps your savings grow faster and faster over time!</p>
      <p>Here's how it works: when your money earns interest, that new money also starts earning interest.</p>
      <p>It's like a snowball rolling downhill, getting bigger and bigger.</p>
      <p>The longer you leave your money to grow, the more powerful compound interest becomes!</p>
    `,
    image: '✨',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q15-1',
        question: 'What is compound interest?',
        options: [
          'Interest you pay to the bank',
          'When you earn interest on both your original money AND the interest you\'ve already earned',
          'A type of bank account',
          'Interest that stays the same every year'
        ],
        correctAnswer: 1
      },
      {
        id: 'q15-2',
        question: 'Why is compound interest described as "magic" for your money?',
        options: [
          'Because it makes your money disappear',
          'Because only magicians can get it',
          'Because it helps your money grow faster and faster over time',
          'Because it happens instantly'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '16',
    title: 'How to Read Stock Symbols',
    description: 'Learn what stock ticker symbols are and how to read them.',
    content: `
      <h1>Stock Symbols: The Stock Market's Secret Code</h1>
      <p>Every company on the stock market has a short code name called a "ticker symbol."</p>
      <p>For example, a fruit company might have the symbol "FRUT" instead of writing out the full company name.</p>
      <p>Ticker symbols make it easier and faster to keep track of stocks.</p>
      <p>They're like nicknames for companies in the stock market world!</p>
    `,
    image: '🔤',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q16-1',
        question: 'What is a stock ticker symbol?',
        options: [
          'The price of a stock',
          'A short code name for a company on the stock market',
          'The person who sells stocks',
          'The company\'s secret password'
        ],
        correctAnswer: 1
      },
      {
        id: 'q16-2',
        question: 'Why do we use ticker symbols?',
        options: [
          'To make stock names more confusing',
          'Because full company names are secret',
          'To make it easier and faster to keep track of stocks',
          'Because computers can\'t read full company names'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '17',
    title: 'What are Stock Exchanges?',
    description: 'Learn about the marketplaces where stocks are bought and sold.',
    content: `
      <h1>Stock Exchanges: The Marketplaces for Stocks</h1>
      <p>Stock exchanges are special marketplaces where people buy and sell stocks.</p>
      <p>They're like shopping malls, but instead of stores selling clothes or toys, there are companies selling pieces of themselves (stocks).</p>
      <p>Some famous stock exchanges are the New York Stock Exchange (NYSE) and NASDAQ.</p>
      <p>Today, most buying and selling happens on computers instead of people shouting on a trading floor!</p>
    `,
    image: '🏢',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q17-1',
        question: 'What is a stock exchange?',
        options: [
          'A place where you trade baseball cards',
          'A special marketplace where people buy and sell stocks',
          'A store that sells stock certificates',
          'A place where companies make products'
        ],
        correctAnswer: 1
      },
      {
        id: 'q17-2',
        question: 'How do most people buy and sell stocks today?',
        options: [
          'By shouting loudly on a trading floor',
          'By calling a stock broker on the telephone',
          'Using computers and the internet',
          'By mailing letters to companies'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '20',
    title: 'How to Make a Budget',
    description: 'Learn how to plan what to do with your money.',
    content: `
      <h1>Budgeting: Your Money Plan</h1>
      <p>A budget is a plan for your money. It helps you decide how to spend, save, and invest.</p>
      <p>First, figure out how much money you have coming in.</p>
      <p>Then, plan how much you'll spend on needs (like food), wants (like toys), and how much you'll save or invest.</p>
      <p>Following a budget helps you reach your money goals!</p>
    `,
    image: '📝',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q20-1',
        question: 'What is a budget?',
        options: [
          'A type of bank account',
          'A plan for your money',
          'A stock market tool',
          'A kind of investment'
        ],
        correctAnswer: 1
      },
      {
        id: 'q20-2',
        question: 'Why is having a budget helpful?',
        options: [
          'It makes you rich overnight',
          'It means you never have to think about money',
          'It helps you reach your money goals',
          'It lets you buy anything you want'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '30',
    title: 'Understanding Market Cycles',
    description: 'Learn how markets move in cycles over time.',
    content: `
      <h1>Market Cycles: The Economy's Seasons</h1>
      <p>Just like we have seasons that change throughout the year, the economy has cycles too!</p>
      <p>Sometimes the economy is growing (expansion), and other times it slows down (recession).</p>
      <p>These cycles affect stock prices - they usually go up during expansion and down during recession.</p>
      <p>Remember: No cycle lasts forever, just like winter eventually turns to spring!</p>
    `,
    image: '🔄',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q30-1',
        question: 'What are market cycles?',
        options: [
          'The opening hours of the stock market',
          'Patterns of growth and slowdown in the economy',
          'Special bicycles stock traders ride',
          'The daily stock price changes'
        ],
        correctAnswer: 1
      },
      {
        id: 'q30-2',
        question: 'What happens to most stock prices during an economic recession?',
        options: [
          'They usually go up',
          'They stay exactly the same',
          'They usually go down',
          'They disappear completely'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '40',
    title: 'Stock Market Indexes',
    description: 'Learn what stock market indexes are and why they\'re important.',
    content: `
      <h1>Stock Market Indexes: Taking the Market's Temperature</h1>
      <p>A stock market index is like a thermometer that measures how the stock market is doing.</p>
      <p>Instead of checking every single stock, we can look at an index that follows a group of important stocks.</p>
      <p>Famous indexes include the S&P 500, which follows 500 big companies, and the Dow Jones, which follows 30 large companies.</p>
      <p>When people say "the market is up today," they're usually talking about one of these indexes!</p>
    `,
    image: '📑',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q40-1',
        question: 'What is a stock market index?',
        options: [
          'A list of all stock prices',
          'A measure that shows how a group of stocks is performing',
          'The address of the stock exchange',
          'A type of investment account'
        ],
        correctAnswer: 1
      },
      {
        id: 'q40-2',
        question: 'What does the S&P 500 measure?',
        options: [
          'The performance of the 500 newest companies',
          'The performance of 500 big companies',
          'The 500 best-performing stocks each day',
          'The stocks of 500 different countries'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '50',
    title: 'Becoming a Smart Investor',
    description: 'Learn the key habits of successful investors.',
    content: `
      <h1>Becoming a Smart Investor</h1>
      <p>Smart investors have good habits that help them make better decisions.</p>
      <p>They learn about companies before investing in them.</p>
      <p>They don't panic and sell when prices go down temporarily.</p>
      <p>They diversify by investing in different types of companies.</p>
      <p>They think long-term instead of trying to get rich quickly.</p>
      <p>And most importantly, they keep learning about investing!</p>
    `,
    image: '🧠',
    completed: false,
    lessonType: 'text',
    quizQuestions: [
      {
        id: 'q50-1',
        question: 'What do smart investors do before buying a stock?',
        options: [
          'Ask their friends what to buy',
          'Buy whatever stock is cheapest',
          'Learn about the company',
          'Look at the company\'s logo'
        ],
        correctAnswer: 2
      },
      {
        id: 'q50-2',
        question: 'Why is thinking long-term important for investors?',
        options: [
          'Because the stock market is closed most of the time',
          'Because it\'s easier than thinking about today',
          'Because it helps avoid reacting to short-term ups and downs',
          'Because stocks only go up after one year'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'v1',
    title: 'Introduction to Stock Market',
    description: 'A video guide to understanding the stock market basics.',
    content: '',
    videoUrl: 'https://www.youtube.com/embed/Xn7KWR9EOGQ',
    image: '📹',
    completed: false,
    lessonType: 'video',
    quizQuestions: []
  },
  {
    id: 'v2',
    title: 'How to Read Stock Charts',
    description: 'Learn to understand stock charts and trends.',
    content: '',
    videoUrl: 'https://www.youtube.com/embed/cttEDMJwvw0',
    image: '📊',
    completed: false,
    lessonType: 'video',
    quizQuestions: []
  },
  {
    id: 't1',
    title: 'Making Your First Trade',
    description: 'Step-by-step tutorial on how to make your first stock trade.',
    content: '',
    videoUrl: 'https://www.youtube.com/embed/dN3wMJzT22I',
    image: '🎮',
    completed: false,
    lessonType: 'tutorial',
    quizQuestions: []
  },
  {
    id: 't2',
    title: 'Building a Balanced Portfolio',
    description: 'Interactive guide to creating a balanced investment portfolio.',
    content: '',
    videoUrl: 'https://www.youtube.com/embed/5gl1NHm3pFM',
    image: '⚖️',
    completed: false,
    lessonType: 'tutorial',
    quizQuestions: []
  }
];

export const getLessonById = (id: string): LessonContent | undefined => {
  return lessonData.find(lesson => lesson.id === id);
};
