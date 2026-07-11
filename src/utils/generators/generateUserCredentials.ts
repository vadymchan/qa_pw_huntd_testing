import { faker } from '@faker-js/faker';
import { UserCredentials } from '../../models/auth/UserCredentials';

export function generateUserCredentials() {
  const email = faker.internet.email();
  const password = faker.internet.password();

  return new UserCredentials(email, password);
}
