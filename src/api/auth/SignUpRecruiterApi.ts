import { APIRequestContext } from '@playwright/test';
import { SignUpUserApi } from './SignUpUserApi';
import { RecruiterProfileDto } from '../../models/auth/recruiter/RecruiterProfile';

export class SignUpRecruiterApi extends SignUpUserApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async updateRecruiterProfile(recruiterProfileDto: RecruiterProfileDto) {
    const payload = {
      operationName: 'updateRecruiterProfile',
      variables: {
        ...recruiterProfileDto,
      },
      query:
        'mutation updateRecruiterProfile($position: String, $companyName: String) {\n  updateRecruiterProfile(position: $position, companyName: $companyName) {\n    ...RecruiterProfileBase\n    __typename\n  }\n}\n\nfragment RecruiterProfileBase on RecruiterProfile {\n  id\n  status\n  rejectReason\n  position\n  companyName\n  slug\n  lastActionTime\n  __typename\n}\n',
    };

    return await this.post(payload);
  }
}
