import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
  UpOutlined
} from '@ant-design/icons';
import { Button, Collapse, PageHeader } from 'antd';
import { useState } from 'react';
import { NameVariantsItem } from '../../../auto-gen/interfaces';
import { Flex } from '../../flex';
import { down, up } from '../../../array-utils';
import { NameVariant } from './name-variant';
export interface NameVariantListProps {
  nameVariants: NameVariantsItem[];
  nameVariantTypes: string[];
  onChange: (value: NameVariantsItem[]) => void;
}

const { Panel } = Collapse;
export const NameVariantList = (props: NameVariantListProps) => {
  const upActive = (i: number) => i > 0;
  const downActive = (i: number) => i < props.nameVariants.length - 1;
  const newItem: NameVariantsItem = {
    forename: '',
    surname: '',
    type: ''
  };

  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  const nameVariants = props.nameVariants;

  return (
    <>
      <PageHeader
        title='NameVariants'
        extra={[
          <Button
            icon={<PlusOutlined />}
            type='dashed'
            onClick={() => props.onChange(nameVariants.concat(newItem))}
          >
            Add
          </Button>
        ]}
      ></PageHeader>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {props.nameVariants.map((nameVariant, i) => (
          <Panel
            key={'Address' + i}
            header={`${nameVariant.forename} ${nameVariant.surname}`}
            extra={[
              <Flex>
                <Button
                  type='default'
                  icon={<UpOutlined />}
                  disabled={!upActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(up(nameVariants, i));
                  }}
                />
                <Button
                  type='default'
                  icon={<DownOutlined />}
                  disabled={!downActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(down(nameVariants, i));
                  }}
                />
                <Button
                  type='default'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(nameVariants.filter((_, _i) => i !== _i));
                  }}
                />
              </Flex>
            ]}
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
    </>
  );
};
