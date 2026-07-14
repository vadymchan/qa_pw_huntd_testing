import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Register as recruiter', () => {
  test(`User should register with valid required-only fields`, async ({ page }) => {
    await page.goto('/sign-up');

    const email = faker.internet.email();
    const password = faker.internet.password();
    const role = 'HR';
    const company = 'Mate Academy';
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const candidateRoles = ['QA'];
    const candidateTechnologies = ['JavaScript'];
    const candidateJobExperience = 'Less than 1 year';
    const candidateEnglishLevel = 'Elementary +';
    const templateMessage = faker.lorem.sentence();

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Repeat password').fill(password);
    await page.getByRole('button', { name: 'Create account' }).click();

    await expect(page).toHaveURL('/choose-profile');

    await page.getByRole('link', { name: 'Recruiter hiring talent' }).click();

    await expect(page).toHaveURL('/profile/recruiter');

    await page.getByLabel('My role').fill(role);
    await page.getByLabel('Company').fill(company);
    await page.getByRole('button', { name: 'Save and continue' }).click();

    await expect(page).toHaveURL('/profile/contacts?preview=recruiter');

    await page.getByLabel('First name').fill(firstName);
    await page.getByLabel('Last name').fill(lastName);
    await page.getByRole('button', { name: 'Save and continue' }).click();

    await expect(page).toHaveURL('/profile/perfect-candidate');

    for (const candidateRole of candidateRoles) {
      await page.getByLabel('Role').focus();
      await page.keyboard.press('ArrowDown');
      await page.locator('.select__option').getByText(candidateRole, { exact: true }).click();
      await page.getByLabel('Role').blur();
    }

    for (const candidateTechnology of candidateTechnologies) {
      await page.getByLabel('Technologies').fill(candidateTechnology);
      await expect(
        page.locator('.select__option').getByText(candidateTechnology, { exact: true }),
      ).toBeVisible();
      await page.keyboard.press('Enter');
      await page.getByLabel('Technologies').blur();
    }

    await page.getByLabel('Job experience').focus();
    await page.keyboard.press('ArrowDown');
    await page
      .locator('.select__option')
      .getByText(candidateJobExperience, { exact: true })
      .click();

    await page.getByLabel('English level').focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('.select__option').getByText(candidateEnglishLevel, { exact: true }).click();

    await page.getByRole('button', { name: 'Next' }).click();

    await page.locator('#messageBody').fill(templateMessage);

    await page.getByRole('button', { name: 'Send' }).click();

    // Sending messages to candidates (bulkSendMessage) takes some time, especially under heavy load
    await expect(page).toHaveURL('/chats', { timeout: 20_000 });

    await page.goto('/profile-preview/recruiter');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(`${firstName} ${lastName}`);

    await expect(page.locator('[class*=ProfileMeta_recruiterMetaItem]').first()).toHaveText(role);
    await expect(page.locator('[class*=ProfileMeta_recruiterMetaItem]').last()).toHaveText(company);

    await expect(page.locator('a[class*="typography_link"]')).toHaveText(email.toLowerCase());
  });
});
