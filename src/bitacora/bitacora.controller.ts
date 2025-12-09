// src/bitacora/bitacora.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { BaseController } from '../common/base.controller';

@Controller('bitacora')
export class BitacoraController extends BaseController<
  BitacoraService,
  number,
  any,
  any
> {
  constructor(private readonly bitacoraService: BitacoraService) {
    super(bitacoraService, 'id_evento');
  }

  @Get()
  async findAll(
    @Query('id_solicitud') id_solicitud?: string,
    @Query('id_funcionario') id_funcionario?: string,
  ) {
    return this.bitacoraService.findEventos({
      id_solicitud: id_solicitud ? Number(id_solicitud) : undefined,
      id_funcionario: id_funcionario ? Number(id_funcionario) : undefined,
    });
  }
}
