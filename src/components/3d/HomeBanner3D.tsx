
import { Suspense } from 'react';
import Scene3D from './Scene3D';

const HomeBanner3D = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
      <Suspense fallback={<div className="h-64 bg-muted flex items-center justify-center">Loading 3D scene...</div>}>
        <Scene3D
          height="400px"
          backgroundColor="rgba(240, 249, 255, 0.8)"
          rotation={true}
          interactive={true}
        />
      </Suspense>
      
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-gradient-to-t from-background/80 to-transparent">
        <h2 className="text-3xl md:text-4xl font-bold text-primary drop-shadow-md mb-4">
          Welcome to KiddieTrade
        </h2>
        <p className="text-lg md:text-xl max-w-md mx-auto text-foreground drop-shadow">
          Explore the world of finance with our interactive 3D learning environment
        </p>
      </div>
    </div>
  );
};

export default HomeBanner3D;
