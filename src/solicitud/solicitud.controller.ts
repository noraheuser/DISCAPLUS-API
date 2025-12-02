import { Controller, Patch, Param, Body } from '@nestjs/common';
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
}
