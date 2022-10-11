import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import {
  IRecruitmentId,
  IRecruitmentProperty,
} from '../domain/recruitment.interface';

export type CreateRecruitmentDTO = Omit<
  IRecruitmentProperty,
  keyof BaseAggregate<IRecruitmentId>
>;

export type FindOneRecruitmentDTO = Pick<IRecruitmentProperty, 'id'>;

export type RemoveRecruitmentDTO = Pick<IRecruitmentProperty, 'id'>;
