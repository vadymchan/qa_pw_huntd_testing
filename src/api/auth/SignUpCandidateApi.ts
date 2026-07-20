import { SignUpUserApi } from './SignUpUserApi';
import { CandidateProfileDto } from '../../models/auth/candidate/CandidateProfile';
import { WorkPlaceDto } from '../../models/auth/candidate/WorkPlace';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class SignUpCandidateApi extends SignUpUserApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  private async parseProfileId(response: APIResponse) {
    const body = await this.parseJson(response);

    return body.data.updateCandidateProfile.id;
  }

  async createWorkPlace(candidateProfileId: number, workPlaceDto: WorkPlaceDto) {
    const payload = {
      operationName: 'createWorkPlace',
      variables: {
        candidateProfileId,
        ...workPlaceDto,
      },
      query:
        'mutation createWorkPlace($candidateProfileId: Int!, $companyName: String!, $companyUrl: String, $companySizeFrom: Int, $companySizeTo: Int, $companyIndustry: String, $companyCategories: String, $companySpecialities: String, $companyFundingType: String, $title: String!, $description: String, $startDate: String!, $endDate: String) {\n  createWorkPlace(\n    candidateProfileId: $candidateProfileId\n    companyName: $companyName\n    companyUrl: $companyUrl\n    companySizeFrom: $companySizeFrom\n    companySizeTo: $companySizeTo\n    companyIndustry: $companyIndustry\n    companyCategories: $companyCategories\n    companySpecialities: $companySpecialities\n    companyFundingType: $companyFundingType\n    title: $title\n    description: $description\n    startDate: $startDate\n    endDate: $endDate\n  ) {\n    ...WorkPlaceFull\n    __typename\n  }\n}\n\nfragment WorkPlaceFull on CandidateProfileWorkPlace {\n  ...WorkPlaceBase\n  ...WorkPlaceCompanyInfo\n  __typename\n}\n\nfragment WorkPlaceBase on CandidateProfileWorkPlace {\n  id\n  title\n  description\n  startDate\n  endDate\n  __typename\n}\n\nfragment WorkPlaceCompanyInfo on CandidateProfileWorkPlace {\n  companyName\n  companyUrl\n  companySizeFrom\n  companySizeTo\n  companyIndustry\n  companySpecialities\n  companyCategories\n  companyFundingType\n  __typename\n}\n',
    };

    return await this.step(`Create new work place`, async () => {
      return await this.post(payload);
    });
  }

  async updateProfile(candidateProfileDto: CandidateProfileDto) {
    const payload = {
      operationName: 'updateCandidateProfile',
      variables: {
        ...candidateProfileDto,
      },
      query:
        'mutation updateCandidateProfile($position: String, $salary: Float, $candidateDescription: String, $experienceDescription: String, $workExpectations: String, $achievements: String, $technologiesIds: [Int!], $jobExperienceId: Int, $employmentTypesIds: [Int!], $employmentLocationsIds: [Int!], $englishLevelId: Int, $specializationId: Int, $specializationsIds: [Int!], $cities: [CandidateProfileCityInput!], $workPlaces: [CandidateProfileWorkPlaceInput!]) {\n  updateCandidateProfile(\n    position: $position\n    salary: $salary\n    candidateDescription: $candidateDescription\n    experienceDescription: $experienceDescription\n    workExpectations: $workExpectations\n    achievements: $achievements\n    technologiesIds: $technologiesIds\n    jobExperienceId: $jobExperienceId\n    employmentTypesIds: $employmentTypesIds\n    employmentLocationsIds: $employmentLocationsIds\n    englishLevelId: $englishLevelId\n    specializationId: $specializationId\n    specializationsIds: $specializationsIds\n    cities: $cities\n    workPlaces: $workPlaces\n  ) {\n    ...CandidateProfileBase\n    __typename\n  }\n}\n\nfragment CandidateProfileBase on CandidateProfile {\n  id\n  userId\n  status\n  rejectReason\n  position\n  salary\n  candidateDescription\n  experienceDescription\n  workExpectations\n  achievements\n  slug\n  lastActionTime\n  __typename\n}\n',
    };

    const response = await this.step(`Update canidate profile`, async () => {
      return await this.post(payload);
    });

    const profileId = await this.parseProfileId(response);

    return { response, profileId };
  }

  async sendProfileToReview() {
    const payload = {
      operationName: 'sendCandidateProfileToReview',
      variables: {},
      query:
        'mutation sendCandidateProfileToReview {\n  sendCandidateProfileToReview {\n    ...CandidateProfileBase\n    __typename\n  }\n}\n\nfragment CandidateProfileBase on CandidateProfile {\n  id\n  userId\n  status\n  rejectReason\n  position\n  salary\n  candidateDescription\n  experienceDescription\n  workExpectations\n  achievements\n  slug\n  lastActionTime\n  __typename\n}\n',
    };

    return await this.step(`Send candidate profile to review`, async () => {
      return await this.post(payload);
    });
  }
}
