// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnlaAw6Jjzvzgz3HKtBs2Z3R0C8vhwLA8",
  authDomain: "online-games-db.firebaseapp.com",
  databaseURL: "https://online-games-db-default-rtdb.firebaseio.com",
  projectId: "online-games-db",
  storageBucket: "online-games-db.appspot.com",
  messagingSenderId: "571802787583",
  appId: "1:571802787583:web:48300a232326466e40f6ca",
  measurementId: "G-TC4NEBZ8HK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

exports.handler = async (event, context) => {
  // Set headers to enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST",
  };

  if (event.httpMethod === "GET") {
    try {
      // Process the GET request as needed
      const data = require("./db.json");

      // Return the data as the response
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    } catch (error) {
      // Return an error response if there was an issue processing the request
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to process GET request" }),
      };
    }
  } else if (event.httpMethod === "POST") {
    try {
      // Parse the incoming JSON payload from the request body
      const requestBody = JSON.parse(event.body);

      // Save the data to Firestore in the "games" collection with a specific document ID
      await db.collection("games").doc("docid").set(requestBody);

      // Return a success response
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "POST request processed successfully",
        }),
      };
    } catch (error) {
      // Return an error response if there was an issue processing the request
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Failed to process POST request" }),
      };
    }
  } else {
    // Handle other HTTP methods (e.g., PUT, DELETE) if needed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }
};
