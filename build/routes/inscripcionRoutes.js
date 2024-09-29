"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InscripcionController_1 = __importDefault(require("../controllers/InscripcionController"));
const routes = (0, express_1.Router)();
routes.get('/', InscripcionController_1.default.consultarTodos);
routes.get('/curso/:cursoId/inscripciones', InscripcionController_1.default.consultarUno);
routes.get('/estudiante/:estudianteId/inscripciones', InscripcionController_1.default.consultarUno);
routes.post('/', InscripcionController_1.default.insertar);
exports.default = routes;
