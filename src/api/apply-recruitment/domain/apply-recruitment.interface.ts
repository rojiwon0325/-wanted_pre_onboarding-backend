import { BaseAggregate } from 'src/api/common/model/aggregate.base';

export type IApplyRecruitmentId = number;

export interface IApplyRecruitmentProperty
  extends BaseAggregate<IApplyRecruitmentId> {
  readonly user_id: number;
  readonly recruitment_id: number;
}

export type IApplyRecruitmentResponseType = Pick<
  IApplyRecruitmentProperty,
  'user_id' | 'recruitment_id'
>;

export interface IApplyRecruitmentMethod {
  getResponseType: () => IApplyRecruitmentResponseType;
}

export type IApplyRecruitment = IApplyRecruitmentProperty &
  IApplyRecruitmentMethod;

export type IApplyRecruitmentProps = Omit<
  IApplyRecruitmentProperty,
  keyof BaseAggregate<IApplyRecruitmentId>
> &
  Partial<BaseAggregate<IApplyRecruitmentId>>;
