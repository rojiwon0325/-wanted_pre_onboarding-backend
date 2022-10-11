import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import { ICompanyId } from 'src/api/company/domain/company.interface';
import {
  IRecruitment,
  IRecruitmentId,
  IRecruitmentReponseType,
} from './recruitment.interface';

export type FindIdsDTO = {
  id: IRecruitmentId;
  company_id: ICompanyId;
};
export type FindManyOption = {
  search?: string;
  page?: number;
};
export interface IRecruitmentRepository
  extends IBaseRepository<IRecruitmentId, IRecruitment> {
  findIds: (dto: FindIdsDTO) => Promise<IRecruitmentId[]>;

  findManyRelation: (
    option: FindManyOption,
  ) => Promise<IRecruitmentReponseType[]>;
}
