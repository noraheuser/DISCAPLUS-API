// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

function normalizarRut(rut: string): string {
  if (!rut) return '';

  // Sacar puntos y guion
  const limpio = rut.replace(/\./g, '').replace(/-/g, '');

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1).toUpperCase();

  return `${cuerpo}-${dv}`;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(rut: string, password: string) {

    const rutNormalizado = normalizarRut(rut);
    console.log("RUT recibido:", rut, "→ normalizado:", rutNormalizado);

    // Buscar DIRECTO en BD
    const func = await this.prisma.funcionario.findUnique({
      where: { rut: rutNormalizado }
    });

    console.log("Funcionario encontrado:", func);

    if (!func || !func.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // TEXTO PLANO (porque tu BD está en texto plano)
    if (func.password !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

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
