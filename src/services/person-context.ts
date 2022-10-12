import { createContext } from 'react';
import { PersonsItem } from '../auto-gen/interfaces';

export interface IPersonContext {
  update(person: PersonsItem): void;
  rollback(): void;
  isModified(): boolean;
  current(): PersonsItem | undefined;
  original(): PersonsItem | undefined;
  save(): Promise<void> | undefined;

  allocateUniqueId(): number;
}

export const PersonContext = createContext<IPersonContext>({
  isModified: () => false,
  original: () => undefined,
  current: () => undefined,
  rollback: () => {},
  update: () => {},
  save: () => undefined,
  allocateUniqueId: () => 0
});
