import './App.css';
import AppRoutes from './AppRoutes';
import ProviderAuth from './contexts/providerAuth';

function App() {
  return (
    <ProviderAuth>
      <AppRoutes />
    </ProviderAuth>
  );
}

export default App;
