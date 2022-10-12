import {
  CreateApplyRecruitmentBody,
  CreateApplyRecruitmentResponse,
  FindManyApplyRecruitmentQuery,
  FindManyApplyRecruitmentResponse,
} from './apply-recruitment.controller.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApplyRecruitmentService } from '../application/apply-recruitment.service';
import {
  IApplyRecruitmentProperty,
  IApplyRecruitmentResponseType,
} from '../domain/apply-recruitment.interface';

@Controller('apply-recruitment')
export class ApplyRecruitmentController {
  constructor(private readonly service: ApplyRecruitmentService) {}

  @Get()
  async findMany(
    @Query() query: FindManyApplyRecruitmentQuery,
  ): Promise<FindManyApplyRecruitmentResponse> {
    const ApplyRecruitment: IApplyRecruitmentResponseType[] =
      await this.service.findMany({ ...query });
    return { ApplyRecruitment };
  }

  @Post()
  async create(
    @Body() body: CreateApplyRecruitmentBody,
  ): Promise<CreateApplyRecruitmentResponse> {
    const { user_id, recruitment_id } = body;
    const ApplyRecruitment: IApplyRecruitmentProperty =
      await this.service.create({
        user_id,
        recruitment_id,
      });
    return { ApplyRecruitment };
  }
}
