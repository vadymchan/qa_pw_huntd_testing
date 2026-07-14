import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { testStep } from '../utils/playwright/testStep';
import { SUCCESS_RESPONSE_CODE } from '../utils/constants/responseCodes';

export class BaseApi {
  _endpoint: string;
  _headers: Record<string, string>;
  _request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this._endpoint = '/graphql';
    this._headers = {
      'Content-Type': 'application/json',
    };
    this._request = request;
  }

  async step(testTitle: string, stepToRun) {
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
    const response = await this._request.post(this._endpoint, {
      data: payload,
      headers: this._headers,
    });

    this.assertSuccessResponseCode(response);

    await this.throwOnGraphqlErrors(response);

    return response;
  }
}
