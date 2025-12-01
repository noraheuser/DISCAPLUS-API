import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';

@Injectable()
export class BitacoraService extends BaseService<
  Prisma.bitacoraWhereUniqueInput,
  Prisma.bitacoraCreateInput,
  Prisma.bitacoraUpdateInput
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.bitacora);
  }
}
