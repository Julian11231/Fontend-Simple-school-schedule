//Services
export { LoginService } from './login/login.service';
export { SalonesService } from './salones/salones.service';
export { CursosService } from './cursos/cursos.service';
export { HorarioService } from './horario/horario.service';

//GUARDS
export { LoginGuardGuard } from './guards/login-guard.guard';
export { VerificaTokenGuard } from './guards/verifica-token.guard';
export { NoLoginGuardGuard } from './guards/no-login.guard';