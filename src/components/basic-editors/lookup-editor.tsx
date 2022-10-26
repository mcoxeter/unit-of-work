import { Form, Select } from 'antd';
const { Option } = Select;

export interface LookupEditorProps {
  label: string;
  value: string;
  choices: string[];
  onChange: (value: string) => void;
}
export const LookupEditor = ({
  label,
  value,
  choices,
  onChange
}: LookupEditorProps) => (
  <Form.Item label={label}>
    <Select
      showSearch
      value={value}
      style={{ width: 200 }}
      placeholder='Search to Select'
      optionFilterProp='children'
      filterOption={(input, option) =>
        (option!.children as unknown as string).includes(input)
      }
      filterSort={(optionA, optionB) =>
        (optionA!.children as unknown as string)
          .toLowerCase()
          .localeCompare((optionB!.children as unknown as string).toLowerCase())
      }
      onChange={(v) => onChange(v)}
    >
      {choices.map((v) => (
        <Option key={v} value={v}>
          {v}
        </Option>
      ))}
    </Select>
  </Form.Item>
);
