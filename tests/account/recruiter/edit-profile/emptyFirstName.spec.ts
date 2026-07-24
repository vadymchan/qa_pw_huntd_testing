import { test } from '@fixtures/fixtures';
import { FIRST_NAME_IS_REQUIRED } from '@ui/constants/validationMessages';

test.describe(`Update recruiter profile`, () => {
  test.use({ storageState: 'playwright/.auth/recruiter.json' });

  test(`User should see validation error when first name is empty`, async ({
    reporter,
    editRecruiterProfileContactsPage,
  }) => {
    await reporter.severity('minor');

    const firstName = '';

    const waitForResponse = false;

    await editRecruiterProfileContactsPage.open();
    await editRecruiterProfileContactsPage.profileContacts.fillFirstName(firstName);
    await editRecruiterProfileContactsPage.clickSaveChanges(waitForResponse);
    await editRecruiterProfileContactsPage.assertFirstNameValidationMessage(FIRST_NAME_IS_REQUIRED);
  });
});
