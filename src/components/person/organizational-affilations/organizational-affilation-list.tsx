import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { useState } from 'react';
import {
  AffilationsItem,
  ExternalOrganizationLookupItem
} from '../../../auto-gen/interfaces';
import { Flex } from '../../flex';
import { ListOrderControl } from '../../list-order-control';
import { NewAffilation } from './new-affilation';
import { StaffAffilation } from './staff-affilation';
import { StudentAffilation } from './student-affilation';
export interface OrganizationAffilationListProps {
  affilations: AffilationsItem[];
  externalOrganizationLookup: ExternalOrganizationLookupItem[];
  onChange: (value: AffilationsItem[]) => void;
}

const { Panel } = Collapse;
export const OrganizationAffilationList = (
  props: OrganizationAffilationListProps
) => {
  const newItem: AffilationsItem = {
    externalOrganizationRef: {
      refId: -1,
      new_value: {
        name: '',
        unit: ''
      }
    },
    contractType: '',
    electronicAddresses: {
      emailAddresses: [],
      phoneNumbers: [],
      webAddresses: []
    },
    employedAs: '',
    endDate: '',
    fte: '',
    id: 0,
    jobTitle: '',
    jobDescription: '',
    keywords: {
      exOfficio: [],
      grade: []
    },
    physicalAddresses: [],
    staffId: '',
    type: '',
    startDate: ''
  };

  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  const affilations = props.affilations;

  return (
    <Flex direction='Column'>
      <Button
        icon={<PlusOutlined />}
        type='dashed'
        onClick={() => {
          props.onChange(affilations.concat(newItem));
          setActivePanels((old) =>
            old.concat(`Affilation${affilations.length}`)
          );
        }}
      >
        Add
      </Button>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {affilations.map((affilation, i) => (
          <Panel
            key={'Affilation' + i}
            header={`${affilation.type} Affilation${i}`}
            extra={
              <ListOrderControl
                index={i}
                values={props.affilations}
                onChange={props.onChange}
              />
            }
          >
            {affilation.type === 'Staff' && (
              <StaffAffilation
                affilationsItem={affilation}
                externalOrganizationLookup={props.externalOrganizationLookup}
                onChange={(value) => {
                  return props.onChange(
                    props.affilations.map((_x, _i) => (_i === i ? value : _x))
                  );
                }}
              />
            )}
            {affilation.type === 'Student' && (
              <StudentAffilation
                affilationsItem={affilation}
                onChange={(value) => {
                  return props.onChange(
                    props.affilations.map((_x, _i) => (_i === i ? value : _x))
                  );
                }}
              />
            )}
            {affilation.type === '' && (
              <NewAffilation
                affilationsItem={affilation}
                onChange={(value) => {
                  return props.onChange(
                    props.affilations.map((_x, _i) => (_i === i ? value : _x))
                  );
                }}
              />
            )}
          </Panel>
        ))}
      </Collapse>
    </Flex>
  );
};
