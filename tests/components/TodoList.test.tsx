import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TodoList from '../../src/components/TodoList'
import type { Task } from '../../src/types/task'

// Mockeamos TodoItem para probar solamente la responsabilidad de TodoList.
vi.mock('../../src/components/TodoItem', () => ({
    default: ({ task }: { task: Task }) => (
        <li data-testid="todo-item">{task.title}</li>
    ),
}))

describe('TodoList', () => {
    it('muestra un mensaje cuando no hay tareas', () => {
        render(<TodoList tasks={[]} />)

        expect(
            screen.getByText(/no tenés tareas todavía/i),
        ).toBeInTheDocument()
    })

    it('muestra todas las tareas recibidas', () => {
        const tasks: Task[] = [
            {
                id: '1',
                userId: 'usuario-prueba',
                title: 'Tarea uno',
                description: 'Descripción uno',
                completed: false,
                createdAt: new Date(),
            },
            {
                id: '2',
                userId: 'usuario-prueba',
                title: 'Tarea dos',
                description: 'Descripción dos',
                completed: true,
                createdAt: new Date(),
            },
        ]

        render(<TodoList tasks={tasks} />)

        expect(screen.getByText('Tarea uno')).toBeInTheDocument()
        expect(screen.getByText('Tarea dos')).toBeInTheDocument()

        expect(
            screen.getAllByTestId('todo-item'),
        ).toHaveLength(2)
    })
})