import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { useState } from 'react';
import { AffilationsItem } from '../../../auto-gen/interfaces';
import { Flex } from '../../flex';
import { ListOrderControl } from '../../list-order-control';
import { OrganizationalAffilation } from './organizational-affilation';
export interface OrganizationAffilationListProps {
  affilations: AffilationsItem[];
  onChange: (value: AffilationsItem[]) => void;
}

const { Panel } = Collapse;
export const OrganizationAffilationList = (
  props: OrganizationAffilationListProps
) => {
  const newItem: AffilationsItem = {
    affiliation: -1,
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
        onClick={() => props.onChange(affilations.concat(newItem))}
      >
        Add
      </Button>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {affilations.map((affilation, i) => (
          <Panel
            key={'Affilation' + i}
            header={`${affilation.affiliation}`}
            extra={
              <ListOrderControl
                index={i}
                values={affilations}
                onChange={props.onChange}
              />
            }
          >
            <OrganizationalAffilation
              key={i}
              affilationsItem={affilation}
              onChange={(value) => {
                return props.onChange(
                  affilations.map((_x, _i) => (_i === i ? value : _x))
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </Flex>
  );
};
