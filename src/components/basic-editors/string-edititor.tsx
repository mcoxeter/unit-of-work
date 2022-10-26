import { Form, Input } from 'antd';

export interface StringEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}
export const StringEditor = ({ label, value, onChange }: StringEditorProps) => (
  <Form.Item label={label}>
    <Input
      type={'text'}
      value={value}
      onChange={(v) => onChange(v.target.value)}
    ></Input>
  </Form.Item>
);
