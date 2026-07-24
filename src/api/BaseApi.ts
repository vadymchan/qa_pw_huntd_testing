import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { testStep } from '@utils/playwright/testStep';
import { SUCCESS_RESPONSE_CODE } from '@api/constants/responseCodes';
import { GRAPHQL_ENDPOINT } from '@api/constants/endpoints';

export class BaseApi {
  protected endpoint: string;
  protected headers: Record<string, string>;
  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.endpoint = GRAPHQL_ENDPOINT;
    this.headers = {
      'Content-Type': 'application/json',
    };
    this.request = request;
  }

  async step<T>(testTitle: string, stepToRun: () => Promise<T> | T): Promise<T> {
    return await testStep(testTitle, stepToRun);
  }

  parseStatus(response: APIResponse) {
    return response.status();
  }

  async parseJson(response: APIResponse) {
    return await response.json();
  }

  assertSuccessResponseCode(response: APIResponse) {
    expect(this.parseStatus(response)).toBe(SUCCESS_RESPONSE_CODE);
  }

  async throwOnGraphqlErrors(response: APIResponse) {
    const body = await this.parseJson(response);
    if (body.errors?.length) {
      throw new Error(body.errors[0].message);
    }
  }

  async post(payload: object) {
    const response = await this.request.post(this.endpoint, {
      data: payload,
      headers: this.headers,
    });

    this.assertSuccessResponseCode(response);

    await this.throwOnGraphqlErrors(response);

    return response;
  }
}
