// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

function normalizarRut(rut: string): string {
  if (!rut) return '';
  // quita puntos y guion, y pasa a MAYÚSCULA
  return rut.replace(/[.\-]/g, '').toUpperCase();
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(rut: string, password: string) {
    const rutNormalizado = normalizarRut(rut);

    // Traemos todos los funcionarios (son poquitos)
    const funcionarios = await this.prisma.funcionario.findMany();

    const func = funcionarios.find(
      (f) => normalizarRut(f.rut) === rutNormalizado,
    );

    if (!func || !func.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const ok = await bcrypt.compare(password, func.password);
    if (!ok) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // marcamos super según rol o id/ nombre que tú quieras
    const esSuper =
      func.rol === 'ENCARGADO_UNIDAD' ||
      func.nombre_completo === 'Analista_1';

    return {
      id_funcionario: func.id_funcionario,
      rut: func.rut,
      nombre_completo: func.nombre_completo,
      correo: func.correo,
      rol: func.rol,
      esSuper,
    };
  }
}
