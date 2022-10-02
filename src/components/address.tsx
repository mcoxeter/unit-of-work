import { Card, Form, Input } from 'antd';
import { AddressesItem } from '../auto-gen/interfaces';

export interface AddressProps {
  address: AddressesItem;
  onChange: (newAddress: AddressesItem) => void;
}

export const Address = (props: AddressProps) => {
  const street1Reducer = (street1: string) => ({ ...props.address, street1 });
  const street2Reducer = (street2: string) => ({ ...props.address, street2 });
  const postcodeReducer = (postcode: string) => ({
    ...props.address,
    postcode
  });

  return (
    <Card title='Address' actions={[]}>
      <Form.Item label='Street 1'>
        <Input
          type={'text'}
          value={props.address.street1}
          onChange={(v) => props.onChange(street1Reducer(v.target.value))}
        />
      </Form.Item>
      <Form.Item label='Street 2'>
        <Input
          type={'text'}
          value={props.address.street2}
          onChange={(v) => props.onChange(street2Reducer(v.target.value))}
        ></Input>
      </Form.Item>
      <Form.Item label='Postcode'>
        <Input
          type={'text'}
          value={props.address.postcode}
          onChange={(v) => props.onChange(postcodeReducer(v.target.value))}
        ></Input>
      </Form.Item>
    </Card>
  );
};
