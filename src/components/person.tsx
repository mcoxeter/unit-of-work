import { AddressesItem } from '../auto-gen/interfaces';
import { Alert, Button, Form, Input } from 'antd';
import { AddressList } from './address-list';
import { useContext } from 'react';
import { PersonContext } from '../services/person-context';
import { Flex } from './flex';

export const Person = () => {
  const personContext = useContext(PersonContext);

  const current = personContext.current();
  if (current === undefined) {
    return null;
  }

  const fornameReducer = (forename: string) => ({ ...current, forename });
  const surnameReducer = (surname: string) => ({ ...current, surname });
  const addressesReducer = (addresses: AddressesItem[]) => ({
    ...current,
    addresses
  });

  const isModified = personContext.isModified();

  return (
    <>
      <Alert
        type={isModified ? 'info' : 'success'}
        message={isModified ? 'Data unsaved' : 'Data saved'}
      ></Alert>
      <Flex direction='Row'>
        <Button
          type='primary'
          disabled={isModified === false}
          onClick={async () => await personContext.save()}
        >
          Save
        </Button>
        <Button
          type='default'
          disabled={isModified === false}
          onClick={() => personContext.rollback()}
        >
          Restore
        </Button>
      </Flex>
      <Form>
        <Form.Item label='Forename'>
          <Input
            type={'text'}
            value={current?.forename}
            onChange={(v) =>
              personContext.update(fornameReducer(v.target.value))
            }
          />
        </Form.Item>
        <Form.Item label='Surname'>
          <Input
            type={'text'}
            value={current?.surname}
            onChange={(v) =>
              personContext.update(surnameReducer(v.target.value))
            }
          ></Input>
        </Form.Item>

        <AddressList
          addresses={current?.addresses ?? []}
          onChange={(v) => personContext.update(addressesReducer(v))}
        />
      </Form>
    </>
  );
};
