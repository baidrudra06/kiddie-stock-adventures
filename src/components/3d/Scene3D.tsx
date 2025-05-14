
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, useGLTF, Environment, Float, ContactShadows } from '@react-three/drei';
import { Suspense, useState, useRef, useEffect } from 'react';
import { Color, MathUtils } from 'three';

interface Scene3DProps {
  modelPath?: string;
  backgroundColor?: string;
  height?: string;
  rotation?: boolean;
  interactive?: boolean;
  children?: React.ReactNode;
}

const CoinModel = ({ rotate = true }: { rotate?: boolean }) => {
  const ref = useRef<any>();
  
  useEffect(() => {
    if (!ref.current) return;
    
    // Set initial gold material
    if (ref.current.material) {
      ref.current.material.color = new Color('#FFD700');
      ref.current.material.metalness = 0.9;
      ref.current.material.roughness = 0.1;
    }
  }, []);
  
  useEffect(() => {
    if (!rotate || !ref.current) return;
    
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.rotation.y += 0.01;
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, [rotate]);
  
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <cylinderGeometry args={[2, 2, 0.3, 32]} />
      <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      <mesh position={[0, 0, 0.15]} castShadow>
        <cylinderGeometry args={[1.8, 1.8, 0.01, 32]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0, 0.16]} castShadow>
        <textGeometry args={['$', { font: undefined, size: 1, height: 0.1 }]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
    </mesh>
  );
};

// Fallback shape when no model is provided
const DefaultShape = ({ rotate = true }: { rotate?: boolean }) => {
  const ref = useRef<any>();
  
  useEffect(() => {
    if (!rotate || !ref.current) return;
    
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.rotation.y += 0.01;
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, [rotate]);
  
  return (
    <group ref={ref}>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#4285F4" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[2, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#0F9D58" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[-2, 0, 0]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial color="#F4B400" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Model Loader with fallback
const Model = ({ path, rotate }: { path?: string; rotate?: boolean }) => {
  // If path is provided, try to load the model
  if (path) {
    try {
      const { scene } = useGLTF(path);
      
      return (
        <primitive 
          object={scene} 
          scale={1} 
          position={[0, -1, 0]}
          rotation={rotate ? [0, MathUtils.degToRad(360), 0] : [0, 0, 0]}
        />
      );
    } catch (error) {
      console.error("Failed to load model:", error);
      // Fallback to default shape on error
      return <DefaultShape rotate={rotate} />;
    }
  }
  
  // No path, use default shape
  return <CoinModel rotate={rotate} />;
};

const Scene3D = ({ 
  modelPath,
  backgroundColor = '#f1faff', 
  height = '400px',
  rotation = true,
  interactive = true,
  children
}: Scene3DProps) => {
  return (
    <div style={{ height, width: '100%', background: backgroundColor }}>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={[backgroundColor]} />
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          {interactive ? (
            <PresentationControls
              global
              rotation={[0, rotation ? MathUtils.degToRad(360) : 0, 0]}
              polar={[-0.2, 0.2]}
              azimuth={[-0.5, 0.5]}
              config={{ mass: 2, tension: 400 }}
              snap={{ mass: 4, tension: 300 }}
            >
              <Float rotationIntensity={0.2} floatIntensity={0.5}>
                <Model path={modelPath} rotate={rotation} />
                {children}
              </Float>
            </PresentationControls>
          ) : (
            <group>
              <Model path={modelPath} rotate={rotation} />
              {children}
            </group>
          )}
          
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>
        
        {interactive && <OrbitControls enableZoom={false} />}
      </Canvas>
    </div>
  );
};

export default Scene3D;
