import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import TodoForm from '../../src/components/TodoForm'
import { createTask } from '../../src/services/tasks'

// Mockeamos el servicio de tareas.
// Así los tests no hacen llamadas reales a Firestore.
vi.mock('../../src/services/tasks', () => ({
    createTask: vi.fn(),
}))

describe('TodoForm', () => {
    beforeEach(() => {
        // Limpia el historial de llamadas de los mocks
        // para que cada test empiece de forma independiente.
        vi.clearAllMocks()
    })

    it('muestra los campos de título y descripción', () => {
        render(<TodoForm userId="usuario-prueba" />)

        // Verificamos que el campo título exista.
        expect(
            screen.getByLabelText(/título/i),
        ).toBeInTheDocument()

        // Verificamos que el campo descripción exista.
        expect(
            screen.getByLabelText(/descripción/i),
        ).toBeInTheDocument()

        // Verificamos que exista el botón para crear la tarea.
        expect(
            screen.getByRole('button', { name: /crear tarea/i }),
        ).toBeInTheDocument()
    })

    it('crea una tarea con los datos ingresados', async () => {
        const user = userEvent.setup()

        render(<TodoForm userId="usuario-prueba" />)

        await user.type(
            screen.getByLabelText(/título/i),
            'Estudiar React',
        )

        await user.type(
            screen.getByLabelText(/descripción/i),
            'Repasar componentes y hooks',
        )

        await user.click(
            screen.getByRole('button', { name: /crear tarea/i }),
        )

        expect(createTask).toHaveBeenCalledWith({
            userId: 'usuario-prueba',
            title: 'Estudiar React',
            description: 'Repasar componentes y hooks',
        })
    })

    it('muestra un error si título y descripción contienen solo espacios', async () => {
        const user = userEvent.setup()

        render(<TodoForm userId="usuario-prueba" />)

        // Ingresamos solo espacios.
        await user.type(
            screen.getByLabelText(/título/i),
            '   ',
        )

        await user.type(
            screen.getByLabelText(/descripción/i),
            '   ',
        )

        await user.click(
            screen.getByRole('button', { name: /crear tarea/i }),
        )

        // Verificamos nuestro mensaje de validación.
        expect(
            screen.getByText(/el título y la descripción son obligatorios/i),
        ).toBeInTheDocument()

        // El servicio no debe llamarse si los datos no son válidos.
        expect(createTask).not.toHaveBeenCalled()
    })
})