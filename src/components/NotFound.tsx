import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
