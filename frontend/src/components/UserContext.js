import { createContext } from 'react';


const UserContext = createContext({
    currentUser: null, // Para almacenar el usuario actual
    setCurrentUser: () => {}, // Para actualizar el usuario actual
});

export default UserContext;