import { AddressesItem } from '../auto-gen/interfaces';
import { Address } from './address';
import { Button, Card, Collapse, PageHeader } from 'antd';
import { useState } from 'react';
import { Flex } from './flex';
import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
  UpOutlined
} from '@ant-design/icons';
const { Panel } = Collapse;

export interface AddressListProps {
  addresses: AddressesItem[];
  onChange: (addresses: AddressesItem[]) => void;
}
export const AddressList = (props: AddressListProps) => {
  const upActive = (i: number) => i > 0;
  const downActive = (i: number) => i < props.addresses.length - 1;
  const up = (i: number) => {
    if (upActive(i)) {
      const copy = [...props.addresses];
      let temp = copy[i - 1];
      copy[i - 1] = copy[i];
      copy[i] = temp;
      props.onChange(copy);
    }
  };

  const down = (i: number) => {
    if (downActive(i)) {
      const copy = [...props.addresses];
      let temp = copy[i + 1];
      copy[i + 1] = copy[i];
      copy[i] = temp;
      props.onChange(copy);
    }
  };

  const [activePanels, setActivePanels] = useState<string[] | string>([]);
  const newItem: AddressesItem = {
    street1: '',
    street2: '',
    postcode: '',
    city: '',
    country: ''
  };

  return (
    <Card>
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
                    up(i);
                  }}
                />
                <Button
                  type='default'
                  icon={<DownOutlined />}
                  disabled={!downActive(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    down(i);
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
    </Card>
  );
};
