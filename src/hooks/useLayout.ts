import { useState, useEffect } from 'react';

type Layout = 'list' | 'grid';

export const useLayout = () => {
  const [layout, setLayout] = useState<Layout>(() => {
    if (typeof window !== 'undefined') {
      const savedLayout = localStorage.getItem('todoLayout') as Layout;
      return savedLayout || 'list';
    }
    return 'list';
  });

  useEffect(() => {
    localStorage.setItem('todoLayout', layout);
  }, [layout]);

  const toggleLayout = () => {
    setLayout((prev) => (prev === 'list' ? 'grid' : 'list'));
  };

  return { layout, toggleLayout };
};

