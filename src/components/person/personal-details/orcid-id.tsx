import { Form, Input } from 'antd';

export interface OrcidIDProps {
  orcidID: string;
  onChange: (value: string) => void;
}

export const OrcidID = (props: OrcidIDProps) => {
  const orcidID = props.orcidID;

  return (
    <>
      <Form.Item label='Orcid ID'>
        <Input
          type={'text'}
          value={orcidID}
          onChange={(v) => props.onChange(v.target.value)}
        />
      </Form.Item>
    </>
  );
};
