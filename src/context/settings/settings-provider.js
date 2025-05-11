import isEqual from 'lodash/isEqual';
import { useMemo, useCallback, useState } from 'react';

//
import { SettingsContext } from './settings-context';
import { useLocalStorage } from 'src/hooks/use-local-storage';

// ----------------------------------------------------------------------

export function SettingsProvider({ children, defaultSettings }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);

  const onUpdate = useCallback(
    (name, value) => {
      setSettings(prevState => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setSettings]
  );

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    lang => {
      onUpdate('themeDirection', lang === 'ar' ? 'rtl' : 'ltr');
    },
    [onUpdate]
  );

  // Reset
  const onReset = useCallback(() => {
    setSettings(defaultSettings);
  }, [defaultSettings, setSettings]);

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer(prev => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(settings, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...settings,
      onUpdate,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [onReset, onUpdate, settings, canReset, openDrawer, onCloseDrawer, onToggleDrawer, onChangeDirectionByLang]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
