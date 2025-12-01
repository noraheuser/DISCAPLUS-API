import { Module } from '@nestjs/common';
import { DuplicadosService } from './duplicados.service';
import { DuplicadosController } from './duplicados.controller';

@Module({
  providers: [DuplicadosService],
  controllers: [DuplicadosController],
})
export class DuplicadosModule {}
