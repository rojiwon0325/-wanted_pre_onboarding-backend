import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { TypeOrmBaseRepository } from 'src/api/common/provider/repository.base';
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm';
import { IRecruitment, IRecruitmentId } from '../domain/recruitment.interface';
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
    const ids = await this.getRepository().find({
      where: { company_id, id: Not(id) },
      select: { id: true },
    });
    return ids.map(({ id }) => id);
  }

  async findOne(id: IRecruitmentId, relation = false): Promise<IRecruitment> {
    const entity = await this.getRepository().findOne({
      where: { id },
      relations: { company: relation },
    });
    if (!entity) {
      throw httpExceptionProvider('404', ExceptionMessage.NotFoundAggregate);
    }
    return this.getMapper().toAggregate(entity);
  }

  async findMany(option?: FindManyOption): Promise<IRecruitment[]> {
    const { search, page = 1 } = option ?? {};
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
      relations: { company: true },
      take: 15,
      skip: 15 * (page - 1),
      order: { created_at: 'desc' },
    });
    return entities.map(this.getMapper().toAggregate);
  }
}
