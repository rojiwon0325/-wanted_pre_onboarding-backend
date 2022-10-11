import { ICompany, ICompanyId } from 'src/api/company/domain/company.interface';
import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import {
  IRecruitment,
  IRecruitmentDetailReponseType,
  IRecruitmentId,
  IRecruitmentProps,
  IRecruitmentReponseType,
} from './recruitment.interface';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';

export class Recruitment
  extends BaseAggregate<IRecruitmentId>
  implements IRecruitment
{
  private company?: ICompany;
  private constructor(
    id: IRecruitmentId,
    readonly company_id: ICompanyId,
    public position: string,
    public compensation: number,
    public description: string,
    public skill: string,
    created_at: Date,
    updated_at: Date,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: IRecruitmentProps, company?: ICompany): IRecruitment {
    const {
      id,
      company_id,
      position,
      compensation,
      description,
      skill,
      created_at,
      updated_at,
    } = props;
    const now = new Date();
    const agg = new Recruitment(
      id ?? 0,
      company_id,
      position,
      compensation,
      description,
      skill,
      created_at ?? now,
      updated_at ?? now,
    );
    if (company) {
      if (company.id != company_id) {
        throw httpExceptionProvider(
          '400',
          '채용 정보와 회사 정보가 일치하지 않습니다.',
        );
      }
      agg.company = company;
    }
    return agg;
  }

  getResponseType(): IRecruitmentReponseType {
    const { id, position, compensation, skill, company } = this;

    return {
      id,
      position,
      compensation,
      skill,
      company: company?.getResponseType(),
    };
  }

  getDetailResponseType(
    recruitments: IRecruitmentId[],
  ): IRecruitmentDetailReponseType {
    const { id, position, compensation, skill, company, description } = this;
    return {
      id,
      position,
      compensation,
      description,
      skill,
      company: company?.getResponseType(),
      other_recruitments: recruitments,
    };
  }
}
