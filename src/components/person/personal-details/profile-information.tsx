import { Form, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ProfileInformationItem } from '../../../auto-gen/interfaces';

const { Option } = Select;

export interface ProfileInformationProps {
  profileInformation: ProfileInformationItem;
  profileInformationTypes: string[];
  onChange: (value: ProfileInformationItem) => void;
}

export const ProfileInformation = (props: ProfileInformationProps) => {
  const profileInformation = props.profileInformation;

  return (
    <>
      <Form.Item label='Text'>
        <TextArea
          value={profileInformation.text}
          onChange={(v) =>
            props.onChange({ ...profileInformation, text: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Type'>
        <Select
          showSearch
          value={profileInformation.type}
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
          onChange={(v) => props.onChange({ ...profileInformation, type: v })}
        >
          {props.profileInformationTypes.map((x) => (
            <Option key={x} value={x}>
              {x}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
