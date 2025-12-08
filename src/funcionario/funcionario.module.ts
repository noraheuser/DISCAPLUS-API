// src/funcionario/funcionario.module.ts
import { Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FuncionarioController],
  providers: [
    FuncionarioService,
    PrismaService,          // 👈 también acá
  ],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}
