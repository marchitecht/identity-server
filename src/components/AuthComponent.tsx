import React, { useEffect, useState } from "react";

const AuthComponent = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Function to fetch the access token
    const fetchAccessToken = async () => {
      try {
        // Replace with your client_id and client_secret
        const clientId = "UiTest.client";
        const clientSecret = "UiTestClientSecret";

        // Construct the token request
        const tokenRequest = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        };

        // Make the token request to the OIDC server
        const response = await fetch(
          "https://sts-identity.intelwash.ru/token",
          tokenRequest
        );

        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.access_token);
        } else {
          // Handle error here
          console.error("Failed to obtain access token");
        }
      } catch (error) {
        // Handle any network or other errors here
        console.error("Error:", error);
      }
    };

    // Call the function to fetch the access token
    fetchAccessToken();
  }, []);

  const makeApiRequest = async () => {
    try {
      // Replace 'https://api.intelwash.ru/your_endpoint' with your actual API endpoint
      const apiUrl = "https://api.intelwash.ru/uitest/index.html";

      // Make the API request with the access token
      const response = await fetch(apiUrl, {
        method: "GET", // or 'POST', 'PUT', etc. depending on your API
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the 'Authorization' header
          "Content-Type": "application/json", // Set the content type as needed
        },
        // You can include a request body here if needed
        // body: JSON.stringify({ key: 'value' }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the API response data here
        console.log("API Response:", data);
      } else {
        // Handle API request error here
        console.error("API Request Error:", response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors here
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <p>Access Token: {accessToken}</p>
          {/* You can use the access token to make API requests */}
          {/* Example API request using the access token */}
          {/* Replace 'https://api.intelwash.ru/your_endpoint' with your actual API endpoint */}
          {/* Make sure to include the 'Authorization' header with 'Bearer' token */}
          <button onClick={makeApiRequest}>Make API Request</button>
        </div>
      ) : (
        <p>Fetching access token...</p>
      )}
    </div>
  );
};

export default AuthComponent;
