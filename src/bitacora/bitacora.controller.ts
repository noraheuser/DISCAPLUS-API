import { Controller } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { BaseController } from '../common/base.controller';
import { Prisma } from '@prisma/client';

@Controller('bitacoras')
export class BitacoraController extends BaseController<
  BitacoraService,
  number,
  Prisma.bitacoraCreateInput,
  Prisma.bitacoraUpdateInput
> {
  constructor(service: BitacoraService) {
    // Ajusta el nombre si tu PK no es id_bitacora
    super(service, 'id_bitacora');
  }
}
