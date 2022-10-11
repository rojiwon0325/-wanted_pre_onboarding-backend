import { BaseAggregate } from 'src/api/common/model/aggregate.base';

export type ICompanyId = number;

export interface ICompanyProperty extends BaseAggregate<ICompanyId> {
  name: string;
  country: string;
  region: string;
}

export type ICompanyProps = Omit<
  ICompanyProperty,
  keyof BaseAggregate<ICompanyId>
> &
  Partial<BaseAggregate<ICompanyId>>;
