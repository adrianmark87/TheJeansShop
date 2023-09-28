describe("API Test", () => {
  let email;
  it("should register a new user", () => {
    const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);

    // Generate a random 10-digit phone number
    const random10DigitPhone = Math.floor(
      1000000000 + Math.random() * 9000000000
    );

    // Create a unique email with "test" + random 4 digits
    email = `test${random4DigitNumber}@test.com`;

    cy.request("POST", "http://localhost:5555/user", {
      first_name: "Adrian",
      last_name: "Mark",
      birth_date: "1990-01-01",
      phone: random10DigitPhone.toString(),
      email,
      address: "123 Main St",
      zip_code: 12345,
      city: "Sample City",
      password: "test",
      is_admin: 1,
    }).then((response) => {
      expect(response.status).to.equal(201);
    });
  });

  it("should log in and recover the token", () => {
    // Use the same email and password used for registration
    const password = "test";

    cy.request({
      method: "POST",
      url: `http://localhost:5555/login`,
      credentials: "include",
      body: {
        email, // Use the email from the registration test
        password,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      // Assuming your API returns a JWT token, you can save it for future requests
      console.log(response.headers);
      const token = response.headers.get("set-cookie");
      expect(token).to.exist;

      // You can save the token in a Cypress custom command or context for future use
      cy.wrap(token).as("authToken");
    });
  });
});
