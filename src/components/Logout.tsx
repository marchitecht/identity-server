
import React from 'react';
import { userManager } from './AuthProvider';

const Logout = () => {
  const logout = () => {
    userManager.signoutRedirect();
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
