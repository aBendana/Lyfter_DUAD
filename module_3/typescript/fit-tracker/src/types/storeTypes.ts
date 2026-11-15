// any entity saved in the store must have a numeric id
export interface EntityType {
  id: number;
}

// fields an update may send: any subset, never the id
export type EntityChangesType<T extends EntityType> = Partial<Omit<T, 'id'>>;

// lookups report a missing id instead of throwing,
// the id is kept so the ui can say which one was not found
export type StoreResultType<T extends EntityType> =
  { found: true; item: T } | { found: false; id: T['id'] };
