import './App.css';
import 'antd/dist/antd.css';
import { PersonContextProvider } from './services/person-context-provider';
import { Person } from './components/person';

function App() {
  return (
    <PersonContextProvider id={1234}>
      <Person />
    </PersonContextProvider>
  );
}

export default App;
