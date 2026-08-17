// Representa una tarea almacenada en Cloud Firestore.
export interface Task {
    id: string // Identificador único del documento.
    userId: string // Usuario propietario de la tarea.
    title: string // Título de la tarea.
    description: string // Descripción obligatoria de la tarea.
    completed: boolean // Indica si la tarea está completada.
    createdAt: Date // Fecha de creación de la tarea.
}