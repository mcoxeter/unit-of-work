import { Card, Form, Input } from 'antd';
import { VehiclesItem } from '../auto-gen/interfaces';
import { VehicleModel } from './vehicle-model';

export interface VehicleProps {
  vehicle: VehiclesItem;
  onChange: (newVehicle: VehiclesItem) => void;
}

export const Vehicle = (props: VehicleProps) => {
  const vehicle = props.vehicle;
  return (
    <Card title='Vehicle' actions={[]}>
      <Form.Item label='Regristration'>
        <Input
          type={'text'}
          value={vehicle.reg}
          onChange={(v) => props.onChange({ ...vehicle, reg: v.target.value })}
        />
      </Form.Item>
      <VehicleModel
        model={vehicle.model}
        onChange={(v) => props.onChange({ ...vehicle, model: v })}
      />
    </Card>
  );
};
