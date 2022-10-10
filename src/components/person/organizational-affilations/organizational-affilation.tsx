import { DatePicker, Form, Input, InputNumber } from 'antd';
import moment from 'moment';
import { AffilationsItem } from '../../../auto-gen/interfaces';

export interface OrganizationalAffilationProps {
  affilationsItem: AffilationsItem;
  onChange: (value: AffilationsItem) => void;
}

export const OrganizationalAffilation = (
  props: OrganizationalAffilationProps
) => {
  const affilationsItem = props.affilationsItem;

  return (
    <>
      <Form.Item label='Affiliation'>
        <InputNumber
          value={affilationsItem.affiliation}
          onChange={(v) =>
            props.onChange({ ...affilationsItem, affiliation: v ?? 0 })
          }
        />
      </Form.Item>
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
    </>
  );
};
