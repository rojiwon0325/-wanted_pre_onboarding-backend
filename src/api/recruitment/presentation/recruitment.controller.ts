import {
  IRecruitmentDetailReponseType,
  IRecruitmentResponseType,
} from '../domain/recruitment.interface';
import { IRecruitment } from '../domain/recruitment.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecruitmentService } from '../application/recruitment.service';
import {
  CreateRecruitmentBody,
  CreateRecruitmentResponse,
  FindManyRecruitmentQuery,
  FindManyRecruitmentResponse,
  FindOneRecruitmentParam,
  FindOneRecruitmentResponse,
  RemoveRecruitmentResponse,
  UpdateRecruitmentBody,
  UpdateRecruitmentResponse,
} from './recruitment.controller.dto';

@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Get()
  async findMany(
    @Query() { search, page = 1 }: FindManyRecruitmentQuery,
  ): Promise<FindManyRecruitmentResponse> {
    const Recruitment: IRecruitmentResponseType[] =
      await this.recruitmentService.findMany({
        search,
        page,
      });
    return { Recruitment };
  }

  @Get(':recruitment_id')
  async findOne(
    @Param() { recruitment_id: id }: FindOneRecruitmentParam,
  ): Promise<FindOneRecruitmentResponse> {
    const Recruitment: IRecruitmentDetailReponseType =
      await this.recruitmentService.findOneDetail({
        id,
      });
    return { Recruitment };
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

  @Patch(':recruitment_id')
  async update(
    @Param() { recruitment_id: id }: FindOneRecruitmentParam,
    @Body() body: UpdateRecruitmentBody,
  ): Promise<UpdateRecruitmentResponse> {
    const { compensation, description, position, skill } = body;
    const Recruitment: IRecruitment = await this.recruitmentService.update(
      { id },
      { position, compensation, description, skill },
    );
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
