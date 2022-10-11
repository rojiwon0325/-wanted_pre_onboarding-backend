import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import {
  IRecruitmentId,
  IRecruitmentProperty,
} from '../domain/recruitment.interface';
import { FindManyOption } from '../domain/repository.interface';

export type CreateRecruitmentDTO = Omit<
  IRecruitmentProperty,
  keyof BaseAggregate<IRecruitmentId>
>;

export type FindOneRecruitmentDTO = Pick<IRecruitmentProperty, 'id'>;

export type FindManyRecruitmentDTO = FindManyOption;

export type UpdateRecruitmentDTO = Pick<
  IRecruitmentProperty,
  'compensation' | 'description' | 'position' | 'skill'
>;

export type RemoveRecruitmentDTO = Pick<IRecruitmentProperty, 'id'>;
