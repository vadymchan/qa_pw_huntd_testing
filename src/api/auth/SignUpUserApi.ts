import { APIRequestContext } from '@playwright/test';
import { BaseApi } from '@api/BaseApi';
import { UserCredentials } from '@models/auth/UserCredentials';
import { ProfileContacts } from '@models/auth/ProfileContacts';

export class SignUpUserApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createUser(userCredentials: UserCredentials) {
    const payload = {
      operationName: 'signUp',
      variables: {
        ...userCredentials,
        repeatPassword: userCredentials.password,
      },
      query:
        'mutation signUp($email: String!, $phone: String, $password: String!, $repeatPassword: String!, $firstName: String, $lastName: String, $fvType: String, $fvSource: String, $fvMedium: String, $fvCampaign: String, $fvContent: String, $fvTerm: String, $lvType: String, $lvSource: String, $lvMedium: String, $lvCampaign: String, $lvContent: String, $lvTerm: String, $gClientid: String, $gIp: String, $gAgent: String, $gclid: String) {\n  signUp(\n    email: $email\n    phone: $phone\n    password: $password\n    repeatPassword: $repeatPassword\n    firstName: $firstName\n    lastName: $lastName\n    fvType: $fvType\n    fvSource: $fvSource\n    fvMedium: $fvMedium\n    fvCampaign: $fvCampaign\n    fvContent: $fvContent\n    fvTerm: $fvTerm\n    lvType: $lvType\n    lvSource: $lvSource\n    lvMedium: $lvMedium\n    lvCampaign: $lvCampaign\n    lvContent: $lvContent\n    lvTerm: $lvTerm\n    gClientid: $gClientid\n    gIp: $gIp\n    gAgent: $gAgent\n    gclid: $gclid\n  ) {\n    ...UserBase\n    ...UserPrimaryProfile\n    ...UserEngagementFields\n    __typename\n  }\n}\n\nfragment UserBase on User {\n  id\n  firstName\n  lastName\n  computedName\n  username\n  email\n  phone\n  inactive\n  confirmed\n  lastActionTime\n  created\n  isAdminUser\n  linkedinUrl\n  behanceUrl\n  githubUrl\n  ethWalletAddress\n  __typename\n}\n\nfragment UserPrimaryProfile on User {\n  primaryProfile\n  __typename\n}\n\nfragment UserEngagementFields on User {\n  fvType\n  fvSource\n  fvMedium\n  fvCampaign\n  fvContent\n  fvTerm\n  lvType\n  lvSource\n  lvMedium\n  lvCampaign\n  lvContent\n  lvTerm\n  gClientid\n  gIp\n  gAgent\n  gclid\n  __typename\n}\n',
    };

    return await this.step(`Creaate new user`, async () => {
      return await this.post(payload);
    });
  }

  async updateProfileContacts(profileContacts: ProfileContacts) {
    const payload = {
      operationName: 'updateProfileContacts',
      variables: {
        ...profileContacts,
        ethWalletAddress: 'without_eth_wallet_address',
      },
      query:
        'mutation updateProfileContacts($phone: String, $firstName: String, $lastName: String, $linkedinUrl: String, $behanceUrl: String, $githubUrl: String, $ethWalletAddress: String) {\n  updateProfileContacts(\n    firstName: $firstName\n    lastName: $lastName\n    phone: $phone\n    linkedinUrl: $linkedinUrl\n    behanceUrl: $behanceUrl\n    githubUrl: $githubUrl\n    ethWalletAddress: $ethWalletAddress\n  ) {\n    ...UserBase\n    ...UserPrimaryProfile\n    __typename\n  }\n}\n\nfragment UserBase on User {\n  id\n  firstName\n  lastName\n  computedName\n  username\n  email\n  phone\n  inactive\n  confirmed\n  lastActionTime\n  created\n  isAdminUser\n  linkedinUrl\n  behanceUrl\n  githubUrl\n  ethWalletAddress\n  __typename\n}\n\nfragment UserPrimaryProfile on User {\n  primaryProfile\n  __typename\n}\n',
    };

    return await this.step(`Update profile contacts`, async () => {
      return await this.post(payload);
    });
  }
}
