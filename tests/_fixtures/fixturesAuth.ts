import { mergeTests } from '@playwright/test';
import { test as testCandidateProfile } from './fixturesCandidateProfile';
import { test as recruiterTestProfile } from './fixturesRecruiterProfile';
import { generateUserCredentials } from '../../src/utils/generators/generateUserCredentials';
import { UserCredentials } from '../../src/models/auth/UserCredentials';
import {
  CandidateProfile,
  toCandidateProfileDto,
} from '../../src/models/auth/candidate/CandidateProfile';
import { WorkPlace, toWorkPlaceDto } from '../../src/models/auth/candidate/WorkPlace';
import { ProfileContacts } from '../../src/models/auth/ProfileContacts';
import {
  RecruiterProfile,
  toRecruiterProfileDto,
} from '../../src/models/auth/recruiter/RecruiterProfile';
import { SignUpUserApi } from '../../src/api/auth/SignUpUserApi';
import { SignUpCandidateApi } from '../../src/api/auth/SignUpCandidateApi';
import { SignUpRecruiterApi } from '../../src/api/auth/SignUpRecruiterApi';
import { SignUpUserPage } from '../../src/ui/pages/auth/sign-up/user/SignUpUserPage';
import { ChooseProfilePage } from '../../src/ui/pages/auth/sign-up/user/ChooseProfilePage';
import { SignInUserPage } from '../../src/ui/pages/auth/sign-in/SignInUserPage';
import { LogoutUserPage } from '../../src/ui/pages/auth/logout/LogoutUserPage';

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
    const userCredentials = generateUserCredentials();

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

    await signUpCandidateApi.createUser(userCredentials);

    const candidateProfileDto = toCandidateProfileDto(candidateProfile);
    const { profileId } = await signUpCandidateApi.updateProfile(candidateProfileDto);

    const workPlaceDto = toWorkPlaceDto(workPlace);
    await signUpCandidateApi.createWorkPlace(profileId, workPlaceDto);

    await signUpCandidateApi.updateProfileContacts(candidateProfileContacts);

    await signUpCandidateApi.sendProfileToReview();

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

    await signUpRecruiterApi.createUser(userCredentials);

    const recruiterProfileDto = toRecruiterProfileDto(recruiterProfile);
    await signUpRecruiterApi.updateProfile(recruiterProfileDto);

    await signUpRecruiterApi.updateProfileContacts(recruiterProfileContacts);

    await signUpRecruiterApi.sendProfileToReview();

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
