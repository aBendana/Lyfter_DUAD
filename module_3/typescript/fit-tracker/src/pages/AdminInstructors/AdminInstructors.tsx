import { AdminPageHeader } from '../../components/AdminPageHeader/AdminPageHeader';
import { ExportButton } from '../../components/ExportButton/ExportButton';
import { useStore } from '../../hooks/useStore';
import { instructorStore, memberStore } from '../../store/stores';
import type { MemberId } from '../../types/idsTypes';
import { generateInstructorsExport } from '../../utils/generateInstructorsExport';
import './AdminInstructors.css';

// getById reports a missing member instead of throwing, so the row can say so
function AssignedMemberItem({ memberId }: { memberId: MemberId }) {
  const result = memberStore.getById(memberId);

  if (!result.found) {
    return (
      <li className="admin-instructors__member admin-instructors__member--missing">
        ❌ Member ID {result.id} not found
      </li>
    );
  }

  const { fullName, experienceLevel, membership } = result.item;
  return (
    <li className="admin-instructors__member">
      <span>{fullName}</span>
      <span>
        {experienceLevel} · {membership.contract} · {membership.state}
      </span>
    </li>
  );
}

export function AdminInstructors() {
  const instructors = useStore(instructorStore);
  // the member rows read the store, this keeps them up to date
  const members = useStore(memberStore);

  return (
    <section className="admin-instructors">
      <AdminPageHeader
        title="Instructors"
        description="Instructors profile and assigned members."
      />

      {instructors.length === 0 ? (
        <p className="admin-instructors__empty">
          No instructors registered yet.
        </p>
      ) : (
        <div className="admin-instructors__list">
          {instructors.map((instructor) => (
            <article className="admin-instructors__card" key={instructor.id}>
              <h3>{instructor.fullName}</h3>

              <dl className="admin-instructors__profile">
                <div>
                  <dt>Email</dt>
                  <dd>{instructor.email}</dd>
                </div>
                <div>
                  <dt>Age</dt>
                  <dd>{instructor.age}</dd>
                </div>
                <div>
                  <dt>Experience</dt>
                  <dd>{instructor.yearsOfExperience} years</dd>
                </div>
                <div>
                  <dt>Assigned members</dt>
                  <dd>{instructor.assignedMemberIds.length}</dd>
                </div>
              </dl>

              {instructor.assignedMemberIds.length === 0 ? (
                <p className="admin-instructors__no-members">
                  No members assigned.
                </p>
              ) : (
                <ul className="admin-instructors__members">
                  {instructor.assignedMemberIds.map((memberId) => (
                    <AssignedMemberItem memberId={memberId} key={memberId} />
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}

      <ExportButton
        section="instructors"
        label="Export Instructors"
        createFile={() => generateInstructorsExport(instructors, members)}
        disabled={instructors.length === 0}
      />
    </section>
  );
}
