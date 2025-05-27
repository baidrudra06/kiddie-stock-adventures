
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Environment, Float, ContactShadows, Sparkles, Stars } from '@react-three/drei';
import { Suspense, useState, useRef, useEffect } from 'react';
import { Color, MathUtils } from 'three';

interface Scene3DProps {
  modelPath?: string;
  backgroundColor?: string;
  height?: string;
  rotation?: boolean;
  interactive?: boolean;
  children?: React.ReactNode;
  enhanced?: boolean;
}

const AnimatedCoin = ({ rotate = true }: { rotate?: boolean }) => {
  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    // Enhanced material properties
    if (ref.current.material) {
      ref.current.material.color = new Color('#000000');
      ref.current.material.metalness = 0.9;
      ref.current.material.roughness = 0.1;
      ref.current.material.envMapIntensity = 1.5;
    }
  }, []);
  
  useEffect(() => {
    if (!rotate || !ref.current) return;
    
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.rotation.y += hovered ? 0.02 : 0.01;
        ref.current.rotation.x += hovered ? 0.01 : 0.005;
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, [rotate, hovered]);
  
  return (
    <Float
      speed={hovered ? 2 : 1}
      rotationIntensity={hovered ? 2 : 1}
      floatIntensity={hovered ? 2 : 1}
    >
      <group
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <mesh ref={ref} castShadow receiveShadow scale={hovered ? 1.1 : 1}>
          <cylinderGeometry args={[2, 2, 0.3, 32]} />
          <meshStandardMaterial 
            color="#000000" 
            metalness={0.9} 
            roughness={0.1}
            envMapIntensity={1.5}
          />
          
          {/* Coin face */}
          <mesh position={[0, 0, 0.15]} castShadow>
            <cylinderGeometry args={[1.8, 1.8, 0.01, 32]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          
          {/* Dollar sign */}
          <mesh position={[0, 0, 0.16]} castShadow>
            <boxGeometry args={[0.2, 1.5, 0.1]} />
            <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.3, 0.16]} castShadow>
            <boxGeometry args={[0.8, 0.2, 0.1]} />
            <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.3, 0.16]} castShadow>
            <boxGeometry args={[0.8, 0.2, 0.1]} />
            <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
          </mesh>
        </mesh>
        
        {/* Sparkles around coin */}
        {hovered && (
          <Sparkles
            count={50}
            scale={[4, 4, 4]}
            size={2}
            speed={0.5}
            color="#ffffff"
          />
        )}
      </group>
    </Float>
  );
};

// Enhanced shape collection
const AnimatedShapes = ({ rotate = true }: { rotate?: boolean }) => {
  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (!rotate || !ref.current) return;
    
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.rotation.y += hovered ? 0.02 : 0.01;
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, [rotate, hovered]);
  
  return (
    <group 
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh castShadow position={[0, 0, 0]} scale={hovered ? 1.1 : 1}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial 
            color="#000000" 
            metalness={0.8} 
            roughness={0.2}
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh castShadow position={[3, 0, 0]} scale={hovered ? 1.1 : 1}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#333333" 
            metalness={0.7} 
            roughness={0.3}
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>
      
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh castShadow position={[-3, 0, 0]} scale={hovered ? 1.1 : 1}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial 
            color="#666666" 
            metalness={0.9} 
            roughness={0.1}
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>
      
      {hovered && (
        <Sparkles
          count={100}
          scale={[8, 8, 8]}
          size={1}
          speed={1}
          color="#ffffff"
        />
      )}
    </group>
  );
};

// Model Loader with enhanced fallback
const Model = ({ path, rotate }: { path?: string; rotate?: boolean }) => {
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
      return <AnimatedShapes rotate={rotate} />;
    }
  }
  
  return <AnimatedCoin rotate={rotate} />;
};

const Scene3D = ({ 
  modelPath,
  backgroundColor = '#000000', 
  height = '400px',
  rotation = true,
  interactive = true,
  enhanced = true,
  children
}: Scene3DProps) => {
  return (
    <div style={{ height, width: '100%', background: backgroundColor }} className="rounded-lg overflow-hidden">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={[backgroundColor]} />
        
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight 
          position={[-10, 10, -10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.8} 
          castShadow 
          color="#666666"
        />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, -10, 0]} intensity={0.3} color="#333333" />
        
        <Suspense fallback={null}>
          {enhanced && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />}
          <Environment preset="city" />
          
          {interactive ? (
            <PresentationControls
              global
              rotation={[0, rotation ? MathUtils.degToRad(360) : 0, 0]}
              polar={[-0.3, 0.3]}
              azimuth={[-0.7, 0.7]}
              config={{ mass: 2, tension: 400 }}
              snap={{ mass: 4, tension: 300 }}
            >
              <Float 
                rotationIntensity={0.3} 
                floatIntensity={0.8}
                speed={1.2}
              >
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
            position={[0, -3, 0]}
            opacity={0.8}
            scale={12}
            blur={2.5}
            far={6}
            color="#000000"
          />
        </Suspense>
        
        {interactive && (
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI - Math.PI / 3}
          />
        )}
      </Canvas>
    </div>
  );
};

export default Scene3D;
