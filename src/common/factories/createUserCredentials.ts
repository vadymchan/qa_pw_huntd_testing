import { faker } from '@faker-js/faker';
import { UserCredentials } from '@models/auth/UserCredentials';

export function createUserCredentials(overrides: Partial<UserCredentials> = {}): UserCredentials {
  const email = faker.internet.email().toLowerCase();
  const password = faker.internet.password();

  return {
    email,
    password,
    ...overrides,
  };
}
