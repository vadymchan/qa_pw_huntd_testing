import { faker } from '@faker-js/faker';
import { Month } from '../../models/auth/candidate/Month';
import { WorkPlace } from '../../models/auth/candidate/WorkPlace';

export function generateWorkPlace(): WorkPlace {
  const role = 'Automation Qa';
  const companyName = 'Mate Academy';
  const description = 'Work description';
  const startMonth: Month = 'January';
  const startYear = 2024;
  const endMonth: Month = 'January';
  const endYear = 2025;
  const achievements = faker.lorem.sentence();

  return {
    role,
    companyName,
    description,
    startMonth,
    startYear,
    endMonth,
    endYear,
    achievements,
  };
}
