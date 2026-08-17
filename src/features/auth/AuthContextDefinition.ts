import { createContext } from 'react'
import type { User } from 'firebase/auth'

// Define la información disponible en el contexto de autenticación.
export interface AuthContextType {
    // Usuario actualmente autenticado.
    user: User | null

    // Indica si Firebase todavía está comprobando la sesión.
    loading: boolean
}

// El contexto queda separado del componente AuthProvider.
// Esto evita el error de Fast Refresh de ESLint.
export const AuthContext =
    createContext<AuthContextType | undefined>(undefined)