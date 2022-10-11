import {
  ICompanyId,
  ICompanyReponseType,
} from 'src/api/company/domain/company.interface';
import { BaseAggregate } from 'src/api/common/model/aggregate.base';

export type IRecruitmentId = number;

export interface IRecruitmentProperty extends BaseAggregate<IRecruitmentId> {
  readonly company_id: ICompanyId;
  position: string;
  compensation: number;
  description: string;
  skill: string;
}

export type IRecruitmentResponseType = Pick<
  IRecruitmentProperty,
  'id' | 'position' | 'compensation' | 'skill'
> & { company?: ICompanyReponseType };

export type IRecruitmentDetailReponseType = IRecruitmentResponseType &
  Pick<IRecruitmentProperty, 'description'> & {
    other_recruitments: IRecruitmentId[];
  };

export type IRecruitmentMethod = {
  getResponseType: () => IRecruitmentResponseType;
  getDetailResponseType: (
    recruitments: IRecruitmentId[],
  ) => IRecruitmentDetailReponseType;
};

export type IRecruitment = IRecruitmentProperty & IRecruitmentMethod;

export type IRecruitmentProps = Omit<
  IRecruitmentProperty,
  keyof BaseAggregate<IRecruitmentId>
> &
  Partial<BaseAggregate<IRecruitmentId>>;
