import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
  UpOutlined
} from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { useState } from 'react';
import { down, up } from '../../../array-utils';
import { Flex } from '../../flex';
import { OrcidID } from './orcid-id';
export interface OrcidIDListProps {
  orcidIDs: string[];
  onChange: (value: string[]) => void;
}

const { Panel } = Collapse;
export const OrcidIDList = (props: OrcidIDListProps) => {
  const upActive = (i: number) => i > 0;
  const downActive = (i: number) => i < props.orcidIDs.length - 1;

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
            extra={[
              <Flex>
                <Button
                  type='default'
                  icon={<UpOutlined />}
                  disabled={!upActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(up(orcidIDs, i));
                  }}
                />
                <Button
                  type='default'
                  icon={<DownOutlined />}
                  disabled={!downActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(down(orcidIDs, i));
                  }}
                />
                <Button
                  type='default'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(orcidIDs.filter((_, _i) => i !== _i));
                  }}
                />
              </Flex>
            ]}
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
