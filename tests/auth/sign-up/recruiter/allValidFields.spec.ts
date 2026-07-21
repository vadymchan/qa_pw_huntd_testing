import { test } from '../../../_fixtures/fixtures';

test.describe('Register as recruiter', () => {
  test(`User should register with all valid fields`, async ({
    reporter,
    userCredentials,
    recruiterProfile,
    recruiterProfileContacts,
    perfectCandidate,
    signUpUserPage,
    chooseProfilePage,
    createRecruiterProfilePage: recruiterProfilePage,
    createRecruiterProfileContactsPage: recruiterProfileContactsPage,
    createRecruiterProfilePerfectCandidatePage: recruiterProfilePerfectCandidatePage,
    recruiterProfilePreviewPage: recruiterProfilePreviewPage,
  }) => {
    await reporter.severity('critical');

    await signUpUserPage.open();
    await signUpUserPage.fillEmail(userCredentials.email);
    await signUpUserPage.fillPassword(userCredentials.password);
    await signUpUserPage.fillRepeatPassword(userCredentials.password);
    await signUpUserPage.clickCreateAccount();

    await chooseProfilePage.assertOpened();
    await chooseProfilePage.clickRecruiter();

    await recruiterProfilePage.assertOpened();
    await recruiterProfilePage.recruiterProfile.fillRole(recruiterProfile.role);
    await recruiterProfilePage.recruiterProfile.fillCompany(recruiterProfile.companyName);
    await recruiterProfilePage.clickSaveAndContinue();

    await recruiterProfileContactsPage.assertOpened();
    await recruiterProfileContactsPage.component.fillFirstName(recruiterProfileContacts.firstName);
    await recruiterProfileContactsPage.component.fillLastName(recruiterProfileContacts.lastName);
    await recruiterProfileContactsPage.component.fillLinkedin(recruiterProfileContacts.linkedinUrl);
    await recruiterProfileContactsPage.clickSaveAndContinue();

    await recruiterProfilePerfectCandidatePage.assertOpened();
    await recruiterProfilePerfectCandidatePage.selectRoles(perfectCandidate.candidateRoles);
    await recruiterProfilePerfectCandidatePage.selectTechnologies(
      perfectCandidate.candidateTechnologies,
    );
    await recruiterProfilePerfectCandidatePage.selectJobExperience(perfectCandidate.jobExperience);
    await recruiterProfilePerfectCandidatePage.selectEnglishLevel(perfectCandidate.englishLevel);
    await recruiterProfilePerfectCandidatePage.clickNext();
    await recruiterProfilePerfectCandidatePage.fillTemplateMessage(
      perfectCandidate.templateMessage,
    );
    await recruiterProfilePerfectCandidatePage.clickSend();

    await recruiterProfilePreviewPage.open();
    await recruiterProfilePreviewPage.assertFullNameHasText(
      recruiterProfileContacts.firstName,
      recruiterProfileContacts.lastName,
    );
    await recruiterProfilePreviewPage.assertRoleHasText(recruiterProfile.role);
    await recruiterProfilePreviewPage.assertCompanyHasText(recruiterProfile.companyName);
    await recruiterProfilePreviewPage.assertEmailHasText(userCredentials.email);
  });
});
