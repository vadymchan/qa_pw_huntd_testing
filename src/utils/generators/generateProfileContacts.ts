import { faker } from '@faker-js/faker';
import { ProfileContacts } from '../../models/auth/ProfileContacts';

export function generateProfileContacts(): ProfileContacts {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const nameFormatted = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
  const linkedinUrl = `https://www.linkedin.com/in/${nameFormatted}/`;
  const behanceUrl = `https://www.behance.net/${nameFormatted}`;
  const githubUrl = `https://www.github.com/${nameFormatted}/`;

  return {
    firstName,
    lastName,
    linkedinUrl,
    behanceUrl,
    githubUrl,
  };
}
