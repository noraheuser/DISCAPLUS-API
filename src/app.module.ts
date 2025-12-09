// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

// módulos de la app
import { SolicitudModule } from './solicitud/solicitud.module';
import { UsuarioModule } from './usuarios/usuario.module';      // 👈 carpeta "usuarios"
import { FuncionarioModule } from './funcionario/funcionario.module';
import { AuthModule } from './auth/auth.module';
import { BitacoraModule } from './bitacora/bitacora.module';  // 

@Module({
  imports: [
    AuthModule,        // 👈 para /auth/login
    SolicitudModule,
    UsuarioModule,
    FuncionarioModule,
    BitacoraModule,    
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
