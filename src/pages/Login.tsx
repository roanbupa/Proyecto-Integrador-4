import { type FormEvent, useState } from 'react'
import { loginUser } from '../services/auth'

export default function Login() {
    // Guarda los datos ingresados por el usuario
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('') // Guarda un posible mensaje de error

    // Procesa el formulario de incio de sesión
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        try {
            // Intentamos iniciar sesión mediante Firebase
            await loginUser(email, password)
        } catch (error) {
            // Mostramos un mensaje si Firebase rechaza las credenciales
            setError('Email o contraseña incorrecta')
        }
    }

    return (
        <main>
            <h1>Iniciar sesión</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                {error && <p>{error}</p>}

                <button type="submit">Iniciar sesión</button>
            </form>
        </main>
    )
}