import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
// @mui
import Collapse from '@mui/material/Collapse';

//
import NavItem from './nav-item';
import { useActiveLink } from 'src/hooks/use-active-link';

// ----------------------------------------------------------------------

export default function NavList({ data, depth, hasChild, config }) {
  const { pathname } = useLocation();

  const active = useActiveLink(data.path, hasChild);

  const externalLink = data.path.includes('http');

  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (!active) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        active={active}
        externalLink={externalLink}
        onClick={handleToggle}
        config={config}
      />

      {hasChild && (
        <Collapse in={open} unmountOnExit>
          <NavSubList data={data.children} depth={depth} config={config} />
        </Collapse>
      )}
    </>
  );
}

function NavSubList({ data, depth, config }) {
  return (
    <>
      {data.map(list => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </>
  );
}
