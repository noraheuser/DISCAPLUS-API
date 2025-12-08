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

  // 🔍 Listar solicitudes con filtros desde el FRONT
  async findAll(params: any) {
    console.log('FILTROS /solicitud =>', params);

    const etapa = params.etapa;         // <-- ahora esperamos directamente REVISION, CALIFICACION, etc.
    const asignado_a = params.asignado_a;
    const rut = params.rut;
    const desde = params.desde;
    const hasta = params.hasta;

    const where: any = {};

    // Etapa: debe venir EXACTAMENTE como está en la BD (REVISION, INGRESO…)
    if (etapa && String(etapa).trim() !== '') {
      where.etapa = etapa;
    }

    if (rut && String(rut).trim() !== '') {
      where.rut = String(rut).trim();
    }

    if (asignado_a && String(asignado_a).trim() !== '') {
      where.asignado_a = Number(asignado_a);
    }

    if (desde || hasta) {
      where.fecha_ingreso = {};
      if (desde && String(desde).trim() !== '') {
        where.fecha_ingreso.gte = new Date(desde);
      }
      if (hasta && String(hasta).trim() !== '') {
        where.fecha_ingreso.lte = new Date(hasta);
      }
    }

    return this.prisma.solicitud.findMany({
      where,
      orderBy: { fecha_ingreso: 'desc' },
    });
  }

  // 🔹 Crear solicitud tal cual llega
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

 // Asignar o reasignar una solicitud a un funcionario
async asignar(id: number, idFuncionario: number) {
  const solicitudActual = await this.prisma.solicitud.findUnique({
    where: { id_solicitud: id },
  });

  if (!solicitudActual) {
    throw new Error('Solicitud no encontrada');
  }

  let nuevaEtapa = solicitudActual.etapa;

 // ⭐ Regla clave:
// SOLO si está en etapa DERIVACION (En espera de derivación) pasa a CALIFICACIÓN
if (solicitudActual.etapa === 'DERIVACION') {
  nuevaEtapa = 'CALIFICACION';
}

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
      },
    });
  }

  // 🔹 Listar solicitudes en REVISION por funcionario (para "Mis casos")
  async findEnRevisionPorFuncionario(idFuncionario: number) {
    return this.prisma.solicitud.findMany({
      where: {
        asignado_a: idFuncionario,
        etapa: 'REVISION',
      },
      orderBy: { fecha_ingreso: 'desc' },
    });
  }


// Aprobar revisión: pasa a DERIVACION ("En espera de Derivación")
async aprobarRevision(idSolicitud: number, idFuncionario: number) {
  return this.prisma.$transaction(async (tx) => {
    // 1. Traer la solicitud original para usar su fecha_ingreso
    const solicitudOriginal = await tx.solicitud.findUnique({
      where: { id_solicitud: idSolicitud },
    });

    if (!solicitudOriginal) {
      throw new Error('Solicitud no encontrada');
    }

    // 2. Actualizar la solicitud: etapa -> DERIVACION
   const solicitudActualizada = await tx.solicitud.update({
     where: { id_solicitud: idSolicitud },
     data: {
      etapa: 'DERIVACION',              // pasa a "En espera de derivación"
      asignado_a: null,                 // 👈 deja de estar asignado a Analista_1
    // opcional: limpiar también derivación si hubiera algo raro
      id_derivacion: null,
      fecha_modificacion: new Date(),
  },
});

    // 3. Registrar en revisados
    await tx.revisados.create({
      data: {
        id_solicitud: idSolicitud,
        estado_revision: 'APROBADO',  // 👈 usamos el enum de Prisma
        revisado_por: idFuncionario,                    // FK a funcionario.id_funcionario
        fecha_ingreso_original:
          solicitudOriginal.fecha_ingreso ?? new Date(), // por si alguna fila vieja tuviera null
        // diagnostico, observaciones, etc. si luego quieres
      },
    });

    // 4. Registrar en bitácora
    await tx.bitacora.create({
      data: {
        id_solicitud: idSolicitud,
        id_funcionario: idFuncionario,
        accion: 'APROBACION_REVISION',
        observaciones:
          'Solicitud aprobada en revisión y enviada a "En espera de Derivación".',
        // fecha_evento usa default(now())
      },
    });

    return solicitudActualizada;
  });
}


}
