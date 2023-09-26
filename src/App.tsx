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
import AuthComponent from "./components/AuthComponent";

// function OAuthCallback() {
//   const location = useLocation();

//   useEffect(() => {
//     const { search } = location;
//     const params = new URLSearchParams(search);
//     const code = params.get("code");
//     const state = params.get("state");

//     const savedState = Cookies.get("oauth_state");
//     if (state !== savedState) {
//       console.error("OAuth state mismatch. Possible CSRF attack.");
//       return;
//     }

//     (async () => {
//       try {
//         const { client_id, client_secret, redirect_uri } = oauthConfig;
//         const response = await axios.post(oauthConfig.tokenUrl, {
//           code,
//           client_id: client_id,
//           client_secret: client_secret,
//           redirect_uri: redirect_uri,
//           grant_type: "authorization_code",
//         });

//         const newAccessToken = response.data.access_token;
//         Cookies.set("access_token", newAccessToken, {
//           secure: true,
//           sameSite: "none",
//         });
//         Cookies.remove("oauth_state");

//         // Handle successful authentication (e.g., navigate to a protected route)
//         window.location.href = "/protected-route";
//       } catch (error) {
//         console.error("OAuth error:", error);
//       }
//     })();
//   }, [location]);

//   return (
//     <div>
//       <p>Handling OAuth Callback...</p>
//     </div>
//   );
// }

function App() {
  // const [accessToken, setAccessToken] = useState<string | null>(null);

  // useEffect(() => {
  //   const existingToken = Cookies.get("access_token");
  //   if (existingToken) {
  //     setAccessToken(existingToken);
  //   }
  // }, []);

  // const initiateOAuth = () => {
  //   const state = Math.random().toString(36).substring(7);
  //   Cookies.set("oauth_state", state, { secure: true, sameSite: "none" });

  //   const { client_id, redirect_uri, scopes } = oauthConfig;
  //   const authorizationUrl = `${
  //     oauthConfig.authorizationUrl
  //   }?client_id=${client_id}&redirect_uri=${encodeURIComponent(
  //     redirect_uri
  //   )}&response_type=code&state=${state}`;
  //   window.location.href = authorizationUrl;
  // };

  // const fetchApiData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.intelwash.ru/uitest/index.html",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     // Handle the API response data
  //     console.log("API Response:", response.data);
  //   } catch (error) {
  //     console.error("API error:", error);
  //   }
  // };

  return (
    <>
      <AuthComponent />
    </>
    // <Suspense fallback={<div>Loading...</div>}>
    //   <Router>
    //     <div className="App">
    //       <h1>OAuth 2.0 Authentication Example</h1>
    //       <Routes>
    //         <Route path="/callback" element={<OAuthCallback />} />
    //         <Route path="/protected-route">
    //           {accessToken ? (
    //             <>
    //               <div>Authenticated with Access Token</div>
    //               <button onClick={fetchApiData}>Fetch API Data</button>
    //             </>
    //           ) : (
    //             <>Not Authenticated</>
    //           )}
    //         </Route>
    //         <Route
    //           path="/"
    //           element={
    //             <Home
    //               accessToken={accessToken}
    //               initiateOAuth={initiateOAuth}
    //               fetchApiData={fetchApiData}
    //             />
    //           }
    //         />
    //       </Routes>
    //     </div>
    //   </Router>
    // </Suspense>
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
