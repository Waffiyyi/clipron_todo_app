import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-foreground">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <Input
                id="email"
                name="username"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary/90"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
