import { APIRequestContext } from '@playwright/test';
import { SignUpUserApi } from './SignUpUserApi';
import { RecruiterProfile } from '../../models/auth/recruiter/RecruiterProfile';

export class SignUpRecruiterApi extends SignUpUserApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async updateRecruiterProfile(recruiterProfile: RecruiterProfile) {
    const payload = {
      operationName: 'updateRecruiterProfile',
      variables: {
        ...recruiterProfile,
      },
      query:
        'mutation updateRecruiterProfile($position: String, $companyName: String) {\n  updateRecruiterProfile(position: $position, companyName: $companyName) {\n    ...RecruiterProfileBase\n    __typename\n  }\n}\n\nfragment RecruiterProfileBase on RecruiterProfile {\n  id\n  status\n  rejectReason\n  position\n  companyName\n  slug\n  lastActionTime\n  __typename\n}\n',
    };

    return await this.post(payload);
  }
}
