import { AdminPageHeader } from '../../components/AdminPageHeader/AdminPageHeader';
import { useStore } from '../../hooks/useStore';
import { activityStore } from '../../store/stores';
import { formatActivity } from '../../utils/formatActivity';
import './AdminActivity.css';

// the store keeps the whole history, the view only shows the latest ones
const MAX_VISIBLE_ACTIVITY = 10;

export function AdminActivity() {
  const activity = useStore(activityStore);
  // the snapshot is frozen, so it is copied before reversing
  const latest = [...activity].reverse().slice(0, MAX_VISIBLE_ACTIVITY);

  return (
    <section className="admin-activity">
      <AdminPageHeader
        title="Recent activity"
        description={`Last ${MAX_VISIBLE_ACTIVITY} changes made in the app, newest first.`}
      />

      {latest.length === 0 ? (
        <p className="admin-activity__empty">No activity yet.</p>
      ) : (
        <ol className="admin-activity__list">
          {latest.map((entry) => {
            const { outcome, message } = formatActivity(entry);
            return (
              <li
                className={`admin-activity__item admin-activity__item--${outcome}`}
                key={entry.id}
              >
                <span aria-hidden="true">
                  {outcome === 'success' ? '✅' : '❌'}
                </span>
                <span className="admin-activity__message">{message}</span>
                <time
                  className="admin-activity__time"
                  dateTime={entry.at.toISOString()}
                >
                  {entry.at.toLocaleTimeString()}
                </time>
              </li>
            );
          })}
        </ol>
      )}

      <p className="admin-activity__total">
        {activity.length} {activity.length === 1 ? 'event' : 'events'} in this
        session.
      </p>
    </section>
  );
}
