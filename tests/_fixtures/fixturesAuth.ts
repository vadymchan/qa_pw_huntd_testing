import { test as base, expect } from '@playwright/test';
import { generateUserCredentials } from '../../src/utils/generators/generateUserCredentials';
import { generateProfileContacts } from '../../src/utils/generators/generateProfileContacts';
import { SignUpCandidateApi } from '../../src/api/auth/SignUpCandidateApi';
import { SignUpRecruiterApi } from '../../src/api/auth/SignUpRecruiterApi';
import { generateCandidateProfile } from '../../src/utils/generators/generateCandidateProfile';
import { generateWorkPlace } from '../../src/utils/generators/generateWorkPlace';
import { generateRecruiterProfile } from '../../src/utils/generators/generateRecruiterProfile';

export const test = base.extend<{ registeredCandidate; registeredRecruiter }>({
  registeredCandidate: async ({ request }, use) => {
    const signUpCandidateApi = new SignUpCandidateApi(request);

    // Create User
    const userCredentials = generateUserCredentials();
    const signUpResponse = await signUpCandidateApi.createUser(userCredentials);
    signUpCandidateApi.assertSuccessResponseCode(signUpResponse);

    // Update Candidate Profile
    const candidateProfile = generateCandidateProfile();
    const { response: updateCandidateProfileResponse, profileId } =
      await signUpCandidateApi.updateProfile(candidateProfile);
    signUpCandidateApi.assertSuccessResponseCode(updateCandidateProfileResponse);

    // Create Work Place
    const workPlace = generateWorkPlace(profileId);
    const createWorkPlaceResponse = await signUpCandidateApi.createWorkPlace(workPlace);
    signUpCandidateApi.assertSuccessResponseCode(createWorkPlaceResponse);

    // Update Profile Contacts
    const profileContacts = generateProfileContacts();
    const updateProfileContactsResponse =
      await signUpCandidateApi.updateProfileContacts(profileContacts);
    signUpCandidateApi.assertSuccessResponseCode(updateProfileContactsResponse);

    // Send Candidate Profile To Review
    const sendProfileToReviewResponse = await signUpCandidateApi.sendProfileToReview();
    await signUpCandidateApi.assertSuccessResponseCode(sendProfileToReviewResponse);

    await use({ userCredentials, profileId, candidateProfile, workPlace, profileContacts });
  },
  registeredRecruiter: async ({ request }, use) => {
    const signUpRecruiterApi = new SignUpRecruiterApi(request);

    // Create User
    const userCredentials = generateUserCredentials();
    const { response: signUpResponse } = await signUpRecruiterApi.createUser(userCredentials);
    signUpRecruiterApi.assertSuccessResponseCode(signUpResponse);

    // Update Recruiter Profile
    const recruiterProfile = generateRecruiterProfile();
    const updateRecruiterProfileResponse =
      await signUpRecruiterApi.updateRecruiterProfile(recruiterProfile);
    signUpRecruiterApi.assertSuccessResponseCode(updateRecruiterProfileResponse);

    // Update Profile Contacts
    const profileContacts = generateProfileContacts();
    const updateProfileContactsResponse =
      await signUpRecruiterApi.updateProfileContacts(profileContacts);
    signUpRecruiterApi.assertSuccessResponseCode(updateProfileContactsResponse);

    // Send Recruiter Profile To Reveiw
    const sendProfileToReviewResponse = await signUpRecruiterApi.sendProfileToReview();
    signUpRecruiterApi.assertSuccessResponseCode(sendProfileToReviewResponse);

    await use({ userCredentials, recruiterProfile, profileContacts });
  },
});
