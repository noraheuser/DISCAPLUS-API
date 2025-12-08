// src/solicitud/solicitud.module.ts
import { Module } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SolicitudController],
  providers: [
    SolicitudService,
    PrismaService,
  ],
  exports: [SolicitudService],
})
export class SolicitudModule {}
