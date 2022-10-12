import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import {
  IApplyRecruitment,
  IApplyRecruitmentId,
  IApplyRecruitmentProperty,
} from './apply-recruitment.interface';

export type FindManyOption = Partial<
  Pick<IApplyRecruitmentProperty, 'recruitment_id' | 'user_id'>
>;

export interface IApplyRecruitmentRepository
  extends IBaseRepository<IApplyRecruitmentId, IApplyRecruitment> {
  findMany: (option?: FindManyOption) => Promise<IApplyRecruitment[]>;
}
