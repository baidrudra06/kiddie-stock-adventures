
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { lessonData } from "@/data/lessonData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import LessonCard from "@/components/LessonCard";
import KiddieBot from "@/components/KiddieBot";
import { useGameContext } from "@/contexts/GameContext";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Book, Video, Gamepad, ChevronRight, BookOpen, Star, ExternalLink } from "lucide-react";

const stockMarketBooks = [
  {
    id: "book1",
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    description: "A classic guide to value investing and making smart investment decisions. Perfect for beginners who want to learn the fundamentals.",
    rating: 5,
    ageGroup: "12+",
    difficulty: "Beginner",
    pageCount: 640,
    summary: "Learn the timeless principles of value investing from the mentor of Warren Buffett.",
    readingUrl: "https://www.goodreads.com/book/show/106835.The_Intelligent_Investor"
  },
  {
    id: "book2",
    title: "A Random Walk Down Wall Street",
    author: "Burton Malkiel",
    description: "An easy-to-understand guide to investing that explains why the stock market is unpredictable and how to invest wisely.",
    rating: 4,
    ageGroup: "10+",
    difficulty: "Beginner",
    pageCount: 448,
    summary: "Discover why diversified index funds often beat actively managed portfolios.",
    readingUrl: "https://www.goodreads.com/book/show/40242274-a-random-walk-down-wall-street"
  },
  {
    id: "book3",
    title: "The Little Book of Common Sense Investing",
    author: "John Bogle",
    description: "The founder of Vanguard explains simple investment strategies that work for everyone.",
    rating: 5,
    ageGroup: "8+",
    difficulty: "Beginner",
    pageCount: 304,
    summary: "Learn why low-cost index funds are the best choice for most investors.",
    readingUrl: "https://www.goodreads.com/book/show/171127.The_Little_Book_of_Common_Sense_Investing"
  },
  {
    id: "book4",
    title: "One Up On Wall Street",
    author: "Peter Lynch",
    description: "Learn how ordinary people can beat professional investors by investing in what they know.",
    rating: 4,
    ageGroup: "12+",
    difficulty: "Intermediate",
    pageCount: 352,
    summary: "Discover how to find winning stocks by looking at the world around you.",
    readingUrl: "https://www.goodreads.com/book/show/762462.One_Up_On_Wall_Street"
  },
  {
    id: "book5",
    title: "The Millionaire Next Door",
    author: "Thomas Stanley",
    description: "Learn the surprising secrets of wealthy people and how they build their fortunes through smart money habits.",
    rating: 4,
    ageGroup: "10+",
    difficulty: "Beginner",
    pageCount: 272,
    summary: "Understand the real habits and characteristics of wealthy individuals.",
    readingUrl: "https://www.goodreads.com/book/show/998.The_Millionaire_Next_Door"
  },
  {
    id: "book6",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    description: "A story about financial education and the difference between working for money and having money work for you.",
    rating: 4,
    ageGroup: "8+",
    difficulty: "Beginner",
    pageCount: 336,
    summary: "Learn the importance of financial literacy and building assets.",
    readingUrl: "https://www.goodreads.com/book/show/69571.Rich_Dad_Poor_Dad"
  }
];

const Learn = () => {
  const navigate = useNavigate();
  const { userProgress } = useGameContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showKiddieBot, setShowKiddieBot] = useState(false);
  
  const isLessonCompleted = (lessonId: string): boolean => {
    return userProgress.completedLessons.includes(lessonId);
  };
  
  const filteredLessons = lessonData.filter(
    lesson => 
      (lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === "all" || 
       (activeTab === "text" && lesson.lessonType === "text") ||
       (activeTab === "video" && lesson.lessonType === "video") ||
       (activeTab === "tutorial" && lesson.lessonType === "tutorial"))
  );

  const filteredBooks = stockMarketBooks.filter(
    book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const handleReadBook = (book: typeof stockMarketBooks[0]) => {
    window.open(book.readingUrl, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Learn About Money & Stocks</h1>
            <p className="text-gray-300">
              Complete fun lessons to earn coins and build your knowledge
            </p>
          </div>
          
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search lessons and books..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={() => navigate('/trading-games')} 
            variant="outline"
            className="flex items-center gap-2 border-primary text-primary hover:bg-primary/5"
          >
            <Gamepad className="h-5 w-5" />
            Go to Trading Games
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={() => setShowKiddieBot(!showKiddieBot)}
            variant={showKiddieBot ? "secondary" : "default"}
            className="flex items-center gap-2"
          >
            {showKiddieBot ? "Hide Kiddie Bot" : "Talk to Kiddie Bot"}
          </Button>
        </div>
        
        {showKiddieBot && (
          <div className="mb-8">
            <KiddieBot onClose={() => setShowKiddieBot(false)} />
          </div>
        )}
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Lessons</TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-1">
              <Book className="w-4 h-4" /> Text
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="w-4 h-4" /> Videos
            </TabsTrigger>
            <TabsTrigger value="tutorial" className="flex items-center gap-1">
              <Gamepad className="w-4 h-4" /> Tutorials
            </TabsTrigger>
            <TabsTrigger value="books" className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" /> Books
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)} 
                />
              ))}
              
              {filteredLessons.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-300">No lessons found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="text" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)} 
                />
              ))}
              
              {filteredLessons.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-300">No text lessons found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)} 
                />
              ))}
              
              {filteredLessons.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-300">No video lessons found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="tutorial" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)} 
                />
              ))}
              
              {filteredLessons.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-300">No tutorial lessons found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="books" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map(book => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50 bg-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 text-white">{book.title}</CardTitle>
                        <CardDescription className="text-sm font-medium text-primary">
                          by {book.author}
                        </CardDescription>
                      </div>
                      <BookOpen className="w-6 h-6 text-primary flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 mb-4">{book.description}</p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(book.rating)}
                      <span className="text-sm text-gray-400 ml-1">({book.rating}/5)</span>
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-400">
                      <div className="flex justify-between">
                        <span>Age Group:</span>
                        <span className="font-medium text-gray-300">{book.ageGroup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <span className="font-medium text-gray-300">{book.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span className="font-medium text-gray-300">{book.pageCount}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-xs text-primary-foreground italic">{book.summary}</p>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      size="sm"
                      onClick={() => handleReadBook(book)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Book
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {filteredBooks.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-300">No books found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Learn;
