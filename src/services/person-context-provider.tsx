import { useEffect, useState } from 'react';
import { PersonsItem } from '../auto-gen/interfaces';
import { PersonContext } from './person-context';
import { savePerson } from './person-service';
import { usePerson } from './usePerson';
import produce, { applyPatches, Patch } from 'immer';

export interface PersonContextProviderProps {
  id: number;
  children: React.ReactNode;
}
export const PersonContextProvider = (props: PersonContextProviderProps) => {
  const [current, setCurrent] = useState<PersonsItem>();
  const [original, setOriginal] = useState<PersonsItem>();
  const [changes, setChanges] = useState<Patch[]>([]);
  const [redos, setRedos] = useState<Patch[]>([]);

  const [uniqueId, setUniqueId] = useState(-1);
  const originalPerson = usePerson(props.id);
  useEffect(() => {
    setCurrent(originalPerson);
    setOriginal(originalPerson);
  }, [originalPerson]);

  async function save(): Promise<void> {
    if (current) {
      await savePerson(current);
    }
    setChanges([]);
    setRedos([]);
    setOriginal(current);
  }

  function update(value: PersonsItem): void {
    produce(
      original,
      (draft) => value,
      (patches, inversePatches) => {
        const newChanges = changes.concat(...patches);
        setChanges(newChanges);
        setCurrent(applyPatches(original as PersonsItem, newChanges));
      }
    );
  }

  function rollback(): void {
    setChanges([]);
    setRedos([]);
    setCurrent(applyPatches(original as PersonsItem, []));
  }

  function undo(): void {
    const undoChange = changes.pop();
    if (undoChange) {
      setRedos(redos.concat(undoChange));
    }
    setChanges(changes);
    setCurrent(applyPatches(original as PersonsItem, changes));
  }

  function redo(): void {
    const redoChange = redos.pop();
    if (redoChange) {
      const newChanges = changes.concat(redoChange);
      setChanges(newChanges);
      setRedos(redos);
      setCurrent(applyPatches(original as PersonsItem, newChanges));
    }
  }

  if (!current || !original) {
    return <PersonContext.Provider value={undefined}></PersonContext.Provider>;
  }

  return (
    <PersonContext.Provider
      value={{
        canRedo: () => redos.length > 0,
        canUndo: () => changes.length > 0,
        changeCount: () => changes.length,
        current: () => current,
        isModified: () => deepCompare(current, original) === false,
        original: () => original,
        redo,
        rollback,
        save,
        undo,
        update,
        allocateUniqueId: () => {
          setUniqueId((prev) => prev - 1);
          return uniqueId;
        }
      }}
    >
      {props.children}
    </PersonContext.Provider>
  );
};

function deepCompare(x: object | undefined, y: object | undefined): boolean {
  if (x === y) return true;

  return JSON.stringify(x) === JSON.stringify(y);
}
