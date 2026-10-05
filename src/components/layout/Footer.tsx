'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export function Footer() {
  return (
    <footer className="site-footer mt-auto">
      <div className="footer-inner max-w-page mx-auto px-gutter py-lg flex items-center justify-between">
        <p className="text-sm text-muted">built for the people who read the docs.</p>
        <Button 
          variant="link" 
          size="sm"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          back to top
        </Button>
      </div>
    </footer>
  );
}