import { mergeTests } from '@playwright/test';
import { test as testCandidateProfile } from './fixturesCandidateProfile';
import { test as recruiterTestProfile } from './fixturesRecruiterProfile';
import { generateUserCredentials } from '../../src/utils/generators/generateUserCredentials';
import { SignUpCandidateApi } from '../../src/api/auth/SignUpCandidateApi';
import { SignUpRecruiterApi } from '../../src/api/auth/SignUpRecruiterApi';
import { UserCredentials } from '../../src/models/auth/UserCredentials';
import { SignUpUserPage } from '../../src/pages/auth/signUp/user/SignUpUserPage';
import { ChooseProfilePage } from '../../src/pages/auth/signUp/user/ChooseProfilePage';
import { toCandidateProfileDto } from '../../src/models/auth/candidate/CandidateProfile';
import { toWorkPlaceDto } from '../../src/models/auth/candidate/WorkPlace';
import { toRecruiterProfileDto } from '../../src/models/auth/recruiter/RecruiterProfile';

const base = mergeTests(testCandidateProfile, recruiterTestProfile);

export const test = base.extend<{
  userCredentials: UserCredentials;
  registeredCandidate: void;
  registeredRecruiter: void;
  signUpUserPage: SignUpUserPage;
  chooseProfilePage: ChooseProfilePage;
}>({
  userCredentials: async ({}, use) => {
    const userCredentials = generateUserCredentials();

    await use(userCredentials);
  },
  registeredCandidate: async (
    { request, userCredentials, candidateProfile, workPlace, candidateProfileContacts },
    use,
  ) => {
    const signUpCandidateApi = new SignUpCandidateApi(request);

    await signUpCandidateApi.createUser(userCredentials);

    const candidateProfileDto = toCandidateProfileDto(candidateProfile);
    const { profileId } = await signUpCandidateApi.updateProfile(candidateProfileDto);

    const workPlaceDto = toWorkPlaceDto(workPlace);
    await signUpCandidateApi.createWorkPlace(profileId, workPlaceDto);

    await signUpCandidateApi.updateProfileContacts(candidateProfileContacts);

    await signUpCandidateApi.sendProfileToReview();

    await use();
  },
  registeredRecruiter: async (
    { request, userCredentials, recruiterProfile, recruiterProfileContacts },
    use,
  ) => {
    const signUpRecruiterApi = new SignUpRecruiterApi(request);

    await signUpRecruiterApi.createUser(userCredentials);

    const recruiterProfileDto = toRecruiterProfileDto(recruiterProfile);
    await signUpRecruiterApi.updateRecruiterProfile(recruiterProfileDto);

    await signUpRecruiterApi.updateProfileContacts(recruiterProfileContacts);

    await signUpRecruiterApi.sendProfileToReview();

    await use();
  },
  signUpUserPage: async ({ page }, use) => {
    await use(new SignUpUserPage(page));
  },
  chooseProfilePage: async ({ page }, use) => {
    await use(new ChooseProfilePage(page));
  },
});
