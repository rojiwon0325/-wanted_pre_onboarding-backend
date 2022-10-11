import { BaseAggregate } from '../model/aggregate.base';

export interface IBaseRepository<IId, IAggregate extends BaseAggregate<IId>> {
  findOne: (id: IId) => Promise<IAggregate>;
  findMany: () => Promise<IAggregate[]>;
  save: (aggregate: IAggregate) => Promise<IAggregate>;
  remove: (aggregate: IAggregate) => Promise<void>;
}
