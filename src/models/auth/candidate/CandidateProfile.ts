export class CandidateProfile {
  constructor(
    public position: string,
    public technologiesIds: Array<number>,
    public specializationsIds: Array<number>,
    public salary: number,
    public jobExperienceId: number,
    public englishLevelId: number,
    public cities: object, // TODO: create City class
    public employmentLocationsIds: Array<number>,
    public workExpectations: string,
    public achievements: string,
  ) {}
}
