import { Module } from '@nestjs/common';
import { RevisadosService } from './revisados.service';
import { RevisadosController } from './revisados.controller';

@Module({
  providers: [RevisadosService],
  controllers: [RevisadosController],
})
export class RevisadosModule {}
