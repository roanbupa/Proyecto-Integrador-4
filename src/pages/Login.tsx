import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/auth'
import './Login.css'

export default function Login() {
    // Guarda los datos ingresados por el usuario.
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Guarda un posible mensaje de error.
    const [error, setError] = useState('')

    const navigate = useNavigate()

    // Procesa el formulario de inicio de sesión.
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        try {
            // Intentamos iniciar sesión mediante Firebase.
            await loginUser(email, password)

            // Redirige al área privada después de iniciar sesión correctamente.
            navigate('/tasks')
        } catch {
            // Mostramos un mensaje si Firebase rechaza las credenciales.
            setError('Email o contraseña incorrecta')
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-header">
                    <p className="auth-brand">MateCode</p>
                    <h1>Iniciar sesión</h1>
                    <p>Ingresá a tu cuenta para gestionar tus tareas.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="nombre@ejemplo.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Ingresá tu contraseña"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && (
                        <p className="form-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button className="primary-button" type="submit">
                        Iniciar sesión
                    </button>

                    <p className="auth-footer">
                        ¿No tenés una cuenta?{' '}
                        <Link to="/login/register">Crear cuenta</Link>
                    </p>
                </form>
            </section>
        </main>
    )
}