import { Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import {
  ExternalOrganizationLookupItem,
  ExternalOrganizationRef
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
    name: 'New item',
    unit: ''
  };

  const options = [newEO].concat(props.externalOrganizationLookup);
  return (
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
          {x.name} {x.id}
        </Option>
      ))}
    </Select>
  );
};
