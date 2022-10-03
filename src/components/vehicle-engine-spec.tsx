import { Form, Input } from 'antd';
import { Enginespec } from '../auto-gen/interfaces';

export interface VehicleEngineSpecProps {
  engineSpec: Enginespec;
  onChange: (newEngineSpec: Enginespec) => void;
}
export const VehicleEngineSpec = (props: VehicleEngineSpecProps) => {
  const engineSpec = props.engineSpec;
  return (
    <>
      <Form.Item label='Max Speed'>
        <Input
          type={'text'}
          value={engineSpec.maxSpeed}
          onChange={(v) =>
            props.onChange({ ...engineSpec, maxSpeed: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='0 - 100 kph'>
        <Input
          type={'text'}
          value={engineSpec.zeroToOnHundred}
          onChange={(v) =>
            props.onChange({ ...engineSpec, zeroToOnHundred: v.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Fuel consumption per l/100 km'>
        <Input
          type={'text'}
          value={engineSpec.fuelConsumption}
          onChange={(v) =>
            props.onChange({ ...engineSpec, fuelConsumption: v.target.value })
          }
        />
      </Form.Item>
    </>
  );
};
