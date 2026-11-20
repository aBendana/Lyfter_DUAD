import type { ActivityEventType } from '../types/activityTypes';
import { generateActivityId } from '../utils/generateIds';
import { activityStore } from './stores';

// providers call it right after their own store write
export function logActivity(event: ActivityEventType): void {
  activityStore.add({ ...event, id: generateActivityId(), at: new Date() });
}
