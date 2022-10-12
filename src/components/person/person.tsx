import { Card, Collapse, Tag, Typography } from 'antd';
import { useContext, useState } from 'react';
import { ExternalOrganizationLookupItem } from '../../auto-gen/interfaces';
import { PersonContext } from '../../services/person-context';
import { useGetArrayData } from '../../services/useGetArrayData';
import { OrgAffilations } from './organizational-affilations/organizational-affilations';
import { PersonHeader } from './person-header';
import { PersonalDetails } from './personal-details/personal-details';
const { Panel } = Collapse;
const { Text } = Typography;
export const Person = () => {
  const personContext = useContext(PersonContext);
  const externalOrganizationLookup =
    useGetArrayData<ExternalOrganizationLookupItem>(
      'externalOrganizationLookup'
    );

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
          extra={current.organizationalAffilations.affilations.map(
            (item, i) => (
              <span key={i}>
                <Text>
                  {externalOrganizationLookup.find(
                    (lookup) => lookup.id === item.externalOrganizationRef.refId
                  )?.name ?? item.externalOrganizationRef.new_value.name}{' '}
                </Text>
                <Tag color='processing'>{item.type}</Tag>
              </span>
            )
          )}
        >
          <OrgAffilations
            organizationalAffilations={current.organizationalAffilations}
            externalOrganizationLookup={externalOrganizationLookup}
            onChange={(v) =>
              personContext.update({ ...current, organizationalAffilations: v })
            }
          />
        </Panel>
      </Collapse>
    </Card>
  );
};
