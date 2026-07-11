import { faker } from '@faker-js/faker';
import { ProfileContacts } from '../../models/auth/ProfileContacts';

export function generateProfileContacts() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const nameFormatted = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
  const linkedinURL = `https://www.linkedin.com/in/${nameFormatted}/`;
  const behanceURL = `https://www.behance.net/${nameFormatted}`;
  const gitHubURL = `https://www.github.com/${nameFormatted}/`;

  return new ProfileContacts(
    firstName,
    lastName,
    linkedinURL,
    behanceURL,
    gitHubURL,
  );

}
