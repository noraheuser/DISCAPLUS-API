// src/usuarios/usuario.module.ts
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    PrismaService,          // 👈 importante
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
