// Tipos de request y response usados por las Vercel Functions.
import type { VercelRequest, VercelResponse } from '@vercel/node'

// Cliente oficial de AWS para trabajar con Amazon SES.
import {
    SESClient,
    SendEmailCommand,
} from '@aws-sdk/client-ses'

// Región donde configuramos Amazon SES.
const sesClient = new SESClient({
    region: process.env.AWS_REGION,
})

// Estructura de los datos que recibirá la función.
interface SendTaskSummaryBody {
    email: string
    pending: number
    completed: number
}

// Función serverless ejecutada por Vercel.
export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    // Solo permitimos solicitudes POST.
    if (request.method !== 'POST') {
        return response.status(405).json({
            error: 'Método no permitido.',
        })
    }

    try {
        // Vercel ya procesa el JSON y lo deja disponible en request.body.
        const body = request.body as SendTaskSummaryBody

        // Validamos los datos recibidos.
        if (
            !body?.email ||
            typeof body.pending !== 'number' ||
            typeof body.completed !== 'number'
        ) {
            return response.status(400).json({
                error: 'Datos inválidos.',
            })
        }

        const command = new SendEmailCommand({
            // Dirección verificada previamente en Amazon SES.
            Source: process.env.AWS_SES_FROM_EMAIL,

            Destination: {
                ToAddresses: [body.email],
            },

            Message: {
                Subject: {
                    Data: 'Resumen de tareas',
                    Charset: 'UTF-8',
                },

                Body: {
                    Text: {
                        Data:
                            `Resumen de tus tareas:\n\n` +
                            `Pendientes: ${body.pending}\n` +
                            `Completadas: ${body.completed}`,
                        Charset: 'UTF-8',
                    },
                },
            },
        })

        // Enviamos el correo mediante Amazon SES.
        await sesClient.send(command)

        return response.status(200).json({
            message: 'Correo enviado correctamente.',
        })
    } catch (error) {
        // Este log queda del lado del servidor, nunca en el navegador.
        console.error('Error al enviar correo con SES:', error)

        return response.status(500).json({
            error: 'No se pudo enviar el correo.',
        })
    }
}