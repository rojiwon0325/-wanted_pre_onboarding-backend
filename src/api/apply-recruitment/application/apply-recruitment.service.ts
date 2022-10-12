import { Inject, Injectable } from '@nestjs/common';
import { ApplyRecruitment } from '../domain/apply-recruitment.aggregate';
import {
  IApplyRecruitment,
  IApplyRecruitmentResponseType,
} from '../domain/apply-recruitment.interface';
import { IApplyRecruitmentRepository } from '../domain/repository.interface';
import { ApplyRecruitmentRepository } from '../infrastructure/apply-recruitment.repository';
import {
  CreateApplyRecruitmentDTO,
  FindManyApplyRecruitmentDTO,
} from './apply-recruitment.service.dto';

@Injectable()
export class ApplyRecruitmentService {
  constructor(
    @Inject(ApplyRecruitmentRepository)
    private readonly repository: IApplyRecruitmentRepository,
  ) {}

  async create({
    recruitment_id,
    user_id,
  }: CreateApplyRecruitmentDTO): Promise<IApplyRecruitment> {
    const aggregate = ApplyRecruitment.get({ recruitment_id, user_id });
    return this.repository.save(aggregate);
  }

  async findMany(
    dto: FindManyApplyRecruitmentDTO,
  ): Promise<IApplyRecruitmentResponseType[]> {
    const aggregates = await this.repository.findMany(dto);
    return aggregates.map((agg) => agg.getResponseType());
  }
}
