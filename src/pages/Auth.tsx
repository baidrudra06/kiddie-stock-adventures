import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Shield } from 'lucide-react';
const Auth = () => {
  const {
    signIn,
    signUp
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn(signInData.email, signInData.password);
    setIsLoading(false);
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    await signUp(signUpData.email, signUpData.password, signUpData.username);
    setIsLoading(false);
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Kiddie Stock Adventures
          </h1>
          <p className="text-muted-foreground mt-2">Learn finance through fun games!</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in or create an account to start your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" type="email" placeholder="your@email.com" value={signInData.email} onChange={e => setSignInData({
                    ...signInData,
                    email: e.target.value
                  })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" type="password" placeholder="••••••••" value={signInData.password} onChange={e => setSignInData({
                    ...signInData,
                    password: e.target.value
                  })} required />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full text-primary-foreground">
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input id="signup-username" type="text" placeholder="Choose a username" value={signUpData.username} onChange={e => setSignUpData({
                    ...signUpData,
                    username: e.target.value
                  })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="your@email.com" value={signUpData.email} onChange={e => setSignUpData({
                    ...signUpData,
                    email: e.target.value
                  })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="••••••••" value={signUpData.password} onChange={e => setSignUpData({
                    ...signUpData,
                    password: e.target.value
                  })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input id="signup-confirm" type="password" placeholder="••••••••" value={signUpData.confirmPassword} onChange={e => setSignUpData({
                    ...signUpData,
                    confirmPassword: e.target.value
                  })} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <p>Your data is secure and encrypted</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Auth;