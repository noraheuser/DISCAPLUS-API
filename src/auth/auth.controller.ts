import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { rut } = body;

    const user = await this.prisma.funcionario.findFirst({
      where: { rut },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return {
      id_funcionario: user.id_funcionario,
      nombre: user.nombre_completo,
      rol: user.rol,
      rut: user.rut,
      correo: user.correo,
    };
  }
}
