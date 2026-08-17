import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import TodoItem from '../../src/components/TodoItem'
import type { Task } from '../../src/types/task'

import {
    deleteTask,
    toggleTaskCompleted,
    updateTask,
} from '../../src/services/tasks'

// Mockeamos las operaciones de Firestore.
// Así los tests no modifican datos reales.
vi.mock('../../src/services/tasks', () => ({
    deleteTask: vi.fn(),
    toggleTaskCompleted: vi.fn(),
    updateTask: vi.fn(),
}))

const task: Task = {
    id: 'task-1',
    userId: 'usuario-prueba',
    title: 'Estudiar React',
    description: 'Repasar componentes',
    completed: false,
    createdAt: new Date(),
}

describe('TodoItem', () => {
    beforeEach(() => {
        // Cada test comienza sin llamadas anteriores en los mocks.
        vi.clearAllMocks()
    })

    it('muestra la información de una tarea', () => {
        render(<TodoItem task={task} />)

        expect(
            screen.getByText('Estudiar React'),
        ).toBeInTheDocument()

        expect(
            screen.getByText('Repasar componentes'),
        ).toBeInTheDocument()

        expect(
            screen.getByText('Pendiente'),
        ).toBeInTheDocument()
    })

    it('marca una tarea como completada', async () => {
        const user = userEvent.setup()

        render(<TodoItem task={task} />)

        await user.click(
            screen.getByRole('button', { name: /marcar completada/i }),
        )

        expect(toggleTaskCompleted).toHaveBeenCalledWith(
            'task-1',
            true,
        )
    })

    it('elimina una tarea', async () => {
        const user = userEvent.setup()

        render(<TodoItem task={task} />)

        await user.click(
            screen.getByRole('button', { name: /eliminar/i }),
        )

        expect(deleteTask).toHaveBeenCalledWith('task-1')
    })

    it('edita una tarea', async () => {
        const user = userEvent.setup()

        render(<TodoItem task={task} />)

        await user.click(
            screen.getByRole('button', { name: /editar/i }),
        )

        const titleInput = screen.getByLabelText(/título/i)
        const descriptionInput = screen.getByLabelText(/descripción/i)

        await user.clear(titleInput)
        await user.type(titleInput, 'Estudiar TypeScript')

        await user.clear(descriptionInput)
        await user.type(descriptionInput, 'Repasar interfaces')

        await user.click(
            screen.getByRole('button', { name: /guardar/i }),
        )

        expect(updateTask).toHaveBeenCalledWith('task-1', {
            title: 'Estudiar TypeScript',
            description: 'Repasar interfaces',
        })
    })
})