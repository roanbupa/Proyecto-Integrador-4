// Representa una tarea almacena en Cloud Firestore
export interface Task {
    id: string // Identificador único del documento de Firestore
    userId: string // Identificador único del usuario
    title: string // Título principal de la tarea
    description: string // Descripción opcional de la tarea
    completed: boolean // Indica si la tarea fue completada
    createAt: Date // Fecha de creación de la tarea
}
