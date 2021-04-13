import { Router } from 'express';
import swaggerUi  from 'swagger-ui-express';
import { swaggerSpec } from '../../loaders/swaggerDocLoader';


//Componente de documentación para desarrollo
export default (app: Router) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}