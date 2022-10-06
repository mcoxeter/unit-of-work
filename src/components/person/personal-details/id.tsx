import { Form, Input, Select } from 'antd';
import { PersonIdItem } from '../../../auto-gen/interfaces';

const { Option } = Select;

export interface IdProps {
  id: PersonIdItem;
  idTypes: string[];
  onChange: (value: PersonIdItem) => void;
}

export const Id = (props: IdProps) => {
  const id = props.id;

  return (
    <>
      <Form.Item label='Forename'>
        <Input
          type={'text'}
          value={id.id}
          onChange={(v) => props.onChange({ ...id, id: v.target.value })}
        />
      </Form.Item>
      <Form.Item label='Surname'>
        <Input
          type={'text'}
          value={id.type}
          onChange={(v) => props.onChange({ ...id, type: v.target.value })}
        />
      </Form.Item>
      <Form.Item label='Type'>
        <Select
          showSearch
          value={id.type}
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
          onChange={(v) => props.onChange({ ...id, type: v })}
        >
          {props.idTypes.map((x) => (
            <Option key={x} value={x}>
              {x}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
