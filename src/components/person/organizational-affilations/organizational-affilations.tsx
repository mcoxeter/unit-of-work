import { Col, DatePicker, Form, Row } from 'antd';
import moment from 'moment';
import {
  ExternalOrganizationLookupItem,
  OrganizationalAffilations
} from '../../../auto-gen/interfaces';
import { OrganizationAffilationList } from './organizational-affilation-list';

export interface OrgAffilationsProps {
  organizationalAffilations: OrganizationalAffilations;
  externalOrganizationLookup: ExternalOrganizationLookupItem[];
  onChange: (value: OrganizationalAffilations) => void;
}

export const OrgAffilations = (props: OrgAffilationsProps) => {
  const organizationalAffilations = props.organizationalAffilations;

  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label='Start date at instution'>
            <DatePicker
              allowClear={false}
              value={moment(organizationalAffilations.startDateAtInstution)}
              onChange={(v) =>
                props.onChange({
                  ...organizationalAffilations,
                  startDateAtInstution: v?.toJSON() ?? ''
                })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Start date at instution'>
            <DatePicker
              allowClear={false}
              value={
                organizationalAffilations.endDateAtInstution
                  ? moment(organizationalAffilations.endDateAtInstution)
                  : undefined
              }
              onChange={(v) =>
                props.onChange({
                  ...organizationalAffilations,
                  endDateAtInstution: v?.toJSON() ?? ''
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <OrganizationAffilationList
        affilations={organizationalAffilations.affilations}
        externalOrganizationLookup={props.externalOrganizationLookup}
        onChange={(v) => {
          props.onChange({ ...organizationalAffilations, affilations: v });
        }}
      />
    </>
  );
};
