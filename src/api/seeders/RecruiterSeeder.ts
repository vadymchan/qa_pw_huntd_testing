import { ProfileContacts } from '@models/auth/ProfileContacts';
import {
  RecruiterProfile,
  toRecruiterProfileDto,
} from '@models/auth/recruiter/RecruiterProfile';
import { UserCredentials } from '@models/auth/UserCredentials';
import { SignUpRecruiterApi } from '@api/auth/SignUpRecruiterApi';

export class RecruiterSeeder {
  constructor(private api: SignUpRecruiterApi) {}

  async seedReadyRecruiter(
    userCredentials: UserCredentials,
    recruiterProfile: RecruiterProfile,
    recruiterProfileContacts: ProfileContacts,
  ) {
    const recruiterProfileDto = toRecruiterProfileDto(recruiterProfile);

    await this.api.createUser(userCredentials);
    await this.api.updateProfile(recruiterProfileDto);
    await this.api.updateProfileContacts(recruiterProfileContacts);
    await this.api.sendProfileToReview();
  }
}
