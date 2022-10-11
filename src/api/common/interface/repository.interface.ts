import { IBaseAggregate } from './entity.interface';

export interface IBaseRepository<IId, IAggregate extends IBaseAggregate<IId>> {
  findOne: (id: IId) => Promise<IAggregate>;
  findMany: () => Promise<IAggregate[]>;
  save: (aggregate: IAggregate) => Promise<IAggregate>;
  remove: (aggregate: IAggregate) => Promise<void>;
}
