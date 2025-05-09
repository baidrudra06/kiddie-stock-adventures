
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem('ksa-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Ensure the isAuthenticated flag is set properly
        parsedUser.isAuthenticated = true;
        setUser(parsedUser);
        console.log("User authenticated from localStorage:", parsedUser);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('ksa-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // This is a mock implementation for demo purposes
      const mockUser: User = {
        id: 'user-' + Date.now().toString(),
        email,
        name: email.split('@')[0],
        isAuthenticated: true
      };
      
      setUser(mockUser);
      localStorage.setItem('ksa-user', JSON.stringify(mockUser));
      
      toast({
        title: 'Login successful',
        description: `Welcome ${mockUser.name}!`,
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      // This is a mock implementation for demo purposes
      const mockUser: User = {
        id: 'google-user-' + Date.now().toString(),
        email: 'demo@gmail.com',
        name: 'Demo User',
        photoURL: 'https://api.dicebear.com/6.x/avataaars/svg?seed=demo',
        isAuthenticated: true
      };
      
      setUser(mockUser);
      localStorage.setItem('ksa-user', JSON.stringify(mockUser));
      
      toast({
        title: 'Google login successful',
        description: `Welcome ${mockUser.name}!`,
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Google login failed',
        description: 'An error occurred during Google login.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ksa-user');
    // Clear game data to allow fresh start
    localStorage.removeItem('ksa-cash');
    localStorage.removeItem('ksa-portfolio');
    localStorage.removeItem('ksa-transactions');
    localStorage.removeItem('ksa-progress');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        logout,
        isAuthenticated: !!user?.isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
