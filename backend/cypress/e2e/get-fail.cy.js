describe("API Test", () => {
  it("should fail to fetch users from the API with an incorrect endpoint", () => {
    // Send a GET request to a non-existent API endpoint
    cy.request({
      method: "GET",
      url: "http://localhost:5555/invalid-endpoint",
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx response
    }).then((response) => {
      // Verify that the response status is not 200 (OK)
      expect(response.status).to.not.equal(200);
    });
  });
});

describe("API Test", () => {
  it("should fail to fetch a user by ID from the API with an invalid ID", () => {
    // Define an invalid user ID (e.g., a non-existent ID)
    const invalidUserId = 200; // Replace with an invalid user ID

    // Send a GET request to your API endpoint with the invalid user ID
    cy.request({
      method: "GET",
      url: `http://localhost:5555/users/${invalidUserId}`,
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx response
    }).then((response) => {
      // Verify that the response status is not 200 (OK)
      expect(response.status).to.not.equal(200);
    });
  });
});
