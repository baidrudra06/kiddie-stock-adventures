
import Scene3D from './Scene3D';
import { Suspense } from 'react';

interface Coin3DProps {
  symbol?: string;
  color?: string;
  height?: string;
  rotate?: boolean;
}

const Coin3D = ({ symbol = '$', color = '#FFD700', height = '200px', rotate = true }: Coin3DProps) => {
  return (
    <Suspense fallback={<div className="h-full w-full bg-muted flex items-center justify-center">Loading 3D asset...</div>}>
      <Scene3D height={height} rotation={rotate}>
        <mesh castShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[2, 2, 0.3, 32]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          
          <mesh position={[0, 0, 0.15]} castShadow>
            <cylinderGeometry args={[1.8, 1.8, 0.01, 32]} />
            <meshStandardMaterial color="#FFFFFF" />
            
            {/* Symbol on coin */}
            <mesh position={[-0.5, 0, 0.01]}>
              <Suspense fallback={null}>
                <textGeometry args={[symbol, { size: 1, height: 0.1 }]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
              </Suspense>
            </mesh>
          </mesh>
        </mesh>
      </Scene3D>
    </Suspense>
  );
};

export default Coin3D;
