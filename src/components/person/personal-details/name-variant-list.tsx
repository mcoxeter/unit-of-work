import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse, Tag, Typography } from 'antd';
import { useState } from 'react';
import { NameVariantsItem } from '../../../auto-gen/interfaces';
import { Flex } from '../../flex';
import { ListOrderControl } from '../../list-order-control';
import { NameVariant } from './name-variant';
const { Text } = Typography;
export interface NameVariantListProps {
  nameVariants: NameVariantsItem[];
  nameVariantTypes: string[];
  onChange: (value: NameVariantsItem[]) => void;
}

const { Panel } = Collapse;
export const NameVariantList = (props: NameVariantListProps) => {
  const newItem: NameVariantsItem = {
    forename: '',
    surname: '',
    type: ''
  };

  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  const nameVariants = props.nameVariants;

  return (
    <Flex direction='Column'>
      <Button
        icon={<PlusOutlined />}
        type='dashed'
        onClick={() => props.onChange(nameVariants.concat(newItem))}
      >
        Add
      </Button>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {props.nameVariants.map((nameVariant, i) => (
          <Panel
            key={'Address' + i}
            header={`${nameVariant.forename} ${nameVariant.surname}`}
            extra={
              <ListOrderControl
                index={i}
                values={nameVariants}
                onChange={props.onChange}
              />
            }
          >
            <NameVariant
              key={i}
              nameVariant={nameVariant}
              nameVariantTypes={props.nameVariantTypes}
              onChange={(value) => {
                return props.onChange(
                  nameVariants.map((_x, _i) => (_i === i ? value : _x))
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </Flex>
  );
};

export const NameVariantListSummary = ({
  nameVariants
}: {
  nameVariants: NameVariantsItem[];
}) => {
  return (
    <>
      {nameVariants.map((v, i) => (
        <span key={i}>
          <Text>
            {v.forename} {v.surname}{' '}
          </Text>
          <Tag color='processing'>{v.type}</Tag>
        </span>
      ))}
    </>
  );
};
