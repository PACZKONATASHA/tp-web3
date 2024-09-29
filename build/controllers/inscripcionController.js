"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const CursosEstudiantesModel_1 = require("../models/CursosEstudiantesModel");
const inscripcionRepository = db_1.AppDataSource.getRepository(CursosEstudiantesModel_1.CursosEstudiantesModel);
class InscripcionController {
    constructor() { }
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inscripciones = yield inscripcionRepository.find();
                res.json(inscripciones);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
    consultarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estudiante_id, curso_id } = req.params;
            try {
                const inscripcion = yield inscripcionRepository.findOneBy({
                    estudiante_id: parseInt(estudiante_id),
                    curso_id: parseInt(curso_id)
                });
                if (!inscripcion) {
                    res.status(404).json({ message: "Inscripción no encontrada" });
                    return;
                }
                res.json(inscripcion);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                    return;
                }
            }
        });
    }
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crearInscripcion = inscripcionRepository.create(req.body);
                const guardarInscripcion = yield inscripcionRepository.save(crearInscripcion);
                res.status(201).json(guardarInscripcion); // Cambiar a 201 para creación exitosa
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                    return;
                }
            }
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estudiante_id, curso_id } = req.params;
            try {
                const modificarInscripcion = yield inscripcionRepository.findOneBy({
                    estudiante_id: parseInt(estudiante_id),
                    curso_id: parseInt(curso_id)
                });
                if (!modificarInscripcion) {
                    res.status(404).json({ message: "Inscripción no encontrada" });
                    return;
                }
                inscripcionRepository.merge(modificarInscripcion, req.body);
                const inscripcionResult = yield inscripcionRepository.save(modificarInscripcion);
                res.json(inscripcionResult);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                    return;
                }
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estudiante_id, curso_id } = req.params;
            try {
                const eliminarInscripcion = yield inscripcionRepository.delete({
                    estudiante_id: parseInt(estudiante_id),
                    curso_id: parseInt(curso_id)
                });
                if (eliminarInscripcion.affected === 0) {
                    res.status(404).json({
                        message: "Inscripción no encontrada"
                    });
                    return;
                }
                res.status(200).json({
                    message: "Inscripción eliminada correctamente"
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({
                        message: err.message
                    });
                }
            }
        });
    }
}
exports.default = new InscripcionController();
