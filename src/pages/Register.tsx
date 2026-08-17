import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/auth'

export default function Register() {
  // Guarda los datos ingresados por el usuario.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Guarda un posible mensaje de error.
  const [error, setError] = useState('')

  // Procesa el formulario de registro.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    try {
      // Creamos el usuario en Firebase Authentication.
      await registerUser(email, password)
    } catch {
      // Mostramos un mensaje si Firebase rechaza el registro.
      setError('No se pudo crear la cuenta.')
    }
  }

  return (
    <main>
      <h1>Crear cuenta</h1>

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

        <button type="submit">Crear cuenta</button>
        <p>
          ¿Ya tenés una cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </form>
    </main>
  )
}