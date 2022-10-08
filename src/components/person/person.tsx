import { Card, Collapse, Tag, Typography } from 'antd';
import { useContext, useState } from 'react';
import { PersonContext } from '../../services/person-context';
import { PersonHeader } from './person-header';
import { PersonalDetails } from './personal-details/personal-details';
const { Panel } = Collapse;
const { Text } = Typography;
export const Person = () => {
  const personContext = useContext(PersonContext);

  const [activePanels, setActivePanels] = useState<string[] | string>([
    'Personal details'
  ]);

  const current = personContext.current();
  if (current === undefined) {
    return null;
  }

  return (
    <Card size='small'>
      <PersonHeader />
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        <Panel
          key={'Personal details'}
          header={`Personal details`}
          extra={
            <Text>
              {current.forename} {current.surname}
            </Text>
          }
        >
          <PersonalDetails />
        </Panel>
        <Panel
          key={'Ogranizational affilations'}
          header={`Ogranizational affilations`}
          extra={current.ogranizationalAffilations.affilations.map((x, i) => (
            <span key={i}>
              <Text>{x.affiliation} </Text>
              <Tag color='processing'>{x.type}</Tag>
            </span>
          ))}
        ></Panel>
      </Collapse>
    </Card>
  );
};
