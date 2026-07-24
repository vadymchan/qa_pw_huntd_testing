import { mergeTests } from '@playwright/test';
import { test as testCandidateProfile } from '@fixtures/fixturesCandidateProfile';
import { test as recruiterTestProfile } from '@fixtures/fixturesRecruiterProfile';
import { createUserCredentials } from '@factories/createUserCredentials';
import { UserCredentials } from '@models/auth/UserCredentials';
import { CandidateProfile } from '@models/auth/candidate/CandidateProfile';
import { WorkPlace } from '@models/auth/candidate/WorkPlace';
import { ProfileContacts } from '@models/auth/ProfileContacts';
import { RecruiterProfile } from '@models/auth/recruiter/RecruiterProfile';
import { SignUpUserApi } from '@api/auth/SignUpUserApi';
import { SignUpCandidateApi } from '@api/auth/SignUpCandidateApi';
import { SignUpRecruiterApi } from '@api/auth/SignUpRecruiterApi';
import { SignUpUserPage } from '@ui/pages/auth/sign-up/user/SignUpUserPage';
import { ChooseProfilePage } from '@ui/pages/auth/sign-up/user/ChooseProfilePage';
import { SignInUserPage } from '@ui/pages/auth/sign-in/SignInUserPage';
import { LogoutUserPage } from '@ui/pages/auth/logout/LogoutUserPage';
import { CandidateSeeder } from '@api/seeders/CandidateSeeder';
import { RecruiterSeeder } from '@api/seeders/RecruiterSeeder';

const base = mergeTests(testCandidateProfile, recruiterTestProfile);

export type RegisteredUser = {
  userCredentials: UserCredentials;
};

export type RegisteredCandidate = {
  userCredentials: UserCredentials;
  candidateProfile: CandidateProfile;
  workPlace: WorkPlace;
  profileContacts: ProfileContacts;
};

export type RegisteredRecruiter = {
  userCredentials: UserCredentials;
  recruiterProfile: RecruiterProfile;
  profileContacts: ProfileContacts;
};

type MyFixtures = {
  userCredentials: UserCredentials;
  registerNewUser: RegisteredUser;
  registerNewCandidate: RegisteredCandidate;
  registerNewRecruiter: RegisteredRecruiter;
  signUpUserPage: SignUpUserPage;
  chooseProfilePage: ChooseProfilePage;
  signInUserPage: SignInUserPage;
  logoutUserPage: LogoutUserPage;
};

export const test = base.extend<MyFixtures>({
  userCredentials: async ({}, use) => {
    const userCredentials = createUserCredentials();

    await use(userCredentials);
  },
  registerNewUser: async ({ context, userCredentials }, use) => {
    const signUpUserApi = new SignUpUserApi(context.request);

    await signUpUserApi.createUser(userCredentials);

    await use({
      userCredentials,
    });
  },
  registerNewCandidate: async (
    { context, userCredentials, candidateProfile, workPlace, candidateProfileContacts },
    use,
  ) => {
    const signUpCandidateApi = new SignUpCandidateApi(context.request);
    const candidateSeeder = new CandidateSeeder(signUpCandidateApi);

    await candidateSeeder.seedReadyCandidate(
      userCredentials,
      candidateProfile,
      workPlace,
      candidateProfileContacts,
    );

    await use({
      userCredentials,
      candidateProfile,
      workPlace,
      profileContacts: candidateProfileContacts,
    });
  },
  registerNewRecruiter: async (
    { context, userCredentials, recruiterProfile, recruiterProfileContacts },
    use,
  ) => {
    const signUpRecruiterApi = new SignUpRecruiterApi(context.request);
    const recruiterSeeder = new RecruiterSeeder(signUpRecruiterApi);

    await recruiterSeeder.seedReadyRecruiter(
      userCredentials,
      recruiterProfile,
      recruiterProfileContacts,
    );

    await use({
      userCredentials,
      recruiterProfile,
      profileContacts: recruiterProfileContacts,
    });
  },
  signUpUserPage: async ({ page }, use) => {
    await use(new SignUpUserPage(page));
  },
  chooseProfilePage: async ({ page }, use) => {
    await use(new ChooseProfilePage(page));
  },
  signInUserPage: async ({ page }, use) => {
    await use(new SignInUserPage(page));
  },
  logoutUserPage: async ({ page }, use) => {
    await use(new LogoutUserPage(page));
  },
});
