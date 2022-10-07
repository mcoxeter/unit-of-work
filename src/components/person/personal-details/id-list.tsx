import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { useState } from 'react';
import { PersonIdItem } from '../../../auto-gen/interfaces';
import { Flex } from '../../flex';
import { ListOrderControl } from '../../list-order-control';
import { Id } from './id';
export interface IdListProps {
  ids: PersonIdItem[];
  idTypes: string[];
  onChange: (value: PersonIdItem[]) => void;
}

const { Panel } = Collapse;
export const IdList = (props: IdListProps) => {
  const newId: PersonIdItem = {
    type: '',
    id: '',
    verificationStatus: ''
  };

  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  const ids = props.ids;

  return (
    <Flex direction='Column'>
      <Button
        icon={<PlusOutlined />}
        type='dashed'
        onClick={() => props.onChange(ids.concat(newId))}
      >
        Add
      </Button>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {props.ids.map((id, i) => (
          <Panel
            key={'Id' + i}
            header={`${id.id} ${id.type}`}
            extra={
              <ListOrderControl
                index={i}
                values={ids}
                onChange={props.onChange}
              />
            }
          >
            <Id
              key={i}
              id={id}
              idTypes={props.idTypes}
              onChange={(value) => {
                return props.onChange(
                  ids.map((_x, _i) => (_i === i ? value : _x))
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </Flex>
  );
};
