import './App.css';
import 'antd/dist/antd.css';
import { PersonContextProvider } from './services/person-context-provider';
import { Person } from './components/person';
import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

function App() {
  const menuItems: ItemType[] = [
    {
      key: 1,
      label: 'Persons',
      onClick: (v) => {}
    }
  ];

  return (
    <Layout className='layout'>
      <Header>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
          items={menuItems}
        />
      </Header>
      <Layout>
        <Content style={{ padding: '50px' }}>
          <PersonContextProvider id={1234}>
            <Person />
          </PersonContextProvider>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Editor unit of work example - Created by coxeterm
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
