import { map_CompanyEntity_to_CompanyAggregate } from './../../company/infrastructure/company.mapper';
import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { Recruitment } from '../domain/recruitment.aggregate';
import { IRecruitment } from '../domain/recruitment.interface';
import { RecruitmentEntity } from './recruitment.entity';

export const map_RecruitmentEntity_to_RecruitmentAggregate = (
  entity: RecruitmentEntity,
): IRecruitment => {
  const {
    id,
    created_at,
    updated_at,
    company_id,
    position,
    compensation,
    description,
    skill,
    company,
  } = entity;
  return Recruitment.get(
    {
      id,
      company_id,
      position,
      compensation,
      description,
      skill,
      created_at,
      updated_at,
    },
    company ? map_CompanyEntity_to_CompanyAggregate(company) : undefined,
  );
};

/** created_at updated_at을 제외한 나머지 데이터만 사용 */
export const map_RecruitmentAggregate_to_RecruitmentEntity = (
  aggregate: IRecruitment,
): RecruitmentEntity => {
  const { id, company_id, position, compensation, description, skill } =
    aggregate;
  const entity = new RecruitmentEntity();
  if (id != 0) {
    entity.id = id;
  }
  entity.company_id = company_id;
  entity.compensation = compensation;
  entity.description = description;
  entity.skill = skill;
  entity.position = position;
  return entity;
};

@Injectable()
export class RecruitmentEntityMapper
  implements IEntityMapper<IRecruitment, RecruitmentEntity>
{
  toAggregate = map_RecruitmentEntity_to_RecruitmentAggregate;
  toRootEntity = map_RecruitmentAggregate_to_RecruitmentEntity;
}
