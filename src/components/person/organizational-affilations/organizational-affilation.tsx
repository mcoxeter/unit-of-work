import { DatePicker, Form, Input } from 'antd';
import moment from 'moment';
import {
  AffilationsItem,
  ExternalOrganizationLookupItem
} from '../../../auto-gen/interfaces';
import { ExternalOrganization } from './external-organization';

export interface OrganizationalAffilationProps {
  affilationsItem: AffilationsItem;
  externalOrganizationLookup: ExternalOrganizationLookupItem[];
  onChange: (value: AffilationsItem) => void;
}

export const OrganizationalAffilation = (
  props: OrganizationalAffilationProps
) => {
  const affilationsItem = props.affilationsItem;

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
    </>
  );
};
