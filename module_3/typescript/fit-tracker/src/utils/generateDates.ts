import type { MembershipStateType } from '../types/userTypes';

// generates the membership expiration date
export function generateExpireDate(): Date {
  const expireDate = new Date();
  expireDate.setMonth(expireDate.getMonth() + 1);

  return expireDate;
}

// determines the membership state based on the end date
export function getMembershipState(endDate: Date): MembershipStateType {
  const currentDate = new Date();

  if (endDate > currentDate) {
    return 'Active';
  }

  return 'Inactive';
}
