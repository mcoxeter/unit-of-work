import React, { useEffect, useState } from 'react';
import './App.css';
import { PersonsItem } from './auto-gen/interfaces';
import { PersonList } from './components/person-list';
import 'antd/dist/antd.css';

function App() {
  const [state, setState] = useState<PersonsItem[]>([]);
  useEffect(() => {
    fetch(`http://localhost:4000/persons`)
      .then((res) => res.json())
      .then((x) => setState(x ?? []));
  }, []);

  return (
    <>
      <PersonList persons={state} onChange={setState} />
      {JSON.stringify(state)}
    </>
  );
}

export default App;
