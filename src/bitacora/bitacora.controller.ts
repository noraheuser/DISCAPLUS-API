import { Controller } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { BaseController } from '../common/base.controller';

@Controller('bitacora') // si quieres luego lo cambiamos a 'bitacoras'
export class BitacoraController extends BaseController<
  BitacoraService,
  number,
  any,
  any
> {
  constructor(service: BitacoraService) {
    // La PK de la tabla es id_evento (según tu schema.prisma)
    super(service, 'id_evento');
  }
}
