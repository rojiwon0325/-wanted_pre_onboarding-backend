import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { TypeOrmBaseRepository } from 'src/api/common/provider/repository.base';
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm';
import {
  IRecruitment,
  IRecruitmentId,
  IRecruitmentReponseType,
} from '../domain/recruitment.interface';
import {
  FindIdsDTO,
  FindManyOption,
  IRecruitmentRepository,
} from '../domain/repository.interface';
import { RecruitmentEntity } from './recruitment.entity';
import { RecruitmentEntityMapper } from './recruitment.mapper';

@Injectable()
export class RecruitmentRepository
  extends TypeOrmBaseRepository<IRecruitmentId, IRecruitment, RecruitmentEntity>
  implements IRecruitmentRepository
{
  constructor(
    @Inject(RecruitmentEntityMapper)
    mapper: IEntityMapper<IRecruitment, RecruitmentEntity>,
    @InjectRepository(RecruitmentEntity)
    repository: Repository<RecruitmentEntity>,
  ) {
    super(mapper, repository);
  }

  async findIds({ id, company_id }: FindIdsDTO): Promise<IRecruitmentId[]> {
    return this.getRepository().find({
      where: { company_id, id: Not(id) },
      select: { id: true },
    }) as unknown as Promise<IRecruitmentId[]>;
  }

  async findManyRelation({
    search,
    page = 1,
  }: FindManyOption): Promise<IRecruitmentReponseType[]> {
    const where: FindOptionsWhere<RecruitmentEntity>[] = [];
    if (search) {
      const keyword = `%${search}%`;
      where.push({ company: { name: Like(keyword) } });
      where.push({ company: { country: Like(keyword) } });
      where.push({ company: { region: Like(keyword) } });
      where.push({ position: Like(keyword) });
      where.push({ skill: Like(keyword) });
    }
    const entities = await this.getRepository().find({
      ...(search ? { where } : {}),
      take: 15,
      skip: 15 * (page - 1),
      order: { id: 'desc' },
    });
    return entities.map((entity) =>
      this.getMapper().toAggregate(entity).getResponseType(),
    );
  }
}
