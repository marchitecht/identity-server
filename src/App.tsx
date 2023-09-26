import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Suspense } from "react";
import { oauthConfig } from "./shared/oauthConfig/oauthConfig";

function OAuthCallback() {
  const location = useLocation();

  useEffect(() => {
    const { search } = location;
    const params = new URLSearchParams(search);
    const code = params.get("code");
    const state = params.get("state");

    const savedState = Cookies.get("oauth_state");
    if (state !== savedState) {
      console.error("OAuth state mismatch. Possible CSRF attack.");
      return;
    }

    (async () => {
      try {
        const { clientId, clientSecret, redirectUri } = oauthConfig;
        const response = await axios.post(oauthConfig.tokenUrl, {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        });

        const newAccessToken = response.data.access_token;
        Cookies.set("access_token", newAccessToken, {
          secure: true,
          sameSite: "none",
        });
        Cookies.remove("oauth_state");

        // Handle successful authentication (e.g., navigate to a protected route)
        window.location.href = "/protected-route";
      } catch (error) {
        console.error("OAuth error:", error);
      }
    })();
  }, [location]);

  return (
    <div>
      <p>Handling OAuth Callback...</p>
    </div>
  );
}

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const existingToken = Cookies.get("access_token");
    if (existingToken) {
      setAccessToken(existingToken);
    }
  }, []);

  const initiateOAuth = () => {
    const state = Math.random().toString(36).substring(7);
    console.log(state, 'state');
    
    Cookies.set("oauth_state", state, { secure: true, sameSite: "none" });

    const { clientId, redirectUri, scopes } = oauthConfig;
    console.log(clientId, redirectUri, scopes);
    
    const authorizationUrl = `${
      oauthConfig.authorizationUrl
    }?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${scopes.join(" ")}&state=${state}`;
    window.location.href = authorizationUrl;
  };

  const fetchApiData = async () => {
    try {
      const response = await axios.get(
        "https://api.intelwash.ru/uitest/index.html",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle the API response data
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className="App">
          <h1>OAuth 2.0  </h1>
          <Routes>
            <Route path="/auth-callback" element={<OAuthCallback />} />
            <Route path="/protected-route">
              {accessToken ? (
                <>
                  <div>Authenticated with Access Token</div>
                  <button onClick={fetchApiData}>Fetch API Data</button>
                </>
              ) : (
                <>Not Authenticated</>
              )}
            </Route>
            <Route
              path="/"
              element={
                <Home
                  accessToken={accessToken}
                  initiateOAuth={initiateOAuth}
                  fetchApiData={fetchApiData}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

function Home({
  accessToken,
  initiateOAuth,
  fetchApiData,
}: {
  accessToken: string | null;
  initiateOAuth: () => void;
  fetchApiData: () => void;
}) {
  if (!accessToken) {
    return (
      <div>
        <p>Not Authenticated</p>
        <button onClick={initiateOAuth}>Login with OAuth</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Authenticated with Access Token</p>
        <button onClick={fetchApiData}>Fetch API Data</button>
      </div>
    );
  }
}

export default App;
