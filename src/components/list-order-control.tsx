import { UpOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { up, down } from '../array-utils';
import { Flex } from './flex';

export interface ListOrderControlProps<T> {
  index: number;
  values: T[];
  onChange: (value: T[]) => void;
}
export function ListOrderControl<T>(props: ListOrderControlProps<T>) {
  const { index: currentIndex, values } = props;
  const upActive = (i: number) => i > 0;
  const downActive = (i: number) => i < values.length - 1;
  return (
    <Flex>
      <Button
        type='default'
        icon={<UpOutlined />}
        disabled={!upActive(currentIndex)}
        onClick={(e) => {
          e.stopPropagation();
          props.onChange(up(values, currentIndex));
        }}
      />
      <Button
        type='default'
        icon={<DownOutlined />}
        disabled={!downActive(currentIndex)}
        onClick={(e) => {
          e.stopPropagation();
          props.onChange(down(values, currentIndex));
        }}
      />
      <Button
        type='default'
        danger
        icon={<DeleteOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          props.onChange(values.filter((_, i) => currentIndex !== i));
        }}
      />
    </Flex>
  );
}
