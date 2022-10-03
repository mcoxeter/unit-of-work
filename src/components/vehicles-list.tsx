import { PlusOutlined } from '@ant-design/icons';
import { PageHeader, Button, Collapse } from 'antd';
import { useState } from 'react';
import { VehiclesItem } from '../auto-gen/interfaces';
import { Vehicle } from './vehicle';
const { Panel } = Collapse;

export interface VehiclesListProps {
  vehicles: VehiclesItem[];
  onChange: (vehicles: VehiclesItem[]) => void;
}
export const VehiclesList = (props: VehiclesListProps) => {
  const newItem: VehiclesItem = {
    model: {
      name: '',
      enginespec: {
        fuelConsumption: '',
        maxSpeed: '',
        zeroToOnHundred: ''
      }
    },
    reg: ''
  };
  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  return (
    <>
      <PageHeader
        title='Vehicles'
        extra={[
          <Button
            icon={<PlusOutlined />}
            type='dashed'
            onClick={() => props.onChange(props.vehicles.concat(newItem))}
          >
            Add
          </Button>
        ]}
      />
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        {props.vehicles.map((vehicle, i) => (
          <Panel key={'Vehicle' + i} header={vehicle.reg}>
            <Vehicle
              key={i}
              vehicle={vehicle}
              onChange={(changedVehicle) => {
                return props.onChange(
                  props.vehicles.map((_x, _i) =>
                    _i === i ? changedVehicle : _x
                  )
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </>
  );
};
