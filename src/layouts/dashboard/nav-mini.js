// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// theme
import { hideScroll } from 'src/theme/css';
import { useNavData } from './config-navigation';
import { NAV } from 'src/utils/layoutConfig';
import NavToggleButton from '../common/NavToggleButton';
import Logo from 'src/components/logo/Logo';
import NavSectionMini from 'src/components/nav-section/mini/NavSectionMini';

// ----------------------------------------------------------------------

export default function NavMini() {
  const user = {};

  const navData = useNavData();

  return (
    <Box
      component='nav'
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: theme => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <NavSectionMini
          data={navData}
          config={{
            currentRole: user?.role || 'admin',
          }}
        />
      </Stack>
    </Box>
  );
}
