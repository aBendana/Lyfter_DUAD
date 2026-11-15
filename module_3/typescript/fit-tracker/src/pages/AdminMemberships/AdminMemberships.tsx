import { MemberResumeCard } from '../../components/MemberResumeCard/MemberResumeCard';
import { AdminPageHeader } from '../../components/AdminPageHeader/AdminPageHeader';
import { ExportButton } from '../../components/ExportButton/ExportButton';
import { useStore } from '../../hooks/useStore';
import { instructorStore, memberStore } from '../../store/stores';
import { findMemberInstructor } from '../../utils/findMemberInstructor';
import { generateMembersExport } from '../../utils/generateMembersExport';
import { generateRecommendations } from '../../utils/generateRecommendations';
import { hasActiveRoutine } from '../../utils/hasActiveRoutine';
import './AdminMemberships.css';

export function AdminMemberships() {
  const members = useStore(memberStore);
  const instructors = useStore(instructorStore);

  return (
    <section className="admin-memberships">
      <AdminPageHeader
        title="Memberships"
        description="Members profiles, weekly load and recommendations."
      />

      {members.length === 0 ? (
        <p className="admin-memberships__empty">No members registered yet.</p>
      ) : (
        <div className="admin-memberships__list">
          {members.map((member) => (
            <MemberResumeCard member={member} key={member.id}>
              <dl className="admin-memberships__extra">
                <div>
                  <dt>Instructor</dt>
                  <dd>
                    {findMemberInstructor(member.id, instructors)?.fullName ??
                      'Not assigned'}
                  </dd>
                </div>
                <div>
                  <dt>Routine</dt>
                  <dd>{hasActiveRoutine(member) ? 'Active' : 'Inactive'}</dd>
                </div>
              </dl>

              <section aria-label={`${member.fullName}'s recommendation`}>
                <h4 className="member-resume-card__section-title">
                  Recommendation
                </h4>
                <p className="admin-memberships__recommendation">
                  {generateRecommendations(member.routine.entries)}
                </p>
              </section>
            </MemberResumeCard>
          ))}
        </div>
      )}

      <ExportButton
        section="members"
        label="Export Members"
        createFile={() => generateMembersExport(members, instructors)}
        disabled={members.length === 0}
      />
    </section>
  );
}
