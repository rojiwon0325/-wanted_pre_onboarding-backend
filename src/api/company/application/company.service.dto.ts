import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { ICompanyId, ICompanyProperty } from '../domain/company.interface';

export type CreateCompanyDTO = Omit<
  ICompanyProperty,
  keyof BaseAggregate<ICompanyId>
>;

export type FindOneCompanyDTO = Pick<ICompanyProperty, 'id'>;

export type RemoveCompanyDTO = Pick<ICompanyProperty, 'id'>;
