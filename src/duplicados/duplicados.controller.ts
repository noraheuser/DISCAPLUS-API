import { Controller } from '@nestjs/common';
import { DuplicadosService } from './duplicados.service';
import { BaseController } from '../common/base.controller';
import { Prisma } from '@prisma/client';

@Controller('duplicados')
export class DuplicadosController extends BaseController<
  DuplicadosService,
  number,
  Prisma.duplicadosCreateInput,
  Prisma.duplicadosUpdateInput
> {
  constructor(service: DuplicadosService) {
    // PK real del modelo
    super(service, 'id_duplicado');
  }
}
