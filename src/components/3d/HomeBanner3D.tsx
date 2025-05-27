
import { Suspense, useState, useEffect } from 'react';
import Scene3D from './Scene3D';

const HomeBanner3D = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-2xl">
      <Suspense fallback={
        <div className="h-96 bg-gradient-to-br from-black/50 to-gray-800/50 flex items-center justify-center rounded-xl">
          <div className="text-center space-y-4">
            <div className="animate-spin-3d text-6xl">⚡</div>
            <div className="text-lg text-white/80">Loading 3D Experience...</div>
          </div>
        </div>
      }>
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <Scene3D
            height="500px"
            backgroundColor="#000000"
            rotation={true}
            interactive={true}
            enhanced={true}
          />
        </div>
      </Suspense>
      
      {/* Enhanced Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 glass-effect">
          <h2 className={`text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-6 transition-all duration-1000 ${isLoaded ? 'animate-slide-down' : 'opacity-0'}`}>
            Welcome to the Future of
            <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-glow-pulse">
              Financial Education
            </span>
          </h2>
          
          <p className={`text-xl md:text-2xl max-w-2xl mx-auto text-white/90 drop-shadow mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            Experience revolutionary 3D learning environments that make complex financial concepts 
            intuitive and engaging for the next generation
          </p>
          
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-500 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
            {['🚀 Interactive', '🎮 Gamified', '🌟 Immersive', '🏆 Rewarding'].map((tag, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30 hover-glow animate-bounce-in"
                style={{ animationDelay: `${index * 0.1 + 0.7}s` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating Animation Elements */}
      <div className="absolute top-10 left-10 text-3xl animate-float-complex opacity-60">💎</div>
      <div className="absolute top-20 right-16 text-2xl animate-float-complex opacity-60" style={{animationDelay: '1s'}}>⚡</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-float-complex opacity-60" style={{animationDelay: '2s'}}>🌟</div>
      <div className="absolute bottom-16 right-12 text-3xl animate-float-complex opacity-60" style={{animationDelay: '1.5s'}}>🎯</div>
    </div>
  );
};

export default HomeBanner3D;
