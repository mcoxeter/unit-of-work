import {
  Button,
  Card,
  Collapse,
  DatePicker,
  Form,
  Input,
  PageHeader,
  Progress,
  Select,
  Tag,
  Typography
} from 'antd';
import { useContext, useState } from 'react';
import { PersonContext } from '../services/person-context';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import { useCountries } from '../services/useCountrys';
import { useNameVariantTypes } from '../services/useNameVariantTypes';
import { NameVariantList } from './name-variant-list';
import { Flex } from './flex';
const { Panel } = Collapse;
const { Option } = Select;
const { Text } = Typography;

export const Person = () => {
  const countries: string[] = useCountries();
  const personContext = useContext(PersonContext);
  const nameVariantTypes = useNameVariantTypes();
  const [activePanels, setActivePanels] = useState<string[] | string>([
    'Personal details'
  ]);

  const current = personContext.current();
  if (current === undefined) {
    return null;
  }

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
          <Progress
            type='circle'
            format={() => (isModified ? 'Dirty' : 'Saved')}
            width={50}
            status={isModified ? 'exception' : 'success'}
          />
        ]}
      ></PageHeader>

      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        <Panel
          key={'Personal details'}
          header={`Personal details`}
          extra={[
            <Tag color='success'>
              {current.forename} {current.surname}
            </Tag>
          ]}
        >
          <Form.Item label='Forename'>
            <Input
              type={'text'}
              value={current.forename}
              onChange={(v) => {
                personContext.update({ ...current, forename: v.target.value });
              }}
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
          <Form.Item label='Gender'>
            <Select
              showSearch
              value={current.gender}
              style={{ width: 200 }}
              placeholder='Search to Select'
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option!.children as unknown as string).includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA!.children as unknown as string)
                  .toLowerCase()
                  .localeCompare(
                    (optionB!.children as unknown as string).toLowerCase()
                  )
              }
              onChange={(v) => personContext.update({ ...current, gender: v })}
            >
              <Option value='Male'>Male</Option>
              <Option value='Female'>Female</Option>
              <Option value='Unknown'>Unknown</Option>
            </Select>
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
          <Form.Item label='Nationality'>
            <Select
              showSearch
              value={current.nationality}
              style={{ width: 200 }}
              placeholder='Search to Select'
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option!.children as unknown as string).includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA!.children as unknown as string)
                  .toLowerCase()
                  .localeCompare(
                    (optionB!.children as unknown as string).toLowerCase()
                  )
              }
              onChange={(v) =>
                personContext.update({ ...current, nationality: v })
              }
            >
              {countries.map((x) => (
                <Option key={x} value={x}>
                  {x}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Panel>
        <Panel
          key={'Name Variant List'}
          header={'Name Variants'}
          extra={(current.nameVariants ?? []).map((x, i) => {
            return (
              <Flex>
                <Text>
                  {x.forename} {x.surname}
                </Text>
                {x.type && <Tag color='success'>{x.type}</Tag>}
              </Flex>
            );
          })}
        >
          <NameVariantList
            nameVariants={current.nameVariants}
            nameVariantTypes={nameVariantTypes}
            onChange={(v) =>
              personContext.update({ ...current, nameVariants: v })
            }
          />
        </Panel>
      </Collapse>
    </Card>
  );
};
