import {
  CandidateProfile,
  toCandidateProfileDto,
} from '@models/auth/candidate/CandidateProfile';
import { toWorkPlaceDto, WorkPlace } from '@models/auth/candidate/WorkPlace';
import { ProfileContacts } from '@models/auth/ProfileContacts';
import { UserCredentials } from '@models/auth/UserCredentials';
import { SignUpCandidateApi } from '@api/auth/SignUpCandidateApi';

export class CandidateSeeder {
  constructor(private api: SignUpCandidateApi) {}

  async seedReadyCandidate(
    userCredentials: UserCredentials,
    candidateProfile: CandidateProfile,
    workPlace: WorkPlace,
    candidateProfileContacts: ProfileContacts,
  ) {
    const candidateProfileDto = toCandidateProfileDto(candidateProfile);
    const workPlaceDto = toWorkPlaceDto(workPlace);

    await this.api.createUser(userCredentials);
    const { profileId } = await this.api.updateProfile(candidateProfileDto);
    await this.api.createWorkPlace(profileId, workPlaceDto);
    await this.api.updateProfileContacts(candidateProfileContacts);
    await this.api.sendProfileToReview();
  }
}
