import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
  UpOutlined
} from '@ant-design/icons';
import { Button, Collapse, PageHeader } from 'antd';
import { useState } from 'react';
import { down, up } from '../../../array-utils';
import { PersonIdItem } from '../../../auto-gen/interfaces';
import { Flex } from '../../flex';
import { Id } from './id';
export interface IdListProps {
  ids: PersonIdItem[];
  idTypes: string[];
  onChange: (value: PersonIdItem[]) => void;
}

const { Panel } = Collapse;
export const IdList = (props: IdListProps) => {
  const upActive = (i: number) => i > 0;
  const downActive = (i: number) => i < props.ids.length - 1;
  const newId: PersonIdItem = {
    type: '',
    id: '',
    verificationStatus: ''
  };

  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  const ids = props.ids;

  return (
    <>
      <PageHeader
        title='IDs'
        extra={[
          <Button
            icon={<PlusOutlined />}
            type='dashed'
            onClick={() => props.onChange(ids.concat(newId))}
          >
            Add
          </Button>
        ]}
      ></PageHeader>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {props.ids.map((id, i) => (
          <Panel
            key={'Address' + i}
            header={`${id.id} ${id.type}`}
            extra={[
              <Flex>
                <Button
                  type='default'
                  icon={<UpOutlined />}
                  disabled={!upActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(up(ids, i));
                  }}
                />
                <Button
                  type='default'
                  icon={<DownOutlined />}
                  disabled={!downActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(down(ids, i));
                  }}
                />
                <Button
                  type='default'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(ids.filter((_, _i) => i !== _i));
                  }}
                />
              </Flex>
            ]}
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
    </>
  );
};
