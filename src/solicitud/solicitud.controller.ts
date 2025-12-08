// src/solicitud/solicitud.controller.ts

import {
  Controller,
  Patch,
  Param,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { BaseController } from '../common/base.controller';

@Controller('solicitud')
export class SolicitudController extends BaseController<
  SolicitudService,
  number,
  any,
  any
> {
  constructor(private readonly solicitudService: SolicitudService) {
    super(solicitudService, 'id_solicitud');
  }

  // 🔹 GET /solicitud  (lista con filtros desde el FRONT)
  @Get()
  async findAll(@Query() query: any) {
    return this.solicitudService.findAll(query);
  }

  // 🔹 PATCH /solicitud/:id/devolver
  @Patch(':id/devolver')
  async devolver(
    @Param('id') id: string,
    @Body('motivo') motivo: string,
  ) {
    return this.solicitudService.devolver(Number(id), motivo);
  }

  // 🔹 PATCH /solicitud/:id/asignar
  @Patch(':id/asignar')
  async asignar(
    @Param('id') id: string,
    @Body('asignado_a') asignado_a: number,
  ) {
    return this.solicitudService.asignar(
      Number(id),
      Number(asignado_a),
    );
  }

  // 🔹 GET /solicitud/asignadas/:id_funcionario
  @Get('asignadas/:id_funcionario')
  async asignadas(@Param('id_funcionario') id_funcionario: string) {
    return this.solicitudService.findAll({
      asignado_a: Number(id_funcionario),
    });
  }

  // 🔹 GET /solicitud/revision/:id_funcionario
  @Get('revision/:id_funcionario')
  async getSolicitudesEnRevision(
    @Param('id_funcionario') id_funcionario: string,
  ) {
    return this.solicitudService.findEnRevisionPorFuncionario(
      Number(id_funcionario),
    );
  }

  // 🔥 NUEVO: PATCH /solicitud/:id/aprobar-revision
  @Patch(':id/aprobar-revision')
  aprobarRevision(
    @Param('id') id: string,
    @Body('id_funcionario') idFuncionario: number,
  ) {
    return this.solicitudService.aprobarRevision(
      Number(id),
      Number(idFuncionario),
    );
  }
}
