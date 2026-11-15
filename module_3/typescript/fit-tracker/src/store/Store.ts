import type {
  EntityChangesType,
  EntityType,
  StoreResultType,
} from '../types/storeTypes';

type StoreListenerType = () => void;

// one generic store reused by every entity type
export class Store<T extends EntityType> {
  // map keeps insertion order and gives direct lookup by id;
  // T['id'] keeps branded ids, so a MemberId store rejects an ExerciseId
  private readonly items = new Map<T['id'], T>();
  private readonly listeners = new Set<StoreListenerType>();
  // react compares snapshots by reference, so it only changes on a write
  private snapshot: readonly T[] = Object.freeze([]);

  constructor(initialItems: readonly T[] = []) {
    initialItems.forEach((item) => this.add(item));
  }

  // a repeated id would silently overwrite another entity
  add(item: T): void {
    if (this.items.has(item.id)) {
      throw new Error(`An entity with id ${item.id} already exists`);
    }

    this.items.set(item.id, item);
    this.emitChange();
  }

  // new array, so callers cannot change the internal collection
  getAll(): readonly T[] {
    return [...this.items.values()];
  }

  getById(id: T['id']): StoreResultType<T> {
    const item = this.items.get(id);
    return item === undefined ? { found: false, id } : { found: true, item };
  }

  // the old object is replaced, never mutated, so references to it stay valid
  update(id: T['id'], changes: EntityChangesType<T>): StoreResultType<T> {
    const item = this.items.get(id);
    if (item === undefined) return { found: false, id };

    const updatedItem: T = { ...item, ...changes };
    this.items.set(id, updatedItem);
    this.emitChange();
    return { found: true, item: updatedItem };
  }

  remove(id: T['id']): boolean {
    const removed = this.items.delete(id);
    if (removed) this.emitChange();
    return removed;
  }

  findBy(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate);
  }

  // arrow fields keep `this` when react calls them detached from the store
  subscribe = (listener: StoreListenerType): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): readonly T[] => this.snapshot;

  // frozen copy, so the cached snapshot cannot be changed from outside either
  private emitChange(): void {
    this.snapshot = Object.freeze([...this.items.values()]);
    this.listeners.forEach((listener) => listener());
  }
}
