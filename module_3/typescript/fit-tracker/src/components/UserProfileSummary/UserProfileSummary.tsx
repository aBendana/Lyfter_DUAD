import type { UserProfileType } from '../../types/userTypes';

export function UserProfileSummary({
  userProfile,
}: {
  userProfile: UserProfileType;
}) {
  return (
    <section
      className="weekly-routine-resume__profile"
      aria-labelledby="profile-title"
    >
      <h2 id="profile-title">Profile</h2>
      <dl>
        <div>
          <dt>Name</dt>
          <dd>{userProfile.fullName || 'Not specified'}</dd>
        </div>
        <div>
          <dt>Age</dt>
          <dd>{userProfile.age || 'Not specified'}</dd>
        </div>
        <div>
          <dt>Experience</dt>
          <dd>{userProfile.experienceLevel}</dd>
        </div>
        <div>
          <dt>Membership</dt>
          <dd>{userProfile.contract}</dd>
        </div>
        <div>
          <dt>Start Date</dt>
          <dd>{userProfile.startDate.toLocaleDateString()}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{userProfile.state}</dd>
        </div>
      </dl>
    </section>
  );
}
