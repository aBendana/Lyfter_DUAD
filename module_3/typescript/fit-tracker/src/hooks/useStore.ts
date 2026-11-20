import { useSyncExternalStore } from 'react';
import type { Store } from '../store/Store';
import type { EntityType } from '../types/storeTypes';

// re-renders the component whenever the given store changes
export function useStore<T extends EntityType>(
  store: Store<T>
): readonly Readonly<T>[] {
  return useSyncExternalStore(store.subscribe, store.getSnapshot);
}
