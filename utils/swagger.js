import swaggerJsDoc from "swagger-jsdoc";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *   schemas:
 *      User:
 *         type: object
 *         required:
 *            - name
 *            - email
 *            - password
 *         properties:
 *            _id:
 *               type: object
 *               properties:
 *                  $oid:
 *                     type: string
 *                     description: Unique identifier for the user
 *            name:
 *               type: string
 *               description: Full name of the user
 *            email:
 *               type: string
 *               description: Email address of the user
 *            password:
 *               type: string
 *               description: Hashed password of the user
 *         example:
 *            _id:
 *               $oid: "uniqueKeyUser"
 *            name: "Edward"
 *            email: "edward@gmail.com"
 *            password: "kow123"
 *      Todo:
 *         type: object
 *         required:
 *            - title
 *         properties:
 *            _id:
 *               type: object
 *               properties:
 *                  $oid:
 *                     type: string
 *                     description: Unique identifier for the todo list
 *            title:
 *               type: string
 *               description: Name or text of the todo list
 *         example:
 *            _id:
 *               $oid: "uniqueKeyTodo"
 *            title: "Review Mid Exam"
 *            userId:
 *               type: integer
 *               description: ID of the user who created the todo list
 *         example:
 *            userId: 1
*/

const swaggerSpec = swaggerJsDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo List Management API",
            version: "1.0.0",
            description: "API for managing todo list, including user authentication and todo list management.",
        },
        servers: [
            {
                url: 'http://localhost:5000/service/user',
                description: 'Development - user',
            },
            {
                url: "http://localhost:5000/service/todo",
                description: 'Development - todo'
            }
        ],
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        path.join(__dirname, '..', 'routes', '*.js'),
        path.join(__dirname, '..', 'routes', '*.ts'),
        path.join(__dirname, 'swagger.js'),
        path.join(__dirname, 'swagger.ts'),
    ],
});

export default swaggerSpec;