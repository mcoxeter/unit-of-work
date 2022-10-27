import { createContext } from 'react';
import { PersonsItem } from '../auto-gen/interfaces';

export interface IPersonContext {
  canRedo(): boolean;
  canUndo(): boolean;
  changeCount(): number;
  current(): PersonsItem;
  original(): PersonsItem;
  redo(): void;
  rollback(): void;
  save(): Promise<void> | undefined;
  undo(): void;
  update(person: PersonsItem): void;

  // Old
  isModified(): boolean;

  allocateUniqueId(): number;
}

export const PersonContext = createContext<IPersonContext | undefined>(
  undefined
);
