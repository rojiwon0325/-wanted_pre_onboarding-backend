import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { TypeOrmBaseRepository } from 'src/api/common/provider/repository.base';
import { FindManyOptions, Repository } from 'typeorm';
import {
  IApplyRecruitment,
  IApplyRecruitmentId,
} from '../domain/apply-recruitment.interface';
import {
  FindManyOption,
  IApplyRecruitmentRepository,
} from '../domain/repository.interface';
import { ApplyRecruitmentEntity } from './apply-recruitment.entity';
import { ApplyRecruitmentEntityMapper } from './apply-recruitment.mapper';

@Injectable()
export class ApplyRecruitmentRepository
  extends TypeOrmBaseRepository<
    IApplyRecruitmentId,
    IApplyRecruitment,
    ApplyRecruitmentEntity
  >
  implements IApplyRecruitmentRepository
{
  constructor(
    @Inject(ApplyRecruitmentEntityMapper)
    mapper: IEntityMapper<IApplyRecruitment, ApplyRecruitmentEntity>,
    @InjectRepository(ApplyRecruitmentEntity)
    repository: Repository<ApplyRecruitmentEntity>,
  ) {
    super(mapper, repository);
  }

  async findMany(option?: FindManyOption): Promise<IApplyRecruitment[]> {
    const { user_id, recruitment_id } = option ?? {};
    const options: FindManyOptions<ApplyRecruitmentEntity> = {
      order: { created_at: 'desc' },
    };
    if (!!user_id && !!recruitment_id) {
      options.where = { user_id, recruitment_id };
    } else if (!!user_id) {
      options.where = { user_id };
    } else if (!!recruitment_id) {
      options.where = { recruitment_id };
    }
    const entities = await this.getRepository().find(options);
    return entities.map(this.getMapper().toAggregate);
  }
}
