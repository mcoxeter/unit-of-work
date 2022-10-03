import { Form, Input } from 'antd';
import { Model } from '../auto-gen/interfaces';
import { VehicleEngineSpec } from './vehicle-engine-spec';

export interface VehicleModelProps {
  model: Model;
  onChange: (newModel: Model) => void;
}
export const VehicleModel = (props: VehicleModelProps) => {
  const model = props.model;
  return (
    <>
      <Form.Item label='Model Name'>
        <Input
          type={'text'}
          value={model.name}
          onChange={(v) => props.onChange({ ...model, name: v.target.value })}
        />
      </Form.Item>
      <VehicleEngineSpec
        engineSpec={model.enginespec}
        onChange={(v) => props.onChange({ ...model, enginespec: v })}
      />
    </>
  );
};
