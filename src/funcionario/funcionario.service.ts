import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';

@Injectable()
export class FuncionarioService extends BaseService<
  Prisma.funcionarioWhereUniqueInput,
  Prisma.funcionarioCreateInput,
  Prisma.funcionarioUpdateInput
> {
  constructor(private readonly prisma: PrismaService) {
    // prisma.funcionario es el delegate que genera Prisma
    super(prisma.funcionario);
  }
}
