import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { useState } from 'react';
import { Flex } from '../../flex';
import { ListOrderControl } from '../../list-order-control';
import { OrcidID } from './orcid-id';
export interface OrcidIDListProps {
  orcidIDs: string[];
  onChange: (value: string[]) => void;
}

const { Panel } = Collapse;
export const OrcidIDList = (props: OrcidIDListProps) => {
  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  const orcidIDs = props.orcidIDs;

  return (
    <Flex direction='Column'>
      <Button
        icon={<PlusOutlined />}
        type='dashed'
        onClick={() => props.onChange(orcidIDs.concat(''))}
      >
        Add
      </Button>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {props.orcidIDs.map((orcidID, i) => (
          <Panel
            key={i}
            header={`${orcidID}`}
            extra={
              <ListOrderControl
                index={i}
                values={orcidIDs}
                onChange={props.onChange}
              />
            }
          >
            <OrcidID
              key={i}
              orcidID={orcidID}
              onChange={(value) => {
                return props.onChange(
                  orcidIDs.map((_x, _i) => (_i === i ? value : _x))
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </Flex>
  );
};
