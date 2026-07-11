import { Page } from '@playwright/test';
import { SUCCESS_RESPONSE_CODE } from '../constants/responseCodes';

export async function graphqlWaitForResponse(
  page: Page,
  operationName: string,
  actionFn: () => Promise<void>,
) {
  const responsePromise = page.waitForResponse(async (response) => {
    const request = response.request();

    if (!response.url().includes('/graphql') || request.method() !== 'POST') {
      return false;
    }

    const payload = request.postDataJSON();

    return (
      payload &&
      payload.operationName === operationName &&
      response.status() === SUCCESS_RESPONSE_CODE
    );
  });

  await actionFn();

  await responsePromise;
}
