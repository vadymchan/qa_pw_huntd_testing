import { test } from '../../../_fixtures/fixtures';

test.describe(`Register as candidate`, () => {
  test(`User should register with valid required-only fields`, async ({
    userCredentials,
    candidateProfile,
    workPlace,
    candidateProfileContacts,
    signUpUserPage,
    chooseProfilePage,
    candidateProfilePage,
    candidateProfileJobExpectationsPage,
    candidateProfileExperiencePage,
    candidateProfileBioPage,
    candidateProfileContactsPage,
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

    await candidateProfilePage.assertOpened();
    await candidateProfilePage.fillDesiredPosition(candidateProfile.desiredPosition);
    await candidateProfilePage.selectDesiredRoles(candidateProfile.desiredRoles);
    await candidateProfilePage.selectCoreTechnicalSkills(candidateProfile.coreTechnicalSkills);
    await candidateProfilePage.clickSaveAndContinue();

    await candidateProfileJobExpectationsPage.assertOpened();
    await candidateProfileJobExpectationsPage.clickSalaryType(candidateProfile.salaryType);
    await candidateProfileJobExpectationsPage.fillDesiredBaseSalary(
      `${candidateProfile.desiredBaseSalary}`,
    );
    await candidateProfileJobExpectationsPage.selectJobExperience(candidateProfile.jobExperience);
    await candidateProfileJobExpectationsPage.selectEnglishLevel(candidateProfile.englishLevel);
    await candidateProfileJobExpectationsPage.selectYourLocation(candidateProfile.yourLocation);
    await candidateProfileJobExpectationsPage.clickSaveAndContinue();

    await candidateProfileExperiencePage.assertOpened();
    await candidateProfileExperiencePage.clickAddManually();
    await candidateProfileExperiencePage.fillRole(workPlace.role);
    await candidateProfileExperiencePage.fillCompanyName(workPlace.companyName);
    await candidateProfileExperiencePage.selectStartMonth(workPlace.startMonth);
    await candidateProfileExperiencePage.fillStartYear(`${workPlace.startYear}`);
    await candidateProfileExperiencePage.clickSave();
    await candidateProfileExperiencePage.clickSaveAndContinue();

    await candidateProfileBioPage.assertOpened();
    await candidateProfileBioPage.fillAchivements(candidateProfile.achievements);
    await candidateProfileBioPage.clickSaveAndContinue();

    await candidateProfileContactsPage.assertOpened();
    await candidateProfileContactsPage.fillFirstName(candidateProfileContacts.firstName);
    await candidateProfileContactsPage.fillLastName(candidateProfileContacts.lastName);
    await candidateProfileContactsPage.clickActivateProfile();

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
    await candidateProfilePreviewPage.assertAchivementsHaveText(candidateProfile.achievements);
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
