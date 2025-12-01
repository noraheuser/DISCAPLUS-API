import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BaseService } from './base.service';

export abstract class BaseController<
  TService extends BaseService<any, any, any>,
  TIdParam extends string | number,
  TCreate,
  TUpdate,
> {
  protected constructor(
    protected readonly service: TService,
    private readonly idField: string, // nombre de la PK
  ) {}

  @Get()
  findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    const s = skip ? Number(skip) : undefined;
    const t = take ? Number(take) : undefined;
    return this.service.findAll({ skip: s, take: t });
  }

  @Get(':id')
  findOne(@Param('id') id: TIdParam) {
    const where = { [this.idField]: this.castId(id) } as any;
    return this.service.findOne(where);
  }

  @Post()
  create(@Body() data: TCreate) {
    return this.service.create(data as any);
  }

  @Patch(':id')
  update(@Param('id') id: TIdParam, @Body() data: TUpdate) {
    const where = { [this.idField]: this.castId(id) } as any;
    return this.service.update(where, data as any);
  }

  @Delete(':id')
  remove(@Param('id') id: TIdParam) {
    const where = { [this.idField]: this.castId(id) } as any;
    return this.service.delete(where);
  }

  protected castId(id: TIdParam): any {
    if (typeof id === 'string' && /^\d+$/.test(id)) {
      return Number(id);
    }
    return id;
  }
}
