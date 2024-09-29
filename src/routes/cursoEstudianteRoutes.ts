import express from 'express';
import { inscribirEstudiante, actualizarNota, eliminarInscripcion, obtenerEstudiantesPorCurso
            , obtenerCursosPorEstudiante, validar, listarInscripciones } from '../controllers/CursoEstudianteController';
import { Estudiante } from '../models/EstudianteModel';
import { Curso } from '../models/CursoModel';
import { AppDataSource } from '../db/db';

const router = express.Router();

// Listar estudiantes por curso
router.get('/listarEstudiantesPorCurso/:curso_id', obtenerEstudiantesPorCurso);

// Listar cursos por estudiante
router.get('/listarCursosPorEstudiante/:estudiante_id', obtenerCursosPorEstudiante);

router.get('/listarInscripciones', listarInscripciones);

// Renderizar formulario para inscribir estudiante en curso
router.get('/inscribirEstudiante', async (req, res) => {
    try {
        const estudianteRepository = AppDataSource.getRepository(Estudiante);
        const cursoRepository = AppDataSource.getRepository(Curso);
        const estudiantes = await estudianteRepository.find();
        const cursos = await cursoRepository.find();

        res.render('inscribirEstudiante', {
            pagina: 'Inscribir Estudiante en Curso',
            estudiantes,
            cursos
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});

// Procesar inscripción de estudiante en curso
router.post('/inscribirEstudiante', validar(), inscribirEstudiante);

// Procesar actualización de nota
router.post('/modificarNota/:curso_id/:estudiante_id', validar(), actualizarNota);

// Renderizar formulario para actualizar nota
router.get('/modificarNota/:curso_id/:estudiante_id', async (req, res) => {
    try {
        const { curso_id, estudiante_id } = req.params;

        const cursoRepository = AppDataSource.getRepository(Curso);
        const estudianteRepository = AppDataSource.getRepository(Estudiante);

        const curso = await cursoRepository.findOne({ where: { id: Number(curso_id) } });
        const estudiante = await estudianteRepository.findOne({ where: { id: Number(estudiante_id) } });

        if (!curso || !estudiante) {
            return res.status(404).send('Curso o Estudiante no encontrado');
        }

        res.render('modificarNota', {
            pagina: 'Modificar Nota',
            curso,
            estudiante
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});


router.put('/modificarNota/:curso_id/:estudiante_id', validar(), actualizarNota);


router.delete('/eliminarInscripcion/:curso_id/:estudiante_id', eliminarInscripcion);

export default router;