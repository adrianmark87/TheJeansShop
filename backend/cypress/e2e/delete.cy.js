/* eslint-disable */
const { token } = require("./registerLogin-success.cy");

describe("API Test", () => {
  it("should successfully delete a user by ID from the API", () => {
    // const userIdToDelete = 80;
    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${authToken}`);
    // Send a DELETE request to your API endpoint with the user ID to delete
    cy.request({
      method: "DELETE",
      url: `http://localhost:5555/user/80`,     
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response);
      // Verify that the response status is 200 (OK) for successful deletion
      expect(response.status).to.equal(204);
    });
  });

  // it("should fail to delete a user with an invalid ID from the API", () => {
  //   const invalidUserIdToDelete = 100; // Replace with an invalid user ID
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", `Bearer ${authToken}`);
  //   // Send a DELETE request to your API endpoint with the invalid user ID
  //   cy.request({
  //     method: "DELETE",
  //     url: `http://localhost:5555/user/${invalidUserIdToDelete}`,
  //     auth: { 'bearer': authToken },
  //     failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx response
  //   }).then((response) => {
  //     // Verify that the response status is not 200 (OK) for failed deletion
  //     expect(response.status).not.to.equal(200);
  //   });
  // });
});
