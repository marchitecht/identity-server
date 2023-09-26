

import React, { useEffect } from 'react';
import { userManager } from './AuthProvider';

const Callback = () => {
  useEffect(() => {
    userManager.signinRedirectCallback().then(() => {
      // Handle successful authentication
    });
  }, []);

  return <div>Redirecting...</div>;
};

export default Callback;
