import { test as base } from '@playwright/test';
import { generateUserCredentials } from '../../src/utils/generators/generateUserCredentials';
import { generateProfileContacts } from '../../src/utils/generators/generateProfileContacts';
import { generateCandidateProfile } from '../../src/utils/generators/generateCandidateProfile';
import { generateRecruiterProfile } from '../../src/utils/generators/generateRecruiterProfile';
import { generateWorkPlace } from '../../src/utils/generators/generateWorkPlace';
import { SignUpCandidateApi } from '../../src/api/auth/SignUpCandidateApi';
import { SignUpRecruiterApi } from '../../src/api/auth/SignUpRecruiterApi';

export const test = base.extend<{ registeredCandidate; registeredRecruiter }>({
  registeredCandidate: async ({ request }, use) => {
    const signUpCandidateApi = new SignUpCandidateApi(request);

    // Create User
    const userCredentials = generateUserCredentials();
    await signUpCandidateApi.createUser(userCredentials);

    // Update Candidate Profile
    const candidateProfile = generateCandidateProfile();
    const { profileId } = await signUpCandidateApi.updateProfile(candidateProfile);

    // Create Work Place
    const workPlace = generateWorkPlace(profileId);
    await signUpCandidateApi.createWorkPlace(workPlace);

    // Update Profile Contacts
    const profileContacts = generateProfileContacts();
    await signUpCandidateApi.updateProfileContacts(profileContacts);

    // Send Candidate Profile To Review
    await signUpCandidateApi.sendProfileToReview();

    await use({ userCredentials, profileId, candidateProfile, workPlace, profileContacts });
  },
  registeredRecruiter: async ({ request }, use) => {
    const signUpRecruiterApi = new SignUpRecruiterApi(request);

    // Create User
    const userCredentials = generateUserCredentials();
    await signUpRecruiterApi.createUser(userCredentials);

    // Update Recruiter Profile
    const recruiterProfile = generateRecruiterProfile();
    await signUpRecruiterApi.updateRecruiterProfile(recruiterProfile);

    // Update Profile Contacts
    const profileContacts = generateProfileContacts();
    await signUpRecruiterApi.updateProfileContacts(profileContacts);

    // Send Recruiter Profile To Review
    await signUpRecruiterApi.sendProfileToReview();

    await use({ userCredentials, recruiterProfile, profileContacts });
  },
});
