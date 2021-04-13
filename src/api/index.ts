import { Router } from 'express';
import documentationRoute from './routes/documentationRoute';
import bodyParser from 'body-parser';
import config from '../config';
import mutantRoute from './routes/mutantRoute';
import availability from './routes/availability';
// guaranteed to get dependencies
export default () => {
	const app = Router();
	app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        parameterLimit: 2,
        limit: '50mb',
        extended: true
      }));
	mutantRoute(app);
	availability(app);
	if(config.environment != 'production') {
        documentationRoute(app);
    }
	return app
}