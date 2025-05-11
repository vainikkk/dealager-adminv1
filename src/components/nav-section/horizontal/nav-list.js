import { useState, useEffect, useRef } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import { appBarClasses } from '@mui/material/AppBar';
//
import NavItem from './nav-item';
import { useLocation } from 'react-router';
import { useActiveLink } from 'src/hooks/use-active-link';

// ----------------------------------------------------------------------

export default function NavList({ data, depth, hasChild, config }) {
  const navRef = useRef(null);

  const { pathname } = useLocation();

  const active = useActiveLink(data.path, hasChild);

  const externalLink = data.path.includes('http');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const appBarEl = Array.from(document.querySelectorAll(`.${appBarClasses.root}`));

    // Reset styles when hover
    const styles = () => {
      document.body.style.overflow = '';
      document.body.style.padding = '';
      // Apply for Window
      appBarEl.forEach(elem => {
        elem.style.padding = '';
      });
    };

    if (open) {
      styles();
    } else {
      styles();
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavItem
        ref={navRef}
        item={data}
        depth={depth}
        open={open}
        active={active}
        externalLink={externalLink}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        config={config}
      />

      {hasChild && (
        <Popover
          open={open}
          anchorEl={navRef.current}
          anchorOrigin={
            depth === 1 ? { vertical: 'bottom', horizontal: 'left' } : { vertical: 'center', horizontal: 'right' }
          }
          transformOrigin={
            depth === 1 ? { vertical: 'top', horizontal: 'left' } : { vertical: 'center', horizontal: 'left' }
          }
          slotProps={{
            paper: {
              onMouseEnter: handleOpen,
              onMouseLeave: handleClose,
              sx: {
                width: 160,
                ...(open && {
                  pointerEvents: 'auto',
                }),
              },
            },
          }}
          sx={{
            pointerEvents: 'none',
          }}
        >
          <NavSubList data={data.children} depth={depth} config={config} />
        </Popover>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function NavSubList({ data, depth, config }) {
  return (
    <Stack spacing={0.5}>
      {data.map(list => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </Stack>
  );
}
