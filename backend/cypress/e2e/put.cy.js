describe('API Test', () => {
    it('should update a user via PUT request', () => {
      // Define the user data you want to update
      const updatedUserData = {
        name: 'Updated User',
        description: 'Tester Updated',
        is_done: 0,
      };
  
      // Send a PUT request to update the user with a known ID (replace {userId} with the actual user ID)
      const userId = 2; // Replace with the desired user ID
      cy.request('PUT', `http://localhost:5560/users/${userId}`, updatedUserData)
        .then((response) => {
          // Verify that the response status is 200 (OK) for successful update
          expect(response.status).to.equal(201);
  
          // Verify the response body to ensure the specific fields match the updated data
          expect(response.body.name).to.equal(updatedUserData.name);
          expect(response.body.description).to.equal(updatedUserData.description);
  
          // You can further validate other fields as needed
        });
    });
  });
 
  
  describe('API Test', () => {
    it('should fail to update a user with invalid data via PUT request', () => {
      // Define the user data you want to update
      const updatedUserData = {
        name: 'Updated User',
        description: 'Tester Updated',
        is_done: 'Invalid Value', // Intentionally providing an invalid value
      };
  
      // Send a PUT request to update the user with a known ID (replace {userId} with the actual user ID)
      const userId = 2; // Replace with the desired user ID
      cy.request({
        method: 'PUT',
        url: `http://localhost:5560/users/${userId}`,
        body: updatedUserData,
        failOnStatusCode: false, // Allow the test to continue even if the request fails
      }).then((response) => {
        // Verify that the response status is not 200 (indicating a failed update)
        expect(response.status).to.not.equal(200);
  
        // You can further validate the response body or message for specific error handling
      });
    });
  });
  