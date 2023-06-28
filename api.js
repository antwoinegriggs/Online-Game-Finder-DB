// api.js

exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    try {
      // Process the GET request as needed
      const data = require("./db.json");

      // Return the data as the response
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      // Return an error response if there was an issue processing the request
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to process GET request" }),
      };
    }
  } else if (event.httpMethod === "POST") {
    try {
      // Parse the incoming JSON payload from the request body
      const requestBody = JSON.parse(event.body);

      // Process the data from the request body as needed
      // ...

      // Return a success response
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "POST request processed successfully",
        }),
      };
    } catch (error) {
      // Return an error response if there was an issue processing the request
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Failed to process POST request" }),
      };
    }
  } else {
    // Handle other HTTP methods (e.g., PUT, DELETE) if needed
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }
};
