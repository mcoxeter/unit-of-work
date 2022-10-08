import { Form, Input, Select } from 'antd';
import { LinksItem } from '../../../auto-gen/interfaces';

const { Option } = Select;

export interface LinkProps {
  link: LinksItem;
  linkTypes: string[];
  onChange: (value: LinksItem) => void;
}

export const Link = (props: LinkProps) => {
  const link = props.link;

  return (
    <>
      <Form.Item label='Url'>
        <Input
          type={'text'}
          value={link.url}
          onChange={(v) => props.onChange({ ...link, url: v.target.value })}
        />
      </Form.Item>
      <Form.Item label='Description'>
        <Input
          type={'text'}
          value={link.description}
          onChange={(v) =>
            props.onChange({ ...link, description: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Type'>
        <Select
          showSearch
          value={link.type}
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
          onChange={(v) => props.onChange({ ...link, type: v })}
        >
          {props.linkTypes.map((x) => (
            <Option key={x} value={x}>
              {x}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
