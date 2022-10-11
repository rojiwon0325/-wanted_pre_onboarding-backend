import { BaseAggregate } from 'src/api/common/model/aggregate.base';

export type ICompanyId = number;

export interface ICompanyProperty extends BaseAggregate<ICompanyId> {
  name: string;
  country: string;
  region: string;
}

export type ICompanyReponseType = Omit<
  ICompanyProperty,
  keyof BaseAggregate<ICompanyId>
>;

export type ICompanyMethod = {
  getResponseType: () => ICompanyReponseType;
};

export type ICompany = ICompanyProperty & ICompanyMethod;

export type ICompanyProps = Omit<
  ICompanyProperty,
  keyof BaseAggregate<ICompanyId>
> &
  Partial<BaseAggregate<ICompanyId>>;
