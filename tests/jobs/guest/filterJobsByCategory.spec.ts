import { test } from '@fixtures/fixtures';
import { JOB_CATEGORY_HEADER } from '@ui/constants/guestJobsMessages';
import { JobCategoryPage } from '@ui/pages/jobs/JobCategoryPage';
import { formatPhraseToTitleCase } from '@utils/format/formatString';

test.describe(`Browse jobs as a guest`, () => {
  test(`Jobs should be filtered by category`, async ({ page, reporter, guestJobsPage }) => {
    await reporter.severity('normal');

    const jobCategory = 'frontend';
    const jobCategoryCapitalized = formatPhraseToTitleCase(jobCategory);

    const jobCategoryPage = new JobCategoryPage(page, jobCategory);

    await guestJobsPage.open();
    await guestJobsPage.clickCategory(jobCategory);
    await jobCategoryPage.assertOpened();
    await jobCategoryPage.assertHeaderHasText(JOB_CATEGORY_HEADER(jobCategoryCapitalized));
  });
});
