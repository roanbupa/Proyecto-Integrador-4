import type { Task } from '../types/task'

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

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>
                            Estado: {task.completed ? 'Completada' : 'Pendiente'}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}