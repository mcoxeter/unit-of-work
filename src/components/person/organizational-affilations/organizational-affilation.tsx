import { DatePicker, Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import {
  AffilationsItem,
  ExternalOrganizationLookupItem
} from '../../../auto-gen/interfaces';
import { useGetArrayData } from '../../../services/useGetArrayData';
import { ExternalOrganization } from './external-organization';
const { Option } = Select;

export interface OrganizationalAffilationProps {
  affilationsItem: AffilationsItem;
  externalOrganizationLookup: ExternalOrganizationLookupItem[];
  onChange: (value: AffilationsItem) => void;
}

export const OrganizationalAffilation = (
  props: OrganizationalAffilationProps
) => {
  const affilationsItem = props.affilationsItem;
  const contractTypes = useGetArrayData<string>('contractTypes');

  return (
    <>
      <ExternalOrganization
        externalOrganizationRef={affilationsItem.externalOrganizationRef}
        externalOrganizationLookup={props.externalOrganizationLookup}
        onChange={(v) =>
          props.onChange({ ...affilationsItem, externalOrganizationRef: v })
        }
      />
      <Form.Item label='Employed As'>
        <Input
          type={'text'}
          value={affilationsItem.employedAs}
          onChange={(v) =>
            props.onChange({ ...affilationsItem, employedAs: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Start date'>
        <DatePicker
          allowClear={false}
          value={moment(affilationsItem.startDate)}
          onChange={(v) =>
            props.onChange({
              ...affilationsItem,
              startDate: v?.toJSON() ?? ''
            })
          }
        />
      </Form.Item>
      <Form.Item label='End date'>
        <DatePicker
          allowClear={false}
          value={
            affilationsItem.endDate
              ? moment(affilationsItem.endDate)
              : undefined
          }
          onChange={(v) =>
            props.onChange({
              ...affilationsItem,
              endDate: v?.toJSON() ?? ''
            })
          }
        />
      </Form.Item>
      <Form.Item label='FTE'>
        <Input
          type={'text'}
          value={affilationsItem.fte}
          onChange={(v) =>
            props.onChange({
              ...affilationsItem,
              fte: v.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item label='Contract Type'>
        <Select
          showSearch
          value={affilationsItem.contractType}
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
          onChange={(v) =>
            props.onChange({ ...affilationsItem, contractType: v })
          }
        >
          {contractTypes.map((x) => (
            <Option key={x} value={x}>
              {x}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='Job Title'>
        <Input
          type={'text'}
          value={affilationsItem.jobTitle}
          onChange={(v) =>
            props.onChange({
              ...affilationsItem,
              jobTitle: v.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item label='Job Description'>
        <TextArea
          value={affilationsItem.jobDescription}
          onChange={(v) =>
            props.onChange({
              ...affilationsItem,
              jobDescription: v.target.value
            })
          }
        />
      </Form.Item>
    </>
  );
};
