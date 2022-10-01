import { AddressesItem, PersonsItem } from '../auto-gen/interfaces';
import { Form, Input } from 'antd';
import { AddressList } from './address-list';

export interface PersonProps {
  person: PersonsItem;
  onChange: (newPerson: PersonsItem) => void;
}

export const Person: React.FC<PersonProps> = (props: PersonProps) => {
  const fornameReducer = (forename: string) => ({ ...props.person, forename });
  const surnameReducer = (surname: string) => ({ ...props.person, surname });
  const addressesReducer = (addresses: AddressesItem[]) => ({
    ...props.person,
    addresses
  });

  return (
    <Form>
      <Form.Item label='Forename'>
        <Input
          type={'text'}
          value={props.person.forename}
          onChange={(v) => props.onChange(fornameReducer(v.target.value))}
        />
      </Form.Item>
      <Form.Item label='Surname'>
        <Input
          type={'text'}
          value={props.person.surname}
          onChange={(v) => props.onChange(surnameReducer(v.target.value))}
        ></Input>
      </Form.Item>

      <AddressList
        addresses={props.person.addresses}
        onChange={(v) => props.onChange(addressesReducer(v))}
      />
    </Form>
  );
};
