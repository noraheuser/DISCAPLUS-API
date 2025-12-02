import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DerivacionService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.derivacion.findMany();
  }
}
