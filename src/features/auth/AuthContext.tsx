import {
    useEffect,
    useState,
    type ReactNode,
} from 'react'

import {
    onAuthStateChanged,
    type User,
} from 'firebase/auth'

import { auth } from '../../services/firebase'
import { AuthContext } from './AuthContextDefinition'

// Props que recibe nuestro proveedor de autenticación.
interface AuthProviderProps {
    children: ReactNode
}

// Componente que proporciona el estado de autenticación
// a toda la aplicación.
export function AuthProvider({ children }: AuthProviderProps) {
    // Guarda el usuario actualmente autenticado.
    const [user, setUser] = useState<User | null>(null)

    // Mientras Firebase comprueba la sesión inicial,
    // mantenemos este valor en true.
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Escucha los cambios en el estado de autenticación.
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // Actualiza el usuario cuando Firebase informa
            // si existe o no una sesión.
            setUser(currentUser)

            // Firebase ya terminó de comprobar la sesión inicial.
            setLoading(false)
        })

        // Cancela la suscripción cuando el componente
        // deja de existir para evitar memory leaks.
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}