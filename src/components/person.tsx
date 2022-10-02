import { AddressesItem } from '../auto-gen/interfaces';
import { Alert, Button, Card, Collapse, Form, Input, PageHeader } from 'antd';
import { AddressList } from './address-list';
import { useContext, useState } from 'react';
import { PersonContext } from '../services/person-context';
const { Panel } = Collapse;

export const Person = () => {
  const personContext = useContext(PersonContext);
  const [activePanels, setActivePanels] = useState<string[] | string>([
    'Personal details'
  ]);

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
    <Card size='small'>
      <PageHeader
        title='Person'
        subTitle={`${current.forename} ${current.surname}`}
        extra={[
          <Button
            type='primary'
            disabled={isModified === false}
            onClick={async () => await personContext.save()}
          >
            Save
          </Button>,
          <Button
            type='default'
            disabled={isModified === false}
            onClick={() => personContext.rollback()}
          >
            Restore
          </Button>,
          <Alert
            type={isModified ? 'warning' : 'success'}
            message={isModified ? 'Data unsaved' : 'Data saved'}
          ></Alert>
        ]}
      ></PageHeader>

      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        <Panel
          key={'Personal details'}
          header={`${current.forename} ${current.surname}`}
        >
          <Form.Item label='Forename'>
            <Input
              type={'text'}
              value={current.forename}
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
        </Panel>
        <Panel key={'Address List'} header='Address List'>
          <AddressList
            addresses={current?.addresses ?? []}
            onChange={(v) => personContext.update(addressesReducer(v))}
          />
        </Panel>
      </Collapse>
    </Card>
  );
};
