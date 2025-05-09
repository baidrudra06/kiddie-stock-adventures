
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
  }
];

export const getLessonById = (id: string): LessonContent | undefined => {
  return lessonData.find(lesson => lesson.id === id);
};
