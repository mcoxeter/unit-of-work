import { AddressesItem } from '../auto-gen/interfaces';
import { Flex } from './flex';
import { Address } from './address';
import { Button } from 'antd';

export interface AddressListProps {
  addresses: AddressesItem[];
  onChange: (addresses: AddressesItem[]) => void;
}
export const AddressList = (props: AddressListProps) => {
  const newItem: AddressesItem = {
    street1: '',
    street2: '',
    postcode: '',
    city: '',
    country: ''
  };

  return (
    <Flex direction={'Column'}>
      {props.addresses.map((address, i) => (
        <Address
          key={i}
          address={address}
          onChange={(changedAddress) => {
            return props.onChange(
              props.addresses.map((_x, _i) => (_i === i ? changedAddress : _x))
            );
          }}
        ></Address>
      ))}
      <Button
        type='primary'
        onClick={() => props.onChange(props.addresses.concat(newItem))}
      >
        Add
      </Button>
    </Flex>
  );
};
