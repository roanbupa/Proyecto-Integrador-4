import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/auth'
import './Login.css'

export default function Register() {
  // Guarda los datos ingresados por el usuario.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Guarda un posible mensaje de error.
  const [error, setError] = useState('')

  const navigate = useNavigate()

  // Procesa el formulario de registro.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    try {
      // Creamos el usuario en Firebase Authentication.
      await registerUser(email, password)

      // Después del registro, Firebase deja al usuario autenticado
      // y lo enviamos directamente a su área privada.
      navigate('/tasks')
    } catch {
      // Mostramos un mensaje si Firebase rechaza el registro.
      setError('No se pudo crear la cuenta.')
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <p className="auth-brand">MateCode</p>
          <h1>Crear cuenta</h1>
          <p>Registrate para comenzar a gestionar tus tareas.</p>
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
              placeholder="Creá una contraseña"
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button className="primary-button" type="submit">
            Crear cuenta
          </button>

          <p className="auth-footer">
            ¿Ya tenés una cuenta?{' '}
            <Link to="/login">Iniciar sesión</Link>
          </p>
        </form>
      </section>
    </main>
  )
}