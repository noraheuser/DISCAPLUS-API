// src/bitacora/bitacora.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';

type BitacoraWhereUnique = { id_evento: number };

@Injectable()
export class BitacoraService extends BaseService<BitacoraWhereUnique, any, any> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.bitacora);
  }

  // 👉 listar últimos eventos con filtros opcionales
  async findEventos(params: { id_solicitud?: number; id_funcionario?: number }) {
    const where: any = {};

    if (params.id_solicitud) {
      where.id_solicitud = params.id_solicitud;
    }
    if (params.id_funcionario) {
      where.id_funcionario = params.id_funcionario;
    }

    return this.prisma.bitacora.findMany({
      where,
      include: {
        funcionario: true, // relación a la tabla funcionario
      },
      orderBy: { fecha_evento: 'desc' },
      take: 300, // por ejemplo, últimos 300 movimientos
    });
  }
}
