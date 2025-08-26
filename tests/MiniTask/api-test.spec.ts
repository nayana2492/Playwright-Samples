import { test, expect } from '@playwright/test';

test.describe('API Testing with Playwright', () => {

  test('Verify first_name from GET API', async ({ request }) => {
    // Send GET request
    const response = await request.get('https://reqres.in/api/users/2');

    // Expect the response to be OK
    expect(response.ok()).toBeTruthy();

    // Parse response body as JSON
    const responseBody = await response.json();

    // Extract first_name and assert
    expect(responseBody.data.first_name).toBe('Janet');

    console.log('First name from API:', responseBody.data.first_name);
  });

});
