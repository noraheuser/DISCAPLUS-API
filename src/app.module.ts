import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { BitacoraModule } from './bitacora/bitacora.module';
import { DuplicadosModule } from './duplicados/duplicados.module';
import { RevisadosModule } from './revisados/revisados.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { DerivacionController } from './derivacion/derivacion.controller';
import { DerivacionService } from './derivacion/derivacion.service';

import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PrismaModule, FuncionarioModule, BitacoraModule, DuplicadosModule, RevisadosModule, SolicitudModule, UsuarioModule],
   controllers: [
    DerivacionController
  ],
  providers: [
    DerivacionService
  ],
})
export class AppModule {}
