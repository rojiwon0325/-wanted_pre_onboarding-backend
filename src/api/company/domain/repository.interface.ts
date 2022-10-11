import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import { ICompany, ICompanyId } from './company.interface';

export type ICompanyRepository = IBaseRepository<ICompanyId, ICompany>;
