// src/bitacora/bitacora.module.ts
import { Module } from '@nestjs/common';
import { BitacoraController } from './bitacora.controller';
import { BitacoraService } from './bitacora.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BitacoraController],
  providers: [BitacoraService, PrismaService],
})
export class BitacoraModule {}