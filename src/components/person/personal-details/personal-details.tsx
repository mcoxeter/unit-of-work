import {
  Collapse,
  DatePicker,
  Form,
  Input,
  Select,
  Tag,
  Typography
} from 'antd';
import moment from 'moment';
import { useContext, useState } from 'react';
import { PersonContext } from '../../../services/person-context';
import { useCountries } from '../../../services/useCountrys';
import { useNameVariantTypes } from '../../../services/useNameVariantTypes';
import { useTitleTypes } from '../../../services/useTitleTypes';
import { IdList } from './id-list';
import { NameVariantList } from './name-variant-list';
import { TitleList } from './title-list';
const { Option } = Select;
const { Panel } = Collapse;
const { Text } = Typography;

export const PersonalDetails = () => {
  const countries: string[] = useCountries();
  const personContext = useContext(PersonContext);
  const nameVariantTypes = useNameVariantTypes();
  const titleTypes = useTitleTypes();
  const current = personContext.current();
  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  if (current === undefined) {
    return null;
  }
  return (
    <>
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
          onChange={(v) => personContext.update({ ...current, nationality: v })}
        >
          {countries.map((x) => (
            <Option key={x} value={x}>
              {x}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        <Panel
          key={'variant-list'}
          header={'Variants'}
          extra={current.nameVariants.map((v) => (
            <>
              <Text>
                {v.forename} {v.surname}{' '}
              </Text>
              <Tag color='processing'>{v.type}</Tag>
            </>
          ))}
        >
          <NameVariantList
            nameVariants={current.nameVariants}
            nameVariantTypes={nameVariantTypes}
            onChange={(v) =>
              personContext.update({ ...current, nameVariants: v })
            }
          />
        </Panel>
        <Panel
          key={'title-list'}
          header={`Titles`}
          extra={current.titles.map((v) => (
            <>
              <Text>{v.title} </Text>
              <Tag color='processing'>{v.type}</Tag>
            </>
          ))}
        >
          <TitleList
            titles={current.titles}
            titleTypes={titleTypes}
            onChange={(v) => personContext.update({ ...current, titles: v })}
          />
        </Panel>
        <Panel
          key={'id-list'}
          header={`IDs`}
          extra={current.personId.map((v) => (
            <>
              <Text>{v.id} </Text>
              <Tag color='processing'>{v.type}</Tag>
            </>
          ))}
        >
          <IdList
            ids={current.personId}
            idTypes={[]}
            onChange={(v) => personContext.update({ ...current, personId: v })}
          />
        </Panel>
      </Collapse>
    </>
  );
};
