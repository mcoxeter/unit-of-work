import { Form } from 'antd';
import { Keywords } from '../../../auto-gen/interfaces';
export interface OrganizationAffilationKeywordsProps {
  keywords: Keywords;
  onChange: (value: Keywords) => void;
}

export const OrganizationAffilationKeywords = (
  props: OrganizationAffilationKeywordsProps
) => {
  const keywords = props.keywords;

  return (
    <>
      <Form.Item label='exOfficio'></Form.Item>
      <Form.Item label='grade'></Form.Item>
    </>
  );
};
