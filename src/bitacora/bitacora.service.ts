import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';

// PK de la tabla bitacora
type BitacoraWhereUnique = { id_evento: number };

@Injectable()
export class BitacoraService extends BaseService<
  BitacoraWhereUnique,
  any,
  any
> {
  constructor(private readonly prisma: PrismaService) {
    // prisma.bitacora es el delegate generado por Prisma
    super(prisma.bitacora);
  }
}
