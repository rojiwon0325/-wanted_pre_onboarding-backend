import { IRecruitmentResponseType } from '../domain/recruitment.interface';
import { IRecruitmentDetailReponseType } from '../domain/recruitment.interface';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import {
  IRecruitmentId,
  IRecruitmentProperty,
} from '../domain/recruitment.interface';
import { RecruitmentErrorMessage } from '../infrastructure/recruitment.entity';
import { OmitType } from '@nestjs/swagger';

export class FindOneRecruitmentParam {
  @IsNumber()
  @Type(() => Number)
  recruitment_id: number;
}

export type FindOneRecruitmentResponse = {
  Recruitment: IRecruitmentDetailReponseType;
};

export class FindManyRecruitmentQuery {
  @IsString()
  @IsOptional()
  search?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number;
}

export type FindManyRecruitmentResponse = {
  Recruitment: IRecruitmentResponseType[];
};

export class CreateRecruitmentBody
  implements Omit<IRecruitmentProperty, keyof BaseAggregate<IRecruitmentId>>
{
  @IsNumber({}, { message: RecruitmentErrorMessage.company_id })
  @Type(() => Number)
  company_id: number;

  @IsString({ message: RecruitmentErrorMessage.position })
  position: string;

  @IsNumber({}, { message: RecruitmentErrorMessage.compensation })
  @Type(() => Number)
  compensation: number;

  @IsString({ message: RecruitmentErrorMessage.description })
  description: string;

  @IsString({ message: RecruitmentErrorMessage.skill })
  skill: string;
}

export class UpdateRecruitmentBody extends OmitType(CreateRecruitmentBody, [
  'company_id',
]) {}

export type CreateRecruitmentResponse = {
  Recruitment: IRecruitmentProperty;
};

export type UpdateRecruitmentResponse = {
  Recruitment: IRecruitmentProperty;
};

export type RemoveRecruitmentResponse = {
  recruitment_id: IRecruitmentId;
};
