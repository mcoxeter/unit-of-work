export interface UnitOfWork {
  load(): Promise<void>;
  rollback(): void;
  getChanges(): string;
}
