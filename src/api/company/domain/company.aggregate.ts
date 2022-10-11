import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import {
  ICompany,
  ICompanyId,
  ICompanyProps,
  ICompanyReponseType,
} from './company.interface';

export class Company extends BaseAggregate<ICompanyId> implements ICompany {
  private constructor(
    id: ICompanyId,
    public name: string,
    public country: string,
    public region: string,
    created_at: Date,
    updated_at: Date,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: ICompanyProps): ICompany {
    const { id, name, country, region, created_at, updated_at } = props;
    const now = new Date();
    return new Company(
      id ?? 0,
      name,
      country,
      region,
      created_at ?? now,
      updated_at ?? now,
    );
  }

  getResponseType(): ICompanyReponseType {
    const { name, country, region } = this;
    return { name, country, region };
  }
}
