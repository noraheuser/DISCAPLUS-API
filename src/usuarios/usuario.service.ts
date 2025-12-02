import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';

type UsuarioWhereUnique = { id_usuario: number };

@Injectable()
export class UsuarioService extends BaseService<
  UsuarioWhereUnique,
  any,
  any
> {
  constructor(private prisma: PrismaService) {
    super(prisma.usuario);
  }
}
