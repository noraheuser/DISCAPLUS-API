// solicitud.controller.ts

import { Controller, Patch, Param, Body, Get } from '@nestjs/common';
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

  // PATCH /solicitud/:id/devolver
  @Patch(':id/devolver')
  async devolver(
    @Param('id') id: string,
    @Body('motivo') motivo: string,
  ) {
    return this.solicitudService.devolver(Number(id), motivo);
  }

  // PATCH /solicitud/:id/asignar
  @Patch(':id/asignar')
  async asignar(
    @Param('id') id: string,
    @Body('asignado_a') asignado_a: number,
  ) {
    return this.solicitudService.asignar(Number(id), Number(asignado_a));
  }

  // 🔹 NUEVO: GET /solicitud/asignadas/:id_funcionario
  @Get('asignadas/:id_funcionario')
  async asignadas(@Param('id_funcionario') id_funcionario: string) {
    return this.solicitudService.findAll({
      where: { asignado_a: Number(id_funcionario) },
    });
  }
  // GET /solicitud/revision/:id_funcionario
@Get('revision/:id_funcionario')
async getSolicitudesEnRevision(
  @Param('id_funcionario') id_funcionario: string,
) {
  return this.solicitudService.findEnRevisionPorFuncionario(Number(id_funcionario));
}
}
