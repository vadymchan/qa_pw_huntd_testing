import { test } from '@fixtures/fixtures';
import { LAST_NAME_IS_REQUIRED } from '@ui/constants/validationMessages';

test.describe(`Update recruiter profile`, () => {
  test.use({ storageState: 'playwright/.auth/recruiter.json' });

  test(`User should see validation error when last name is empty`, async ({
    reporter,
    editRecruiterProfileContactsPage,
  }) => {
    await reporter.severity('minor');

    const lastName = '';

    await editRecruiterProfileContactsPage.open();
    await editRecruiterProfileContactsPage.profileContacts.fillLastName(lastName);
    await editRecruiterProfileContactsPage.clickSaveChanges();
    await editRecruiterProfileContactsPage.assertLastNameValidationMessage(LAST_NAME_IS_REQUIRED);
  });
});
