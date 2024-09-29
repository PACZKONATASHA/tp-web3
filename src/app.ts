import express, { Request, Response } from "express";
import cors from 'cors';
import morgan from "morgan";
import path from "path";

import estudianteRouter from './routes/estudianteRoutes';
import profesorRouter from './routes/profesoresRoutes'; 
import cursoRouter from './routes/cursosRoutes';
import cursoEstudianteRouter from './routes/cursoEstudianteRoutes';

import methodOverride from 'method-override';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static('public'));

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    return res.render('layout', {
        pagina: 'App Universidad',
    });
});

app.use('/estudiantes', estudianteRouter);

app.use('/profesores', profesorRouter);

app.use('/cursos', cursoRouter);

app.use('/cursoestudiante', cursoEstudianteRouter);

export default app;