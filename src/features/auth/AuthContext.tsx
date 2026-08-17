// Importamos los elementos necesarios de React para crear
// y utilizar nuestro contexto de autenticación.
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'

// Importamos el tipo User y el listener de Firebase Authentication.
import {
    onAuthStateChanged,
    type User,
} from 'firebase/auth'

// Importamos nuestra instancia de Authentication.
import { auth } from '../../services/firebase'

// Define qué información estará disponible
// para los componentes que utilicen nuestro contexto.
interface AuthContextType {
    // Usuario actualmente autenticado.
    user: User | null

    // Indica si Firebase todavía está comprobando
    // si existe una sesión activa.
    loading: boolean
}

// Creamos el contexto de autenticación.
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Props que recibe nuestro proveedor de autenticación.
interface AuthProviderProps {
    // Elementos que estarán dentro del AuthProvider.
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

// Hook personalizado para acceder fácilmente
// al contexto de autenticación.
export function useAuth() {
    const context = useContext(AuthContext)

    // Si el hook se utiliza fuera del AuthProvider,
    // lanzamos un error para detectar el problema rápidamente.
    if (!context) {
        throw new Error('useAuth debe utilizarse dentro de AuthProvider')
    }

    return context
}