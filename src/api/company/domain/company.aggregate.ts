import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import {
  ICompanyId,
  ICompanyProperty,
  ICompanyProps,
} from './company.interface';

export class Company
  extends BaseAggregate<ICompanyId>
  implements ICompanyProperty
{
  constructor(
    id: ICompanyId,
    public name: string,
    public country: string,
    public region: string,
    created_at: Date,
    updated_at: Date,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: ICompanyProps): Company {
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
}
