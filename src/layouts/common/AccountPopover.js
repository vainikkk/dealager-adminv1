// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// routes
import { useAuthContext } from 'src/context/auth/use-auth-context';
import usePopover from 'src/components/custom-popover/usePopover';
import CustomPopover from 'src/components/custom-popover/CustomPopover';
import { redirect } from 'react-router';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: '/profile',
  },
  {
    label: 'Settings',
    linkTo: '/settings',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const user = {};

  const { logout } = useAuthContext();

  // const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      redirect('/');
    } catch (error) {
      console.error(error);
      alert('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = path => {
    popover.onClose();
    redirect(path);
  };

  return (
    <>
      <IconButton
        // component={m.button}
        whileTap='tap'
        whileHover='hover'
        // variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: theme => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: theme =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{
            width: 36,
            height: 36,
            border: theme => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant='subtitle2' noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map(option => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}>
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
