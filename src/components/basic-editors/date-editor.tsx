import { DatePicker, Form } from 'antd';
import moment from 'moment';

export interface DateEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}
export const DateEditor = ({ label, value, onChange }: DateEditorProps) => (
  <Form.Item label={label}>
    <DatePicker
      allowClear={false}
      value={moment(value)}
      onChange={(v) => onChange(v?.toJSON() ?? '')}
    />
  </Form.Item>
);
