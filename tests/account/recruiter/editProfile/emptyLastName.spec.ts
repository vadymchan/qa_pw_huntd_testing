import { test } from '../../../_fixtures/fixtures';

test.describe(`Update recruiter profile`, () => {
  test.use({ storageState: 'playwright/.auth/recruiter.json' });

  test(`User should see validation error when last name is empty`, async ({
    editRecruiterProfileContactsPage,
  }) => {
    const lastName = '';

    const waitForResponse = false;

    await editRecruiterProfileContactsPage.open();
    await editRecruiterProfileContactsPage.profileContacts.fillLastName(lastName);
    await editRecruiterProfileContactsPage.clickSaveChanges(waitForResponse);
    await editRecruiterProfileContactsPage.assertLastNameValidationMessage('Last name is required');
  });
});
