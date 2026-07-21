export type RecruiterProfile = {
  role: string;
  companyName: string;
};

export type RecruiterProfileDto = {
  position: string;
  companyName: string;
};

export function toRecruiterProfileDto(recruiterProfile: RecruiterProfile): RecruiterProfileDto {
  return {
    position: recruiterProfile.role,
    companyName: recruiterProfile.companyName,
  };
}
