import { Controller } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController extends BaseController<
  UsuarioService,
  number,
  any,
  any
> {
  constructor(service: UsuarioService) {
    super(service, 'id_usuario');
  }
}
