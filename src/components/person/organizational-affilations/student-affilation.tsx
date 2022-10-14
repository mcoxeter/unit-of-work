import { DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import { AffilationsItem } from '../../../auto-gen/interfaces';

export interface StudentAffilationProps {
  affilationsItem: AffilationsItem;
  onChange: (value: AffilationsItem) => void;
}

export const StudentAffilation = (props: StudentAffilationProps) => {
  const affilationsItem = props.affilationsItem;

  return (
    <>
      <Form.Item label='Type'>
        <Select
          showSearch
          disabled
          value={affilationsItem.type}
          style={{ width: 200 }}
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
    </>
  );
};
