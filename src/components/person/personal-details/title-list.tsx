import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
  UpOutlined
} from '@ant-design/icons';
import { Button, Collapse, PageHeader } from 'antd';
import { useState } from 'react';
import { TitlesItem } from '../../../auto-gen/interfaces';
import { Flex } from '../../flex';
import { down, up } from '../../../array-utils';
import { Title } from './title';
export interface TitleListProps {
  titles: TitlesItem[];
  titleTypes: string[];
  onChange: (value: TitlesItem[]) => void;
}

const { Panel } = Collapse;
export const TitleList = (props: TitleListProps) => {
  const upActive = (i: number) => i > 0;
  const downActive = (i: number) => i < props.titles.length - 1;
  const newItem: TitlesItem = {
    title: '',
    type: ''
  };

  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  const titles = props.titles;

  return (
    <>
      <PageHeader
        title='Titles'
        extra={[
          <Button
            icon={<PlusOutlined />}
            type='dashed'
            onClick={() => props.onChange(titles.concat(newItem))}
          >
            Add
          </Button>
        ]}
      ></PageHeader>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {props.titles.map((title, i) => (
          <Panel
            key={'Address' + i}
            header={`${title.title}`}
            extra={[
              <Flex>
                <Button
                  type='default'
                  icon={<UpOutlined />}
                  disabled={!upActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(up(titles, i));
                  }}
                />
                <Button
                  type='default'
                  icon={<DownOutlined />}
                  disabled={!downActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(down(titles, i));
                  }}
                />
                <Button
                  type='default'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(titles.filter((_, _i) => i !== _i));
                  }}
                />
              </Flex>
            ]}
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
    </>
  );
};
