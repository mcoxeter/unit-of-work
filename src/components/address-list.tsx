import { AddressesItem } from '../auto-gen/interfaces';
import { Address } from './address';
import { Button, Collapse, PageHeader } from 'antd';
import { useState } from 'react';
import { Flex } from './flex';
import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
  UpOutlined
} from '@ant-design/icons';
import { down, up } from '../array-utils';
const { Panel } = Collapse;

export interface AddressListProps {
  addresses: AddressesItem[];
  onChange: (addresses: AddressesItem[]) => void;
}
export const AddressList = (props: AddressListProps) => {
  const upActive = (i: number) => i > 0;
  const downActive = (i: number) => i < props.addresses.length - 1;

  const [activePanels, setActivePanels] = useState<string[] | string>([]);
  const newItem: AddressesItem = {
    street1: '',
    street2: '',
    postcode: '',
    city: '',
    country: ''
  };

  return (
    <>
      <PageHeader
        title='Addresses'
        extra={[
          <Button
            icon={<PlusOutlined />}
            type='dashed'
            onClick={() => props.onChange(props.addresses.concat(newItem))}
          >
            Add
          </Button>
        ]}
      ></PageHeader>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {props.addresses.map((address, i) => (
          <Panel
            key={'Address' + i}
            header={address.street1}
            extra={[
              <Flex>
                <Button
                  type='default'
                  icon={<UpOutlined />}
                  disabled={!upActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(up(props.addresses, i));
                  }}
                />
                <Button
                  type='default'
                  icon={<DownOutlined />}
                  disabled={!downActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(down(props.addresses, i));
                  }}
                />
                <Button
                  type='default'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(props.addresses.filter((_, _i) => i !== _i));
                  }}
                />
              </Flex>
            ]}
          >
            <Address
              key={i}
              address={address}
              onChange={(changedAddress) => {
                return props.onChange(
                  props.addresses.map((_x, _i) =>
                    _i === i ? changedAddress : _x
                  )
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </>
  );
};
