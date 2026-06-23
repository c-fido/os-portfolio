import { useState, useCallback } from 'react';
import { filesystem } from '../../data/filesystem';
import { projects } from '../../data/portfolio';
import { FolderIcon, DocumentIcon, NotepadIcon, ComputerIcon } from '../Win95Icons';

const FINDER_TEXT = 'var(--text-sm)';
const FINDER_TEXT_SM = 'var(--text-xs)';

function getNodeAtPath(root, path) {
  let node = root;
  for (const name of path) {
    if (!node.children) return null;
    const child = node.children.find(c => c.name === name);
    if (!child) return null;
    node = child;
  }
  return node;
}

function pathKey(path) {
  return ['~', ...path].join('/');
}

function NodeIcon({ node, size = 28 }) {
  if (node.type === 'folder') return <FolderIcon size={size} />;
  if (node.name.endsWith('.pdf')) return <DocumentIcon size={size} />;
  if (node.name.endsWith('.md')) return <NotepadIcon size={size} />;
  return <DocumentIcon size={size} />;
}

function Breadcrumb({ path, onNavigate }) {
  const crumbs = ['~', ...path];
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '5px 8px',
      borderBottom: '1px solid #808080',
      overflow: 'hidden',
      flexShrink: 0,
      background: '#c0c0c0',
      fontSize: FINDER_TEXT,
    }}>
      <button
        className="win95-btn"
        style={{ padding: '2px 8px', minWidth: 'auto', marginRight: '4px' }}
        onClick={() => onNavigate(path.slice(0, -1))}
        disabled={path.length === 0}
      >
        Back
      </button>

      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        const targetPath = path.slice(0, i);
        return (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
            {i > 0 && <span style={{ color: '#808080' }}>\</span>}
            <button
              onClick={() => !isLast && onNavigate(targetPath)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: FINDER_TEXT,
                fontFamily: 'var(--font-sys)',
                cursor: 'default',
                padding: '2px 4px',
                color: isLast ? '#000' : '#000080',
                textDecoration: isLast ? 'none' : 'underline',
                fontWeight: isLast ? 'bold' : 'normal',
              }}
            >
              {crumb}
            </button>
          </span>
        );
      })}
    </div>
  );
}

function SidebarNode({ node, depth, nodePath, selectedPath, expandedKeys, onSelect, onToggle }) {
  const key      = pathKey(nodePath);
  const isFolder = node.type === 'folder';
  const isExp    = expandedKeys.has(key);
  const isSel    = pathKey(selectedPath) === key;

  return (
    <div>
      <button
        onClick={() => onSelect(nodePath)}
        onDoubleClick={() => { if (isFolder) onToggle(key); }}
        style={{
          paddingLeft: `${8 + depth * 12}px`,
          paddingRight: '8px',
          paddingTop: '4px',
          paddingBottom: '4px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          textAlign: 'left',
          background: isSel ? '#000080' : 'none',
          color: isSel ? '#fff' : '#000',
          border: 'none',
          fontFamily: 'var(--font-sys)',
          fontSize: FINDER_TEXT,
          cursor: 'default',
        }}
        onMouseEnter={e => { if (!isSel) { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#fff'; } }}
        onMouseLeave={e => { if (!isSel) { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#000'; } }}
      >
        {isFolder && (
          <span style={{ width: '10px', textAlign: 'center', flexShrink: 0, fontSize: FINDER_TEXT_SM }}>
            {isExp ? '▾' : '▸'}
          </span>
        )}
        {!isFolder && <span style={{ width: '10px', flexShrink: 0 }} />}
        <span style={{ lineHeight: 1, flexShrink: 0, imageRendering: 'pixelated' }}><NodeIcon node={node} size={18} /></span>
        <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', flex: 1 }}>{node.name}</span>
      </button>

      {isFolder && isExp && node.children?.map(child => (
        <SidebarNode
          key={child.name}
          node={child}
          depth={depth + 1}
          nodePath={[...nodePath, child.name]}
          selectedPath={selectedPath}
          expandedKeys={expandedKeys}
          onSelect={onSelect}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

function Sidebar({ selectedPath, expandedKeys, onSelect, onToggle }) {
  const isSel = selectedPath.length === 0;
  return (
    <div
      className="os-scrollbar"
      style={{
        width: '188px',
        flexShrink: 0,
        borderRight: '1px solid #808080',
        overflow: 'auto',
        background: '#c0c0c0',
        padding: '4px',
      }}
    >
      <button
        onClick={() => onSelect([])}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          background: isSel ? '#000080' : 'none',
          color: isSel ? '#fff' : '#000',
          border: 'none',
          fontFamily: 'var(--font-sys)',
          fontSize: FINDER_TEXT,
          cursor: 'default',
          textAlign: 'left',
        }}
        onMouseEnter={e => { if (!isSel) { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#fff'; } }}
        onMouseLeave={e => { if (!isSel) { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#000'; } }}
      >
        <span style={{ lineHeight: 1, flexShrink: 0, imageRendering: 'pixelated' }}><ComputerIcon size={18} /></span>
        <span>My Computer</span>
      </button>

      {filesystem.children?.map(child => (
        <SidebarNode
          key={child.name}
          node={child}
          depth={0}
          nodePath={[child.name]}
          selectedPath={selectedPath}
          expandedKeys={expandedKeys}
          onSelect={onSelect}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

function ProjectCard({ projectId, onOpenApp }) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  return (
    <div className="text-prose" style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: FINDER_TEXT }}>
      <div>
        <h2 style={{ fontWeight: 'bold', margin: '0 0 6px', fontSize: 'var(--text-lg)' }}>{project.title}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>

      <p style={{ margin: 0, lineHeight: 1.5 }}>{project.description}</p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="win95-btn" style={{ minWidth: 'auto', padding: '3px 12px', textDecoration: 'none', color: '#000' }}>
            GitHub
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="win95-btn" style={{ minWidth: 'auto', padding: '3px 12px', textDecoration: 'none', color: '#000' }}>
            Live Demo
          </a>
        )}
        <button onClick={() => onOpenApp?.('projects')} className="win95-btn" style={{ minWidth: 'auto', padding: '3px 12px' }}>
          Open Projects
        </button>
      </div>
    </div>
  );
}

function FilePreview({ node, onOpenApp }) {
  if (node.projectId) {
    return <ProjectCard projectId={node.projectId} onOpenApp={onOpenApp} />;
  }
  return (
    <pre className="text-prose" style={{
      fontSize: FINDER_TEXT,
      lineHeight: 1.55,
      whiteSpace: 'pre-wrap',
      fontFamily: 'var(--font-mono)',
      color: '#000',
      margin: 0,
    }}>
      {node.content}
    </pre>
  );
}

function FolderView({ node, onSelect, currentPath }) {
  if (!node.children || node.children.length === 0) {
    return <p style={{ color: '#808080', fontStyle: 'italic', fontSize: FINDER_TEXT, margin: 0 }}>This folder is empty.</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {node.children.map(child => (
        <button
          key={child.name}
          onDoubleClick={() => onSelect([...currentPath, child.name])}
          onClick={() => onSelect([...currentPath, child.name])}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 6px',
            width: '96px',
            background: 'none',
            border: 'none',
            cursor: 'default',
            fontFamily: 'var(--font-sys)',
            fontSize: FINDER_TEXT_SM,
            color: '#000',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#000080'; e.currentTarget.querySelector('.finder-label').style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.querySelector('.finder-label').style.color = '#000'; }}
        >
          <span style={{ lineHeight: 1, imageRendering: 'pixelated' }}><NodeIcon node={child} size={32} /></span>
          <span className="finder-label text-prose" style={{ textAlign: 'center', lineHeight: 1.35, maxWidth: '88px' }}>{child.name}</span>
        </button>
      ))}
    </div>
  );
}

function ContentPanel({ selectedPath, onSelect, onOpenApp }) {
  const node = getNodeAtPath(filesystem, selectedPath);
  if (!node) return null;

  const isFile = node.type === 'file';

  return (
    <div
      className="os-scrollbar win95-content"
      style={{
        flex: 1,
        overflow: 'auto',
        padding: '12px',
        background: '#fff',
        boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff, inset 2px 2px 0 #000, inset -2px -2px 0 #dfdfdf',
        margin: '4px 4px 4px 0',
        fontSize: FINDER_TEXT,
      }}
    >
      {isFile ? (
        <FilePreview node={node} onOpenApp={onOpenApp} />
      ) : (
        <FolderView node={node} onSelect={onSelect} currentPath={selectedPath} />
      )}
    </div>
  );
}

export default function Finder({ onOpenApp }) {
  const [selectedPath, setSelectedPath] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(() => new Set(['~']));

  const handleSelect = useCallback((path) => {
    setSelectedPath(path);
    const node = getNodeAtPath(filesystem, path);
    if (node?.type === 'folder') {
      setExpandedKeys(prev => {
        const next = new Set(prev);
        next.add(pathKey(path));
        return next;
      });
    }
  }, []);

  const handleToggle = useCallback((key) => {
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  return (
    <div className="win95-app" style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#c0c0c0',
    }}>
      <Breadcrumb path={selectedPath} onNavigate={handleSelect} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          selectedPath={selectedPath}
          expandedKeys={expandedKeys}
          onSelect={handleSelect}
          onToggle={handleToggle}
        />
        <ContentPanel
          selectedPath={selectedPath}
          onSelect={handleSelect}
          onOpenApp={onOpenApp}
        />
      </div>

      <div className="win95-statusbar" style={{ flexShrink: 0 }}>
        <span className="win95-statusbar-panel">
          {selectedPath.length > 0 ? selectedPath[selectedPath.length - 1] : 'My Computer'}
        </span>
      </div>
    </div>
  );
}
