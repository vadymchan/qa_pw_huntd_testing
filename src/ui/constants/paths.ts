const CANDIDATE_BASE_PROFILE = '/profile/candidate';
const PROFILE_CONTACTS_PREVIEW = (preview: 'candidate' | 'recruiter') =>
  `/profile/contacts?preview=${preview}`;
const PROFILE_PREVIEW = '/profile-preview';

export const PATHS = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  chooseProfile: '/choose-profile',
  jobs: '/jobs',
  changePassword: '/settings/change-password',
  profile: {
    candidate: {
      base: CANDIDATE_BASE_PROFILE,
      bio: `${CANDIDATE_BASE_PROFILE}/bio`,
      createContacts: PROFILE_CONTACTS_PREVIEW('candidate'),
      editContacts: `${CANDIDATE_BASE_PROFILE}/contacts`,
      experience: `${CANDIDATE_BASE_PROFILE}/experience`,
      jobExpectations: `${CANDIDATE_BASE_PROFILE}/job-expectations`,
      feedback: '/profile/feedback?preview=candidate',
      preview: `${PROFILE_PREVIEW}/candidate`,
    },
    recruiter: {
      base: '/profile/recruiter',
      contacts: PROFILE_CONTACTS_PREVIEW('recruiter'),
      perfectCandidate: '/profile/perfect-candidate',
      preview: `${PROFILE_PREVIEW}/recruiter`,
    },
  },
};
