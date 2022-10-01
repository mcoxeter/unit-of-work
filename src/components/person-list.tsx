import { PersonsItem } from '../auto-gen/interfaces';
import { Flex } from './flex';
import { Person } from './person';

export interface PersonListProps {
  persons: PersonsItem[];
  onChange: (persons: PersonsItem[]) => void;
}
export const PersonList = (props: PersonListProps) => {
  return (
    <Flex direction={'Column'}>
      {props.persons.map((x, i) => (
        <Person
          key={i}
          person={x}
          onChange={(v) =>
            props.onChange(props.persons.map((_x, _i) => (_i === i ? v : x)))
          }
        ></Person>
      ))}
    </Flex>
  );
};
