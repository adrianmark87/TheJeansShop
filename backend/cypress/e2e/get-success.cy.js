// describe("API Test", () => {
//   it("should fetch users from the API", () => {
//     // Send a GET request to your API endpoint
//     cy.request("GET", "http://localhost:5555/user/1").then((response) => {
//       // Verify that the response status is 200 (OK)
//       expect(response.status).to.equal(200);

//       // Verify the response body
//       expect(response.body).to.deep.equal([
//         {
//           id: 1,
//           first_name: "John",
//           last_name: "Doe",
//           birth_date: "1990-05-14T22:00:00.000Z",
//           phone: "0612345678",
//           email: "john.doe@email.com",
//           address: "123 Main St",
//           zip_code: 12345,
//           city: "New York",
//           password: "test",
//           is_admin: 1,
//           subscription_date: "2023-09-09T22:00:00.000Z",
//           expo_push_token: null,
//           password_token: null,
//           password_token_expiration: null,
//         },
//       ]);
//     });
//   });
// });

describe("API Test", () => {
  it("should fetch a user by ID from the API", () => {
    // Define the user ID you want to fetch
    const userId = 1; // Replace with the desired user ID

    // Send a GET request to your API endpoint with the user ID
    cy.request(`GET`, `http://localhost:5555/user/${userId}`).then(
      (response) => {
        // Verify that the response status is 200 (OK)
        expect(response.status).to.equal(200);

        // Verify the response body, which should correspond to the user with the specified ID
        expect(response.body).to.deep.equal({
          id: 1,
          first_name: "John",
          last_name: "Doe",
          birth_date: "1990-05-14T22:00:00.000Z",
          phone: "0612345678",
          email: "john.doe@email.com",
          address: "123 Main St",
          zip_code: 12345,
          city: "New York",
          password: "test",
          is_admin: 1,
          subscription_date: "2023-09-09T22:00:00.000Z",
          expo_push_token: null,
          password_token: null,
          password_token_expiration: null,
        });
      }
    );
  });
});
