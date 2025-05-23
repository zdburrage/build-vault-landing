import { AuthKitProvider } from '@workos-inc/authkit-react';

// You'll need to replace these with your actual WorkOS credentials
const WORKOS_CLIENT_ID = import.meta.env.VITE_WORKOS_CLIENT_ID;
const WORKOS_REDIRECT_URI = import.meta.env.VITE_WORKOS_REDIRECT_URI || 'http://localhost:5173/auth/callback';

export const authConfig = {
  clientId: WORKOS_CLIENT_ID,
  redirectUri: WORKOS_REDIRECT_URI,
  // Add any additional configuration options here
  // For example:
  // organizationId: 'org_xxx',
  // provider: 'google',
};

export { AuthKitProvider }; 