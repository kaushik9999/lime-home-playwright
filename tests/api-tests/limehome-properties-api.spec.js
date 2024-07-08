import { expect, test } from "@playwright/test"

test.describe('Limehome properties API tests', () => {

  test('GET - 129 API Tests', async ({ request }) => {
    const expectedResponse = require('../api-tests/responseData/getProperty129Res.json'); // load the repsonse stored in test data json file
    const response = await request.get(`https://api.limehome.com/properties/v1/public/properties/129`); //send the request
    await test.step('Assert if the response status is OK', async () => {
      expect(response.ok()).toBeTruthy(); // Assert if the status is OK
    });
    const responseJson = await response.json();
    await test.step('Assert if the status code is 200', async () => {
      expect(response.status()).toEqual(200); // Assert if the status code is 200 
    });

    await test.step('Assert if the entire response body is equal to the expected ', async () => {
      expect(responseJson).toEqual(expectedResponse);; // Assert the entire response body
    });

    await test.step('Assert name of the property in the response', async () => {
      expect(responseJson.payload.name).toEqual("aachen vereinsstraße");; // Assert the name of the property
    });
    await test.step('Assert ID of the property in the response', async () => {
      expect(responseJson.payload.id).toEqual(129);; // Assert the ID of the property
    });
    await test.step('Assert the Location of the property in the response', async () => {
      const locationJson = { "lat": 50.7697713, "lng": 6.0931558, "city": "Aachen", "postalCode": "52062", "countryCode": "DE", "addressLine1": "Vereinsstraße 2", "countryName": "Germany" };
      expect(responseJson.payload.location).toEqual(locationJson);; // Assert the ID of the property
    });
  });

})