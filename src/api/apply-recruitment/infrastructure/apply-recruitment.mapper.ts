import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { ApplyRecruitment } from '../domain/apply-recruitment.aggregate';
import { IApplyRecruitment } from '../domain/apply-recruitment.interface';
import { ApplyRecruitmentEntity } from './apply-recruitment.entity';

@Injectable()
export class ApplyRecruitmentEntityMapper
  implements IEntityMapper<IApplyRecruitment, ApplyRecruitmentEntity>
{
  toAggregate(entity: ApplyRecruitmentEntity): IApplyRecruitment {
    const { id, user_id, recruitment_id, created_at, updated_at } = entity;
    return ApplyRecruitment.get({
      id,
      user_id,
      recruitment_id,
      created_at,
      updated_at,
    });
  }

  toRootEntity(aggregate: IApplyRecruitment): ApplyRecruitmentEntity {
    const { id, recruitment_id, user_id } = aggregate;
    const entity = new ApplyRecruitmentEntity();
    entity.id = id;
    entity.recruitment_id = recruitment_id;
    entity.user_id = user_id;
    return entity;
  }
}
