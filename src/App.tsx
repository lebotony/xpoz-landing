import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import StructuredData from './components/StructuredData';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StructuredData />
      <LandingPage />
    </ThemeProvider>
  );
};

export default App;
