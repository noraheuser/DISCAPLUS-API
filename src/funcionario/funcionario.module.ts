import { Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';

@Module({
  providers: [FuncionarioService],
  controllers: [FuncionarioController],
})
export class FuncionarioModule {}
