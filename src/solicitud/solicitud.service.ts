import { Injectable } from '@nestjs/common';
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

  // 🔹 Crear solicitud tal cual llega (sin reglas especiales)
  async create(data: any) {
    return this.prisma.solicitud.create({ data });
  }

  // 🔹 Actualizar solicitud tal cual llegan los datos
  async update(where: SolicitudWhereUnique, data: any) {
    return this.prisma.solicitud.update({
      where,
      data,
    });
  }

  // 🔹 Asignar a un funcionario (usado desde el controller: .asignar)
  async asignar(id: number, idFuncionario: number) {
    // 1) Traemos la solicitud actual para ver en qué etapa está
    const solicitudActual = await this.prisma.solicitud.findUnique({
      where: { id_solicitud: id },
    });

    if (!solicitudActual) {
      throw new Error('Solicitud no encontrada');
    }

    // 2) Si estaba en DERIVACION, la pasamos a CALIFICACION
    const nuevaEtapa =
      solicitudActual.etapa === 'DERIVACION'
        ? 'CALIFICACION'
        : solicitudActual.etapa;

    // 3) Actualizamos asignado_a y, si corresponde, la etapa
    return this.prisma.solicitud.update({
      where: { id_solicitud: id },
      data: {
        asignado_a: idFuncionario,
        etapa: nuevaEtapa,
      },
    });
  }

  // 🔹 Devolver solicitud a CORRECCION
  async devolver(id: number, motivo: string) {
    return this.prisma.solicitud.update({
      where: { id_solicitud: id },
      data: {
        etapa: 'CORRECCION',
        asignado_a: null,
        // más adelante puedes guardar "motivo" en un campo observaciones
      },
    });
  }
  async findEnRevisionPorFuncionario(idFuncionario: number) {
  return this.prisma.solicitud.findMany({
    where: {
      asignado_a: idFuncionario,
      etapa: 'REVISION', // EXACTO EN ENUM BASE
    },
    orderBy: { fecha_ingreso: 'desc' },
  });
}

}
