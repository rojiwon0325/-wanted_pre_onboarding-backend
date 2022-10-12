import { IApplyRecruitment } from '../domain/apply-recruitment.interface';
import { FindManyOption } from '../domain/repository.interface';

export type CreateApplyRecruitmentDTO = Pick<
  IApplyRecruitment,
  'recruitment_id' | 'user_id'
>;

export type FindManyApplyRecruitmentDTO = FindManyOption;
