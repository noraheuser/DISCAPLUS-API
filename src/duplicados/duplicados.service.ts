import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';

@Injectable()
export class DuplicadosService extends BaseService<
  Prisma.duplicadosWhereUniqueInput,
  Prisma.duplicadosCreateInput,
  Prisma.duplicadosUpdateInput
> {
  constructor(private readonly prisma: PrismaService) {
    // delegate del modelo duplicados
    super(prisma.duplicados);
  }
}
