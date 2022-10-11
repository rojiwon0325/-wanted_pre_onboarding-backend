import { IRecruitment } from '../domain/recruitment.interface';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RecruitmentService } from '../application/recruitment.service';
import {
  CreateRecruitmentBody,
  CreateRecruitmentResponse,
  FindOneRecruitmentParam,
  FindOneRecruitmentResponse,
  RemoveRecruitmentResponse,
} from './recruitment.controller.dto';

@Controller('Recruitment')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Get(':recruitment_id')
  async findOne(
    @Param() { recruitment_id: id }: FindOneRecruitmentParam,
  ): Promise<FindOneRecruitmentResponse> {
    const Recruitment: IRecruitment = await this.recruitmentService.findOne({
      id,
    });
    return { Recruitment: Recruitment.getResponseType() };
  }

  @Post()
  async create(
    @Body() body: CreateRecruitmentBody,
  ): Promise<CreateRecruitmentResponse> {
    const { company_id, compensation, description, position, skill } = body;
    const Recruitment: IRecruitment = await this.recruitmentService.create({
      company_id,
      compensation,
      description,
      position,
      skill,
    });
    return { Recruitment };
  }

  @Delete(':recruitment_id')
  async remove(
    @Param() { recruitment_id: id }: FindOneRecruitmentParam,
  ): Promise<RemoveRecruitmentResponse> {
    await this.recruitmentService.remove({ id });
    return { recruitment_id: id };
  }
}
