import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';

// PK de la tabla solicitud
type SolicitudWhereUnique = { id_solicitud: number };

@Injectable()
export class SolicitudService extends BaseService<
  SolicitudWhereUnique,
  any,
  any
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.solicitud);
  }

  // 🚫 Ya no tocamos nada automáticamente aquí, update genérico
  async create(data: any) {
    return this.prisma.solicitud.create({ data });
  }

  async update(where: SolicitudWhereUnique, data: any) {
    return this.prisma.solicitud.update({
      where,
      data,
    });
  }

  // ✅ Regla clara para DEVOLVER
  async devolver(id: number, motivo: string) {
    return this.prisma.solicitud.update({
      where: { id_solicitud: id },
      data: {
        etapa: 'CORRECCION',
        asignado_a: null,
        // si después agregas campo observaciones, aquí guardas "motivo"
      },
    });
  }

  // ✅ NUEVO: regla clara para ASIGNAR / DERIVAR
  async asignar(id: number, idFuncionario: number) {
    const sol = await this.prisma.solicitud.findUnique({
      where: { id_solicitud: id },
    });

    if (!sol) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    // Si está en DERIVACION (espera de derivación), pasa a REVISION
    const nuevaEtapa =
      sol.etapa === 'DERIVACION' ? 'REVISION' : sol.etapa;

    return this.prisma.solicitud.update({
      where: { id_solicitud: id },
      data: {
        asignado_a: idFuncionario,
        etapa: nuevaEtapa,
      },
    });
  }
}
