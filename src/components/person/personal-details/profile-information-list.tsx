import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { useState } from 'react';
import { ProfileInformationItem } from '../../../auto-gen/interfaces';
import { Flex } from '../../flex';
import { ListOrderControl } from '../../list-order-control';
import { ProfileInformation } from './profile-information';
export interface ProfileInformationListProps {
  profileInformations: ProfileInformationItem[];
  profileInformationTypes: string[];
  onChange: (value: ProfileInformationItem[]) => void;
}

const { Panel } = Collapse;
export const ProfileInformationList = (props: ProfileInformationListProps) => {
  const newItem: ProfileInformationItem = {
    text: '',
    type: ''
  };

  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  const profileInformations = props.profileInformations;

  return (
    <Flex direction='Column'>
      <Button
        icon={<PlusOutlined />}
        type='dashed'
        onClick={() => props.onChange(profileInformations.concat(newItem))}
      >
        Add
      </Button>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {props.profileInformations.map((profileInformation, i) => (
          <Panel
            key={'Address' + i}
            header={`${profileInformation.text}`}
            extra={
              <ListOrderControl
                index={i}
                values={profileInformations}
                onChange={props.onChange}
              />
            }
          >
            <ProfileInformation
              key={i}
              profileInformation={profileInformation}
              profileInformationTypes={props.profileInformationTypes}
              onChange={(value) => {
                return props.onChange(
                  profileInformations.map((_x, _i) => (_i === i ? value : _x))
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </Flex>
  );
};
