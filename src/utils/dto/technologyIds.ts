import { CoreTechnicalSkill } from '../../models/auth/candidate/CoreTechnicalSkill';

const TECHNOLOGY_ID: Record<CoreTechnicalSkill, number> = {
  DevOps: 528,
  JavaScript: 5,
  'API testing': 90,
  'manual testing': 87,
  'Mobile testing': 89,
};

export const getTechnologyIds = (coreTechnicalSkills: Array<CoreTechnicalSkill>) =>
  coreTechnicalSkills.map((coreTechnicalSkill) => TECHNOLOGY_ID[coreTechnicalSkill]);
