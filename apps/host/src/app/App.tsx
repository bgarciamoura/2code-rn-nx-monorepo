import { ThemeProvider } from '../contexts/ThemeProvider';
import { HomeScreen } from '../features/Home/HomeScreen';

const App = () => {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
