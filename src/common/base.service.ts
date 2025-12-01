export abstract class BaseService<TWhere, TCreate, TUpdate> {
  // delegate: prisma.<modelo>
  protected constructor(protected readonly delegate: any) {}

  findAll(params?: { where?: any; skip?: number; take?: number }) {
    return this.delegate.findMany(params);
  }

  findOne(where: TWhere) {
    return this.delegate.findUnique({ where });
  }

  create(data: TCreate) {
    return this.delegate.create({ data });
  }

  update(where: TWhere, data: TUpdate) {
    return this.delegate.update({ where, data });
  }

  delete(where: TWhere) {
    return this.delegate.delete({ where });
  }
}
