import { initializeApp } from "firebase/app"; // Importa la función necesaria para inicializar Firebase
import { getAuth } from "firebase/auth"; // Importa Authentication para gestionar el registro, login y logout
import { getFirestore } from "firebase/firestore"; // Importa Firestore para almacenar y gestionar las tareas

// Configuración de Firebase obtenida desde las variables de entorno
// Las variables VITE_* pueder ser utilizadas por Vite en el frontend
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializamos la aplicación Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Inicializa Firebase Authentication
export const db = getFirestore(app); // Inicializa Cloud Firestore

