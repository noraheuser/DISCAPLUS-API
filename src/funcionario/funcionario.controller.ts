import { Controller } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { BaseController } from '../common/base.controller';
import { Prisma } from '@prisma/client';

@Controller('funcionarios')
export class FuncionarioController extends BaseController<
  FuncionarioService,
  number,
  Prisma.funcionarioCreateInput,
  Prisma.funcionarioUpdateInput
> {
  constructor(service: FuncionarioService) {
    // la PK en la tabla es id_funcionario
    super(service, 'id_funcionario');
  }
}
