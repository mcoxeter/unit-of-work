import { Form, Select } from 'antd';
import { AffilationsItem } from '../../../auto-gen/interfaces';
import { useGetArrayData } from '../../../services/useGetArrayData';

export interface NewAffilationProps {
  affilationsItem: AffilationsItem;
  onChange: (value: AffilationsItem) => void;
}
const { Option } = Select;
export const NewAffilation = (props: NewAffilationProps) => {
  const organizationAffiliationTypes = useGetArrayData<string>(
    'organizationAffiliationTypes'
  );
  const affilationsItem = props.affilationsItem;

  return (
    <>
      <Form.Item label='Type'>
        <Select
          showSearch
          value={affilationsItem.type}
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
          onChange={(v) => props.onChange({ ...affilationsItem, type: v })}
        >
          {organizationAffiliationTypes.map((x) => (
            <Option key={x} value={x}>
              {x}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
