import { test as setup } from '@fixtures/fixtures';
import path from 'path';

const candidate = path.join(__dirname, '../playwright/.auth/candidate.json');
const recruiter = path.join(__dirname, '../playwright/.auth/recruiter.json');

setup(`authenticate as candidate`, async ({ context, registerNewCandidate }) => {
  await context.request.storageState({ path: candidate });
});

setup(`authenticate as recruiter`, async ({ context, registerNewRecruiter }) => {
  await context.request.storageState({ path: recruiter });
});
