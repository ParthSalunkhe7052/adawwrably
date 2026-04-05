import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <main className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-background px-6">
      <h1 className="text-9xl font-display uppercase tracking-widest text-primary mb-4">404</h1>
      <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wider mb-6 text-foreground text-center">
        Page Not Found
      </h2>
      <p className="text-muted-foreground font-sans text-lg text-center max-w-md mb-8">
        Oops! It looks like you've wandered into uncharted territory. The page you're looking for doesn't exist.
      </p>
      <Button render={<Link to="/" />} size="lg" className="font-sans uppercase tracking-widest">
        Return Home
      </Button>
    </main>
  );
}
