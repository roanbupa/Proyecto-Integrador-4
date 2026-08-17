// Importamos las funciones de Firebase Authentication
// que vamos a utilizar para registrar, iniciar y cerrar sesión.
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'

// Importamos la instancia de Authentication configurada
// en nuestro archivo firebase.ts.
import { auth } from './firebase'

// Registra un nuevo usuario utilizando email y contraseña.
export const registerUser = async (
    email: string,
    password: string,
) => {
    // Firebase crea el usuario y devuelve sus credenciales.
    return createUserWithEmailAndPassword(auth, email, password)
}

// Inicia sesión con un usuario existente.
export const loginUser = async (
    email: string,
    password: string,
) => {
    // Firebase verifica las credenciales y devuelve las credenciales del usuario.
    return signInWithEmailAndPassword(auth, email, password)
}

// Cierra la sesión del usuario actualmente autenticado.
export const logoutUser = async () => {
    // Firebase elimina la sesión activa.
    return signOut(auth)
}