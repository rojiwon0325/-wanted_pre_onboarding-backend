import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IRecruitmentId } from 'src/api/recruitment/domain/recruitment.interface';
import { IUserId } from 'src/api/user/domain/user.interface';
import {
  IApplyRecruitmentProperty,
  IApplyRecruitmentResponseType,
} from '../domain/apply-recruitment.interface';

export class CreateApplyRecruitmentBody {
  @IsNumber()
  @Type(() => Number)
  user_id: IUserId;

  @IsNumber()
  @Type(() => Number)
  recruitment_id: IRecruitmentId;
}

export type CreateApplyRecruitmentResponse = {
  ApplyRecruitment: IApplyRecruitmentProperty;
};

export class FindManyApplyRecruitmentQuery {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_id?: IUserId;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  recruitment_id?: IRecruitmentId;
}

export type FindManyApplyRecruitmentResponse = {
  ApplyRecruitment: IApplyRecruitmentResponseType[];
};
