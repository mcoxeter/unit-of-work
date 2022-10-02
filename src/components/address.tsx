import { Card, Form, Input } from 'antd';
import { AddressesItem } from '../auto-gen/interfaces';

export interface AddressProps {
  address: AddressesItem;
  onChange: (newAddress: AddressesItem) => void;
}

export const Address = (props: AddressProps) => {
  const address = props.address;

  return (
    <Card title='Address' actions={[]}>
      <Form.Item label='Street 1'>
        <Input
          type={'text'}
          value={props.address.street1}
          onChange={(v) =>
            props.onChange({ ...address, street1: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Street 2'>
        <Input
          type={'text'}
          value={props.address.street2}
          onChange={(v) =>
            props.onChange({ ...address, street2: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Postcode'>
        <Input
          type={'text'}
          value={props.address.postcode}
          onChange={(v) =>
            props.onChange({ ...address, postcode: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='City'>
        <Input
          type={'text'}
          value={props.address.city}
          onChange={(v) => props.onChange({ ...address, city: v.target.value })}
        />
      </Form.Item>
      <Form.Item label='Country'>
        <Input
          type={'text'}
          value={props.address.country}
          onChange={(v) =>
            props.onChange({ ...address, country: v.target.value })
          }
        />
      </Form.Item>
    </Card>
  );
};
