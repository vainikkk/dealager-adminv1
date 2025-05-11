import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// theme
import { bgBlur } from 'src/theme/css';
import { useNavData } from './config-navigation';
import { HEADER } from 'src/utils/layoutConfig';
import NavSectionHorizontal from 'src/components/nav-section/horizontal/NavSectionHorizontal';
import HeaderShadow from '../common/HeaderShadow';

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();

  const user = {};

  const navData = useNavData();

  return (
    <AppBar
      component='nav'
      sx={{
        top: HEADER.H_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal
          data={navData}
          config={{
            currentRole: user?.role || 'admin',
          }}
        />
      </Toolbar>

      <HeaderShadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);
