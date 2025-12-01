import { Controller } from '@nestjs/common';
import { RevisadosService } from './revisados.service';
import { BaseController } from '../common/base.controller';
import { Prisma } from '@prisma/client';

@Controller('revisados')
export class RevisadosController extends BaseController<
  RevisadosService,
  number,
  Prisma.revisadosCreateInput,
  Prisma.revisadosUpdateInput
> {
  constructor(service: RevisadosService) {
    // PK real del modelo revisados
    super(service, 'id_revision');
  }
}
