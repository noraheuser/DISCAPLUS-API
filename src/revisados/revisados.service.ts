import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';

@Injectable()
export class RevisadosService extends BaseService<
  Prisma.revisadosWhereUniqueInput,
  Prisma.revisadosCreateInput,
  Prisma.revisadosUpdateInput
> {
  constructor(private readonly prisma: PrismaService) {
    // delegate generado por Prisma para el modelo revisados
    super(prisma.revisados);
  }
}
