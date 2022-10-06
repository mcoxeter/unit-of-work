import { DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import { useContext } from 'react';
import { PersonContext } from '../../../services/person-context';
import { useCountries } from '../../../services/useCountrys';
import { useNameVariantTypes } from '../../../services/useNameVariantTypes';
import { useTitleTypes } from '../../../services/useTitleTypes';
import { IdList } from './id-list';
import { NameVariantList } from './name-variant-list';
import { TitleList } from './title-list';
const { Option } = Select;

export const PersonalDetails = () => {
  const countries: string[] = useCountries();
  const personContext = useContext(PersonContext);
  const nameVariantTypes = useNameVariantTypes();
  const titleTypes = useTitleTypes();
  const current = personContext.current();
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
      <NameVariantList
        nameVariants={current.nameVariants}
        nameVariantTypes={nameVariantTypes}
        onChange={(v) => personContext.update({ ...current, nameVariants: v })}
      />
      <TitleList
        titles={current.titles}
        titleTypes={titleTypes}
        onChange={(v) => personContext.update({ ...current, titles: v })}
      />
      <IdList
        ids={current.personId}
        idTypes={[]}
        onChange={(v) => personContext.update({ ...current, personId: v })}
      />
    </>
  );
};
