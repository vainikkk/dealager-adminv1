import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './theme';
import Router from './routes/Router';
import { SettingsProvider } from './context/settings/settings-provider';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light', // 'light' | 'dark'
          themeDirection: 'ltr', //  'rtl' | 'ltr'
          themeContrast: 'default', // 'default' | 'bold'
          themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
          themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
          themeStretch: false,
        }}
      >
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
