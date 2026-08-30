import { useState, useCallback, useEffect } from 'react';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';
import MobileLayout from './components/MobileLayout';
import { markBooted, shouldSkipBoot } from './lib/apps';

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

export default function App() {
  const [booted, setBooted] = useState(() => shouldSkipBoot());
  const isMobile = useIsMobile();
  const handleBootComplete = useCallback(() => {
    markBooted();
    setBooted(true);
  }, []);

  return (
    <>
      {!booted && <BootScreen onComplete={handleBootComplete} />}
      {booted && (isMobile ? <MobileLayout /> : <Desktop />)}
    </>
  );
}
