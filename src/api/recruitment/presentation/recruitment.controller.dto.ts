import { IRecruitmentReponseType } from '../domain/recruitment.interface';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import {
  IRecruitmentId,
  IRecruitmentProperty,
} from '../domain/recruitment.interface';
import { RecruitmentErrorMessage } from '../infrastructure/recruitment.entity';

export class FindOneRecruitmentParam {
  @IsNumber()
  @Type(() => Number)
  recruitment_id: number;
}

export type FindOneRecruitmentResponse = {
  Recruitment: IRecruitmentReponseType;
};

export class CreateRecruitmentBody
  implements Omit<IRecruitmentProperty, keyof BaseAggregate<IRecruitmentId>>
{
  @IsNumber({}, { message: RecruitmentErrorMessage.company_id })
  company_id: number;

  @IsString({ message: RecruitmentErrorMessage.position })
  position: string;

  @IsNumber({}, { message: RecruitmentErrorMessage.compensation })
  compensation: number;

  @IsString({ message: RecruitmentErrorMessage.description })
  description: string;

  @IsString({ message: RecruitmentErrorMessage.skill })
  skill: string;
}

export type CreateRecruitmentResponse = {
  Recruitment: IRecruitmentProperty;
};

export type RemoveRecruitmentResponse = {
  recruitment_id: IRecruitmentId;
};
