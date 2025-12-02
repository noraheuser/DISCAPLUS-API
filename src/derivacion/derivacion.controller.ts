import { Controller, Get } from '@nestjs/common';
import { DerivacionService } from './derivacion.service';

@Controller('derivacion')
export class DerivacionController {
  constructor(private derivacionService: DerivacionService) {}

  @Get()
  async getAll() {
    return this.derivacionService.findAll();
  }
}
