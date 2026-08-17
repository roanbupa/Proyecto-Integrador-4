import TodoItem from './TodoItem'
import type { Task } from '../types/task'
import './TodoList.css'

interface TodoListProps {
    // Lista de tareas que vamos a mostrar.
    tasks: Task[]
}

export default function TodoList({ tasks }: TodoListProps) {
    // Si no hay tareas, mostramos un mensaje claro al usuario.
    if (tasks.length === 0) {
        return <p>No tenés tareas todavía.</p>
    }

    return (
        <section>
            <h2>Lista de tareas</h2>

            <ul className="todo-list">
                {/* Cada tarea se delega a TodoItem,
            que maneja sus propias acciones. */}
                {tasks.map((task) => (
                    <TodoItem key={task.id} task={task} />
                ))}
            </ul>
        </section>
    )
}