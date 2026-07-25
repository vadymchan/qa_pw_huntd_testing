import { JobCategory } from '@models/jobs/JobCategory';
import { expect, Locator, Page } from '@playwright/test';
import { PATHS } from '@ui/constants/paths';
import { BasePage } from '@ui/pages/BasePage';

export class JobCategoryPage extends BasePage {
  private header: Locator;

  constructor(page: Page, jobCategory: JobCategory) {
    super(page, PATHS.jobs.category(jobCategory));

    this.header = page.getByRole('heading', { level: 1 });
  }

  async assertHeaderHasText(header: string) {
    await this.step(`Assert header has '${header}' text`, async () => {
      await expect(this.header).toHaveText(header);
    });
  }
}
