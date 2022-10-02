import { AddressesItem } from '../auto-gen/interfaces';
import {
  Alert,
  Button,
  Card,
  Collapse,
  DatePicker,
  Form,
  Input,
  PageHeader
} from 'antd';
import { AddressList } from './address-list';
import { useContext, useState } from 'react';
import { PersonContext } from '../services/person-context';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
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

  const addressesReducer = (addresses: AddressesItem[]) => ({
    ...current,
    addresses
  });

  const isModified = personContext.isModified();

  return (
    <Card size='small'>
      <PageHeader
        title='Person'
        avatar={{ size: 64, icon: <UserOutlined /> }}
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
                personContext.update({ ...current, forename: v.target.value })
              }
            />
          </Form.Item>
          <Form.Item label='Surname'>
            <Input
              type={'text'}
              value={current.surname}
              onChange={(v) =>
                personContext.update({ ...current, surname: v.target.value })
              }
            ></Input>
          </Form.Item>
          <Form.Item label='Age'>
            <Input
              type={'number'}
              value={current.age}
              onChange={(v) =>
                personContext.update({
                  ...current,
                  age: Number(v.target.value)
                })
              }
            ></Input>
          </Form.Item>
          <Form.Item label='Date of Birth'>
            <DatePicker
              allowClear={false}
              value={moment(current.dob)}
              onChange={(v) =>
                personContext.update({ ...current, dob: v?.toJSON() ?? '' })
              }
            />
          </Form.Item>
        </Panel>
        <Panel
          key={'Address List'}
          header={`Addresses: ${(current?.addresses ?? [])
            .map((x) => x.street1)
            .join(', ')}`}
        >
          <AddressList
            addresses={current?.addresses ?? []}
            onChange={(v) => personContext.update(addressesReducer(v))}
          />
        </Panel>
      </Collapse>
    </Card>
  );
};
