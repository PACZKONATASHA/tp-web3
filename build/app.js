"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const estudianteRoutes_1 = __importDefault(require("./routes/estudianteRoutes"));
const profesoresRoutes_1 = __importDefault(require("./routes/profesoresRoutes"));
const cursosRoutes_1 = __importDefault(require("./routes/cursosRoutes"));
const cursoEstudianteRoutes_1 = __importDefault(require("./routes/cursoEstudianteRoutes"));
const method_override_1 = __importDefault(require("method-override"));
const app = (0, express_1.default)();
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, '/views'));
app.use(express_1.default.static('public'));
app.use((0, method_override_1.default)('_method'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    return res.render('layout', {
        pagina: 'App Universidad',
    });
});
app.use('/estudiantes', estudianteRoutes_1.default);
app.use('/profesores', profesoresRoutes_1.default);
app.use('/cursos', cursosRoutes_1.default);
app.use('/cursoestudiante', cursoEstudianteRoutes_1.default);
exports.default = app;
