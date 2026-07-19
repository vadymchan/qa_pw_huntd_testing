import { test } from '../../../_fixtures/fixtures';

test.describe(`Update recruiter profile`, () => {
  test.use({ storageState: 'playwright/.auth/recruiter.json' });

  test(`User should see validation error when first name is empty`, async ({
    editRecruiterProfileContactsPage,
  }) => {
    const firstName = '';

    const waitForResponse = false;

    await editRecruiterProfileContactsPage.open();
    await editRecruiterProfileContactsPage.profileContacts.fillFirstName(firstName);
    await editRecruiterProfileContactsPage.clickSaveChanges(waitForResponse);
    await editRecruiterProfileContactsPage.assertFirstNameValidationMessage(
      'First name is required',
    );
  });
});
