import { Inject, Injectable } from '@nestjs/common';
import { Recruitment } from '../domain/recruitment.aggregate';
import {
  IRecruitment,
  IRecruitmentDetailReponseType,
  IRecruitmentResponseType,
} from '../domain/recruitment.interface';
import {
  FindManyOption,
  IRecruitmentRepository,
} from '../domain/repository.interface';
import { RecruitmentRepository } from '../infrastructure/recruitment.repository';
import {
  CreateRecruitmentDTO,
  FindOneRecruitmentDTO,
  RemoveRecruitmentDTO,
  UpdateRecruitmentDTO,
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

  async findOneDetail(
    dto: FindOneRecruitmentDTO,
  ): Promise<IRecruitmentDetailReponseType> {
    const recruitment = await this.recruitmentRepository.findOne(dto.id, true);
    const ids = await this.recruitmentRepository.findIds({
      id: recruitment.id,
      company_id: recruitment.company_id,
    });
    return recruitment.getDetailResponseType(ids);
  }

  async findMany(dto: FindManyOption): Promise<IRecruitmentResponseType[]> {
    const entities = await this.recruitmentRepository.findMany(dto);
    return entities.map((entity) => entity.getResponseType());
  }

  async update(
    filter: FindOneRecruitmentDTO,
    dto: UpdateRecruitmentDTO,
  ): Promise<IRecruitment> {
    const recruitment = await this.recruitmentRepository.findOne(filter.id);
    return this.recruitmentRepository.save({ ...recruitment, ...dto });
  }

  async remove(dto: RemoveRecruitmentDTO): Promise<void> {
    const Recruitment = await this.recruitmentRepository.findOne(dto.id);
    return this.recruitmentRepository.remove(Recruitment);
  }
}
