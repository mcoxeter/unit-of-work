import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { useState } from 'react';
import { LinksItem } from '../../../auto-gen/interfaces';
import { Flex } from '../../flex';
import { ListOrderControl } from '../../list-order-control';
import { Link } from './link';
export interface LinkListProps {
  links: LinksItem[];
  linkTypes: string[];
  onChange: (value: LinksItem[]) => void;
}

const { Panel } = Collapse;
export const LinkList = (props: LinkListProps) => {
  const newItem: LinksItem = {
    url: '',
    description: '',
    type: ''
  };

  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  const links = props.links;

  return (
    <Flex direction='Column'>
      <Button
        icon={<PlusOutlined />}
        type='dashed'
        onClick={() => props.onChange(links.concat(newItem))}
      >
        Add
      </Button>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {links.map((link, i) => (
          <Panel
            key={'Link' + i}
            header={`${link.url}`}
            extra={
              <ListOrderControl
                index={i}
                values={links}
                onChange={props.onChange}
              />
            }
          >
            <Link
              key={i}
              link={link}
              linkTypes={props.linkTypes}
              onChange={(value) => {
                return props.onChange(
                  links.map((_x, _i) => (_i === i ? value : _x))
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </Flex>
  );
};
