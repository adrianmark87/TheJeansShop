describe('API Test', () => {
  it('should create a new user via POST request', () => {
    // Define the user data you want to send in the request
    const newUser = {
      name: 'New User',
      description: 'Tester',
      is_done: 1,
    };

    // Send a POST request to your API endpoint with the user data
    cy.request('POST', 'http://localhost:5560/users', newUser)
      .then((response) => {
        // Verify that the response status is 201 (Created) for successful creation
        expect(response.status).to.equal(201);

        // Verify the response body to ensure the specific fields match
        expect(response.body.name).to.equal('New User');
        expect(response.body.description).to.equal(newUser.description);
        expect(response.body.is_done).to.equal(newUser.is_done);

        // You can further validate other fields as needed
      });
  });
});


  describe('API Test', () => {
  it('should fail to create a user with invalid data via POST request', () => {
    // Define invalid user data (e.g., missing required fields)
    const invalidUser = {
      description: 'Tester',
      is_done: 1,
    };

    // Send a POST request to your API endpoint with invalid user data
    cy.request({
      method: 'POST',
      url: 'http://localhost:5560/users',
      body: invalidUser,
      failOnStatusCode: false, // Allow the test to continue even if the request fails
    }).then((response) => {
      // Verify that the response status is 500 (Internal Server Error) for failed creation
      expect(response.status).to.equal(500);

      // You can further validate the response body or message for specific error handling
    });
  });
});

  
  