import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { BitacoraModule } from './bitacora/bitacora.module';
import { DuplicadosModule } from './duplicados/duplicados.module';
import { RevisadosModule } from './revisados/revisados.module';
import { SolicitudModule } from './solicitud/solicitud.module';

@Module({
  imports: [PrismaModule, FuncionarioModule, BitacoraModule, DuplicadosModule, RevisadosModule, SolicitudModule],
})
export class AppModule {}
