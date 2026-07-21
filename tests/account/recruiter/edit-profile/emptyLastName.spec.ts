import { test } from '../../../_fixtures/fixtures';
import { LAST_NAME_IS_REQUIRED } from '../../../../src/ui/constants/validationMessages';

test.describe(`Update recruiter profile`, () => {
  test.use({ storageState: 'playwright/.auth/recruiter.json' });

  test(`User should see validation error when last name is empty`, async ({
    reporter,
    editRecruiterProfileContactsPage,
  }) => {
    await reporter.severity('minor');

    const lastName = '';

    const waitForResponse = false;

    await editRecruiterProfileContactsPage.open();
    await editRecruiterProfileContactsPage.profileContacts.fillLastName(lastName);
    await editRecruiterProfileContactsPage.clickSaveChanges(waitForResponse);
    await editRecruiterProfileContactsPage.assertLastNameValidationMessage(LAST_NAME_IS_REQUIRED);
  });
});
