import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { generateSalaryString } from '../../../../src/utils/generators/generateSalaryString';

test.describe(`Register as candidate`, () => {
  test(`User should register with valid required-only fields`, async ({ page }) => {
    await page.goto('/sign-up');

    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password();
    const desiredPosition = 'Qa';
    const desiredRoles = ['PM'];
    const coreTechnicalSkills = [
      'DevOps',
      'JavaScript',
      'API testing',
      'manual testing',
      'Mobile testing',
    ];
    const desiredBaseSalary = 2400;
    const jobExperience = 'Less than 1 year';
    const englishLevel = 'Elementary';
    const location = 'Kharkiv';

    const salaryType = 'Annual';
    const previousRole = 'Automation Qa';
    const previousCompany = 'Mate Academy';
    const startMonth = 'January';
    const startYear = 2025;
    const achivements = faker.lorem.sentence();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Repeat password').fill(password);
    await page.getByRole('button', { name: 'Create account' }).click();

    await page.getByRole('link', { name: 'Candidate hunting for interesting job offers' }).click();

    await page
      .getByRole('textbox', { name: 'Desired position' })
      .pressSequentially(desiredPosition);

    for (const role of desiredRoles) {
      await page.getByLabel('Desired roles').focus();
      await page.keyboard.press('ArrowDown');
      await page.locator('.select__option').getByText(role, { exact: true }).click();
    }

    for (const skill of coreTechnicalSkills) {
      await page.getByRole('textbox', { name: 'Core technical skills' }).fill(skill);
      await expect(
        page.locator('.select__option').filter({ hasText: new RegExp(`^${skill}$`) }),
      ).toBeVisible();
      await page.keyboard.press('Enter');
    }

    await page.getByRole('button', { name: 'Save and continue' }).click();

    await page.getByRole('button', { name: salaryType }).click();
    await page
      .getByRole('textbox', { name: /Desired base salary/i })
      .pressSequentially(`${desiredBaseSalary}`);
    // Use focus + ArrowDown because react-select hides the actual input, making .click() flacky
    await page.getByLabel('Job experience').focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('.select__option').getByText(jobExperience, { exact: true }).click();
    // Use focus + ArrowDown because react-select hides the actual input, making .click() flaky
    await page.getByLabel('English level').focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('.select__option').getByText(englishLevel, { exact: true }).click();
    const responsePromise = page.waitForResponse((r) => r.url().includes('GetPlaceDetails'));
    await page.getByRole('textbox', { name: 'Your Location' }).fill(location);
    await page.locator('.pac-item').first().click();
    await responsePromise;

    await page.getByRole('button', { name: 'Save and continue' }).click();

    await page.getByRole('button', { name: 'Add manually' }).click();
    await page.getByLabel('Role').fill(previousRole);
    await page.getByLabel('Company name').fill(previousCompany);
    // Use focus + ArrowDown because react-select hides the actual input, making .click() flaky
    await page.locator('#startMonth').focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('.select__option').getByText(startMonth, { exact: true }).click();
    await page.locator('[name="startYear"]').fill(`${startYear}`);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Save and continue' }).click();

    await page.getByLabel('Achievements / Key results').fill(achivements);
    await page.getByRole('button', { name: 'Save and continue' }).click();

    await page.getByRole('button', { name: 'Usual avatar' }).click();
    await page.getByLabel('First name').fill(firstName);
    await page.getByLabel('Last name').fill(lastName);
    await page.getByRole('button', { name: 'Activate profile' }).click();

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Congrats, your Hunter profile is all set!',
    );

    await page.goto('/profile-preview/candidate');

    await expect(page.locator('[class*=CandidateProfilePreviewModule_title]')).toHaveText(
      `${desiredPosition}`,
    );

    await expect(
      page.locator('[class*=ProfileMeta_metaWrapper]').getByRole('listitem').first(),
    ).toContainText(location);
    await expect(
      page.locator('[class*=ProfileMeta_metaWrapper]').getByRole('listitem').nth(1),
    ).toHaveText(jobExperience);
    await expect(
      page.locator('[class*=ProfileMeta_metaWrapper]').getByRole('listitem').nth(2),
    ).toHaveText(generateSalaryString(salaryType, desiredBaseSalary));
    await expect(
      page.locator('[class*=ProfileMeta_metaWrapper]').getByRole('listitem').nth(3),
    ).toHaveText(englishLevel);

    await expect(
      page
        .locator('[class*=ProfileInfo_item]')
        .filter({
          has: page
            .locator('[class*=ProfileInfo_itemTitle]')
            .getByText('Achievements / Key results'),
        })
        .getByRole('definition'),
    ).toHaveText(achivements);

    for (const skill of coreTechnicalSkills) {
      await expect(
        page
          .locator('[class*=ProfileInfo_item]')
          .filter({
            has: page.locator('[class*=ProfileInfo_itemTitle]').getByText('Core technical skills'),
          })
          .locator('[class*=ProfileInfo_tagsContainer]')
          .getByText(skill, { exact: true }),
      ).toBeVisible();
    }

    for (const role of desiredRoles) {
      await expect(
        page
          .locator('[class*=ProfileInfo_item]')
          .filter({
            has: page.locator('[class*=ProfileInfo_itemTitle]').getByText('Considering roles'),
          })
          .getByText(role),
      ).toBeVisible();
    }

    const experience = page.locator('li[class*=ProfileWorkHistory_item]');
    await expect(experience.locator('[class*=typography_caption]')).toHaveText(previousRole);
    await expect(experience.locator('p[class*=typography_smallText]').first()).toHaveText(
      previousCompany,
    );

    await expect(experience.locator('[class*=ProfileWorkHistory_term__]').first()).toHaveText(
      `${startMonth.slice(0, 3)} ${startYear} - current time`,
    );

    await expect(page.locator('p[class*=typography_smallHeading]')).toHaveText(
      `${firstName} ${lastName}`,
    );

    await expect(page.locator('a[href^="mailto:"]')).toHaveText(email);
  });
});
