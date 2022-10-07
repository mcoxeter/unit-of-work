import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { useState } from 'react';
import { TitlesItem } from '../../../auto-gen/interfaces';
import { Flex } from '../../flex';
import { ListOrderControl } from '../../list-order-control';
import { Title } from './title';
export interface TitleListProps {
  titles: TitlesItem[];
  titleTypes: string[];
  onChange: (value: TitlesItem[]) => void;
}

const { Panel } = Collapse;
export const TitleList = (props: TitleListProps) => {
  const newItem: TitlesItem = {
    title: '',
    type: ''
  };

  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  const titles = props.titles;

  return (
    <Flex direction='Column'>
      <Button
        icon={<PlusOutlined />}
        type='dashed'
        onClick={() => props.onChange(titles.concat(newItem))}
      >
        Add
      </Button>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {props.titles.map((title, i) => (
          <Panel
            key={'Address' + i}
            header={`${title.title}`}
            extra={
              <ListOrderControl
                index={i}
                values={titles}
                onChange={props.onChange}
              />
            }
          >
            <Title
              key={i}
              title={title}
              titleTypes={props.titleTypes}
              onChange={(value) => {
                return props.onChange(
                  titles.map((_x, _i) => (_i === i ? value : _x))
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </Flex>
  );
};
