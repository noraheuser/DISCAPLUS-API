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

  // 🔹 PATCH /solicitud/:id/devolver   👈 NUEVO
  @Patch(':id/devolver')
  async devolver(
    @Param('id') id: string,
    @Body() body: { motivo: string; id_funcionario_actor: number },
  ) {
    return this.solicitudService.devolver(
      Number(id),
      body.motivo,
      Number(body.id_funcionario_actor),
    );
  }

  // 🔹 PATCH /solicitud/:id/asignar
  @Patch(':id/asignar')
  async asignar(
    @Param('id') id: string,
    @Body() body: { asignado_a: number | null | '' },
  ) {
    const idSolicitud = Number(id);

    let idFuncionario: number | null;
    if (
      body.asignado_a === null ||
      body.asignado_a === undefined ||
      body.asignado_a === ('' as any)
    ) {
      idFuncionario = null;
    } else {
      idFuncionario = Number(body.asignado_a);
    }

    // recibimos id_funcionario_actor desde el front (ya lo tienes que mandar)
    const idActor = Number((body as any).id_funcionario_actor);

    return this.solicitudService.asignar(idSolicitud, idFuncionario, idActor);
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

  // 🔥 PATCH /solicitud/:id/aprobar-revision
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
