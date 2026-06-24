import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Projects from './apps/Projects';
import About from './apps/About';
import Resume from './apps/Resume';
import Terminal from './apps/Terminal';
import Contact from './apps/Contact';
import { person } from '../data/portfolio';
import { AppIcon, PortfolioLogo } from './Win95Icons';

const TABS = [
  { id: 'projects', label: 'Projects', Component: Projects },
  { id: 'about',    label: 'About',    Component: About },
  { id: 'resume',   label: 'Resume',   Component: Resume },
  { id: 'terminal', label: 'Terminal', Component: Terminal },
  { id: 'contact',  label: 'Contact',  Component: Contact },
];

export default function MobileLayout() {
  const [active, setActive] = useState('projects');
  const CurrentComponent = TABS.find(t => t.id === active)?.Component;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      background: '#008080',
      fontFamily: 'var(--font-sys)',
      fontSize: 'var(--text-sm)',
    }}>
      <div style={{
        padding: '6px 10px',
        background: '#000080',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <PortfolioLogo size={18} />
        <div style={{ minWidth: 0 }}>
          <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>{person.name}</div>
          <div style={{ color: '#c0c0c0', fontSize: 'var(--text-xs)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{person.title}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', background: '#c0c0c0' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            style={{ height: '100%' }}
          >
            {CurrentComponent && <CurrentComponent />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ flexShrink: 0, borderTop: '2px solid #fff', background: '#c0c0c0' }}>
        <div className="mobile-tabs" style={{ display: 'flex', overflow: 'hidden' }}>
          {TABS.map(tab => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  flex: 1,
                  minWidth: '56px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  padding: isActive ? '8px 4px 6px' : '7px 4px 7px',
                  background: isActive ? '#c0c0c0' : '#a0a0a0',
                  border: 'none',
                  borderRight: '1px solid #808080',
                  cursor: 'default',
                  fontFamily: 'var(--font-sys)',
                  fontSize: 'var(--text-xs)',
                  color: '#000',
                  boxShadow: isActive
                    ? 'inset -1px 0 0 #808080, inset 1px 0 0 #fff'
                    : 'none',
                  borderTop: isActive ? '2px solid #fff' : '1px solid #808080',
                  marginTop: isActive ? '-2px' : '0',
                  position: 'relative',
                  zIndex: isActive ? 1 : 0,
                }}
              >
                <span style={{ width: '20px', height: '20px', imageRendering: 'pixelated' }}>
                  <AppIcon id={tab.id} size={20} />
                </span>
                <span style={{
                  fontWeight: isActive ? 'bold' : 'normal',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
