import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css';
import ProfileViewer from './components/ProfileViewer';

function App() {
  const mockProfileId = '071ad2a2-2ac9-433a-869f-ee374337eadf';

  return (
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <ProfileViewer profileId={mockProfileId} />
    </MantineProvider>
  );
}

export default App;
