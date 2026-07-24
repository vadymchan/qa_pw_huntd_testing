import { Role } from '@models/auth/candidate/Role';

const SPECIALIZATION_ID: Record<Role, number> = {
  PM: 22,
  DEVOPS: 23,
  'FULL STACK': 6,
  FRONTEND: 1,
  MOBILE: 13,
  BACKEND: 5,
  QA: 3,
  'UI/UX DESIGN': 4,
  'DATA SCIENCE': 17,
};

export const getSpecializationIds = (roles: Array<Role>) =>
  roles.map((role) => SPECIALIZATION_ID[role]);
