import { createContext } from 'react';

// Create a context with default values
const UserContext = createContext({
    currentUser: null,           // To store the current user
    setCurrentUser: () => {},    // To update the current user
});

// Export:
// - Exports the UserContext for usage in the application.
export default UserContext;
