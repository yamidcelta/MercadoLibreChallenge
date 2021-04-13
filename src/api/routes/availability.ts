import { Router, Request, Response } from 'express';
const route = Router();

//Metodo para prueba del api
export default (app: Router) => {

  route.get('/',  (req: Request, res: Response) => {
    return res.json({ user: "ok" }).status(200);
  });
};
