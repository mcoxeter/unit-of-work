import { Form, Input, Select } from 'antd';
import { NameVariantsItem } from '../../../auto-gen/interfaces';

const { Option } = Select;

export interface NameVariantProps {
  nameVariant: NameVariantsItem;
  nameVariantTypes: string[];
  onChange: (value: NameVariantsItem) => void;
}

export const NameVariant = (props: NameVariantProps) => {
  const nameVariant = props.nameVariant;

  return (
    <>
      <Form.Item label='Forename'>
        <Input
          type={'text'}
          value={nameVariant.forename}
          onChange={(v) =>
            props.onChange({ ...nameVariant, forename: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Surname'>
        <Input
          type={'text'}
          value={nameVariant.surname}
          onChange={(v) =>
            props.onChange({ ...nameVariant, surname: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Type'>
        <Select
          showSearch
          value={nameVariant.type}
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
          onChange={(v) => props.onChange({ ...nameVariant, type: v })}
        >
          {props.nameVariantTypes.map((x) => (
            <Option key={x} value={x}>
              {x}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
