import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Select, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import {
  ExternalOrganizationLookupItem,
  ExternalOrganizationRef,
  New_value
} from '../../../auto-gen/interfaces';
import { PersonContext } from '../../../services/person-context';

export interface ExternalOrganizationProps {
  externalOrganizationRef: ExternalOrganizationRef;
  externalOrganizationLookup: ExternalOrganizationLookupItem[];
  onChange: (value: ExternalOrganizationRef) => void;
}

const { Option } = Select;

export const ExternalOrganization = (props: ExternalOrganizationProps) => {
  const personContext = useContext(PersonContext);
  const [uniqueId, setUniqueId] = useState(-1);
  const { externalOrganizationRef } = props;

  useEffect(() => {
    setUniqueId(personContext.allocateUniqueId());
  }, []);

  const newEO: ExternalOrganizationLookupItem = {
    id: uniqueId,
    name: 'Create',
    unit: ''
  };

  const options = [newEO].concat(props.externalOrganizationLookup);
  return (
    <>
      <Form.Item label='Affiliation'>
        <Select
          showSearch
          value={externalOrganizationRef.refId}
          style={{ width: 200 }}
          placeholder='Search to Select'
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option!.children as unknown as string).includes(input)
          }
          onChange={(v) =>
            props.onChange({
              ...externalOrganizationRef,
              refId: v
            })
          }
        >
          {options.map((x) => (
            <Option key={x.name} value={x.id}>
              {x.id < 0 && (
                <>
                  {' '}
                  <PlusOutlined />
                </>
              )}{' '}
              {x.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {externalOrganizationRef.refId < 0 && (
        <NewExternalOrganization
          new_value={externalOrganizationRef.new_value}
          onChange={(v) =>
            props.onChange({
              ...externalOrganizationRef,
              new_value: v
            })
          }
        />
      )}
    </>
  );
};

export interface NewExternalOrganizationProps {
  new_value: New_value;
  onChange: (value: New_value) => void;
}

const NewExternalOrganization = (props: NewExternalOrganizationProps) => {
  const { new_value } = props;
  return (
    <>
      <Form.Item label='Organization Name'>
        <Input
          type={'text'}
          placeholder='New Organization Name'
          value={new_value.name}
          onChange={(v) =>
            props.onChange({ ...new_value, name: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Organization Unit'>
        <Input
          type={'text'}
          placeholder='New Organization Unit'
          value={new_value.unit}
          onChange={(v) =>
            props.onChange({ ...new_value, unit: v.target.value })
          }
        />
      </Form.Item>
    </>
  );
};
