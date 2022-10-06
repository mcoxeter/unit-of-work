import { Form, Input, Select } from 'antd';
import { TitlesItem } from '../../../auto-gen/interfaces';

const { Option } = Select;

export interface TitleProps {
  title: TitlesItem;
  titleTypes: string[];
  onChange: (value: TitlesItem) => void;
}

export const Title = (props: TitleProps) => {
  const title = props.title;

  return (
    <>
      <Form.Item label='Forename'>
        <Input
          type={'text'}
          value={title.title}
          onChange={(v) => props.onChange({ ...title, title: v.target.value })}
        />
      </Form.Item>
      <Form.Item label='Type'>
        <Select
          showSearch
          value={title.type}
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
          onChange={(v) => props.onChange({ ...title, type: v })}
        >
          {props.titleTypes.map((x) => (
            <Option key={x} value={x}>
              {x}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
