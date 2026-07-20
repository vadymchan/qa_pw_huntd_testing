import { test } from '../../../_fixtures/fixtures';

test.describe(`Register as candidate`, () => {
  test(`User should register with valid required-only fields`, async ({
    userCredentials,
    candidateProfile,
    workPlace,
    candidateProfileContacts,
    signUpUserPage,
    chooseProfilePage,
    createCandidateProfilePage,
    createCandidateProfileJobExpectationsPage,
    createCandidateProfileExperiencePage,
    createCandidateProfileBioPage,
    createCandidateProfileContactsPage,
    candidateProfilePreviewPage,
    candidateProfileFeedbackPage,
  }) => {
    await signUpUserPage.open();
    await signUpUserPage.fillEmail(userCredentials.email);
    await signUpUserPage.fillPassword(userCredentials.password);
    await signUpUserPage.fillRepeatPassword(userCredentials.password);
    await signUpUserPage.clickCreateAccount();

    await chooseProfilePage.assertOpened();
    await chooseProfilePage.clickCandidate();

    await createCandidateProfilePage.assertOpened();
    await createCandidateProfilePage.candidateProfile.fillDesiredPosition(
      candidateProfile.desiredPosition,
    );
    await createCandidateProfilePage.candidateProfile.selectDesiredRoles(
      candidateProfile.desiredRoles,
    );
    await createCandidateProfilePage.candidateProfile.selectCoreTechnicalSkills(
      candidateProfile.coreTechnicalSkills,
    );
    await createCandidateProfilePage.clickSaveAndContinue();

    await createCandidateProfileJobExpectationsPage.assertOpened();
    await createCandidateProfileJobExpectationsPage.profileJobExpectations.clickSalaryType(
      candidateProfile.salaryType,
    );
    await createCandidateProfileJobExpectationsPage.profileJobExpectations.fillDesiredBaseSalary(
      `${candidateProfile.desiredBaseSalary}`,
    );
    await createCandidateProfileJobExpectationsPage.profileJobExpectations.selectJobExperience(
      candidateProfile.jobExperience,
    );
    await createCandidateProfileJobExpectationsPage.profileJobExpectations.selectEnglishLevel(
      candidateProfile.englishLevel,
    );
    await createCandidateProfileJobExpectationsPage.profileJobExpectations.selectYourLocation(
      candidateProfile.yourLocation,
    );
    await createCandidateProfileJobExpectationsPage.clickSaveAndContinue();

    await createCandidateProfileExperiencePage.assertOpened();
    await createCandidateProfileExperiencePage.clickAddManually();
    await createCandidateProfileExperiencePage.profileExperience.fillRole(workPlace.role);
    await createCandidateProfileExperiencePage.profileExperience.fillCompanyName(
      workPlace.companyName,
    );
    await createCandidateProfileExperiencePage.profileExperience.selectStartMonth(
      workPlace.startMonth,
    );
    await createCandidateProfileExperiencePage.profileExperience.fillStartYear(
      `${workPlace.startYear}`,
    );
    const waitForResponse = true;
    await createCandidateProfileExperiencePage.profileExperience.clickSave(
      waitForResponse,
      'Create',
    );
    await createCandidateProfileExperiencePage.clickSaveAndContinue();

    await createCandidateProfileBioPage.assertOpened();
    await createCandidateProfileBioPage.profileBio.fillAchievements(candidateProfile.achievements);
    await createCandidateProfileBioPage.clickSaveAndContinue();

    await createCandidateProfileContactsPage.assertOpened();
    await createCandidateProfileContactsPage.profileContacts.fillFirstName(
      candidateProfileContacts.firstName,
    );
    await createCandidateProfileContactsPage.profileContacts.fillLastName(
      candidateProfileContacts.lastName,
    );
    await createCandidateProfileContactsPage.clickActivateProfile();

    await candidateProfileFeedbackPage.assertOpened();
    await candidateProfileFeedbackPage.assertHeaderHasText(
      'Congrats, your Hunter profile is all set!',
    );

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertDesiredPositionHasText(
      candidateProfile.desiredPosition,
    );
    await candidateProfilePreviewPage.assertLocationContainsText(candidateProfile.yourLocation);
    await candidateProfilePreviewPage.assertJobExperienceHasText(candidateProfile.jobExperience);
    await candidateProfilePreviewPage.assertSalaryHasText(
      candidateProfile.salaryType,
      candidateProfile.desiredBaseSalary,
    );
    await candidateProfilePreviewPage.assertEnglishLevelHasText(candidateProfile.englishLevel);
    await candidateProfilePreviewPage.assertAchievementsHaveText(candidateProfile.achievements);
    await candidateProfilePreviewPage.assertCoreTechnicalSkillsHaveText(
      candidateProfile.coreTechnicalSkills,
    );
    await candidateProfilePreviewPage.assertDesiredRolesHaveText(candidateProfile.desiredRoles);
    await candidateProfilePreviewPage.assertPreviousRoleHasText(workPlace.role);
    await candidateProfilePreviewPage.assertPreviousCompanyHasText(workPlace.companyName);
    await candidateProfilePreviewPage.assertPreviousJobDatesHaveText(
      workPlace.startMonth,
      workPlace.startYear,
    );
    await candidateProfilePreviewPage.assertFullNameHasText(
      candidateProfileContacts.firstName,
      candidateProfileContacts.lastName,
    );
    await candidateProfilePreviewPage.assertEmailHasText(userCredentials.email);
  });
});
