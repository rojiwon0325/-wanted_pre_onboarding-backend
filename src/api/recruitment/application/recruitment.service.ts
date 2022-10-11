import { Inject, Injectable } from '@nestjs/common';
import { Recruitment } from '../domain/recruitment.aggregate';
import { IRecruitment } from '../domain/recruitment.interface';
import { IRecruitmentRepository } from '../domain/repository.interface';
import { RecruitmentRepository } from '../infrastructure/recruitment.repository';
import {
  CreateRecruitmentDTO,
  FindOneRecruitmentDTO,
  RemoveRecruitmentDTO,
} from './recruitment.service.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @Inject(RecruitmentRepository)
    private readonly recruitmentRepository: IRecruitmentRepository,
  ) {}

  async create(dto: CreateRecruitmentDTO): Promise<IRecruitment> {
    const { company_id, position, compensation, description, skill } = dto;
    const recruitment = Recruitment.get({
      company_id,
      position,
      compensation,
      description,
      skill,
    });
    return this.recruitmentRepository.save(recruitment);
  }

  async findOne(dto: FindOneRecruitmentDTO): Promise<IRecruitment> {
    return this.recruitmentRepository.findOne(dto.id);
  }

  async remove(dto: RemoveRecruitmentDTO): Promise<void> {
    const Recruitment = await this.recruitmentRepository.findOne(dto.id);
    return this.recruitmentRepository.remove(Recruitment);
  }
}
