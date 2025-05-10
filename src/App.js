import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './theme';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className='App'>
          <h1>Hello World1</h1>
          <p>This is a simple React application.</p>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
