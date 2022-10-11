import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { Company } from '../domain/company.aggregate';
import { ICompany } from '../domain/company.interface';
import { CompanyEntity } from './company.entity';

export const map_CompanyEntity_to_CompanyAggregate = (
  entity: CompanyEntity,
): ICompany => {
  const { id, created_at, updated_at, name, country, region } = entity;
  return Company.get({ id, name, country, region, created_at, updated_at });
};

/** created_at updated_at을 제외한 나머지 데이터만 사용 */
export const map_CompanyAggregate_to_CompanyEntity = (
  aggregate: ICompany,
): CompanyEntity => {
  const { id, name, country, region } = aggregate;
  const entity = new CompanyEntity();
  if (id != 0) {
    entity.id = id;
  }
  entity.name = name;
  entity.country = country;
  entity.region = region;
  return entity;
};

@Injectable()
export class CompanyEntityMapper
  implements IEntityMapper<ICompany, CompanyEntity>
{
  toAggregate = map_CompanyEntity_to_CompanyAggregate;
  toRootEntity = map_CompanyAggregate_to_CompanyEntity;
}
