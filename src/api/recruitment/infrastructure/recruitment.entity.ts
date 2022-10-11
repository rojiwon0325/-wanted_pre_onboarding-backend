import { TypeOrmBaseEntity } from 'src/api/common/model/typeorm-entity.base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { CompanyEntity } from 'src/api/company/infrastructure/company.entity';
import { ICompanyId } from 'src/api/company/domain/company.interface';

export const RecruitmentErrorMessage = {
  company_id: '존재하지 않는 회사입니다.',
  position: '채용포지션은 문자열입니다.',
  compensation: '채용보상금은 양수입니다.',
  description: '채용내용은 문자열입니다.',
  skill: '사용기술은 문자열입니다.',
};

@Entity({ name: 'recruitments' })
export class RecruitmentEntity extends TypeOrmBaseEntity {
  @Column()
  @IsNumber({}, { message: RecruitmentErrorMessage.company_id })
  company_id: ICompanyId;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company?: CompanyEntity;

  @Column()
  @IsString({ message: RecruitmentErrorMessage.position })
  position: string;

  @Column()
  @IsNumber({}, { message: RecruitmentErrorMessage.compensation })
  compensation: number;

  @Column()
  @IsString({ message: RecruitmentErrorMessage.description })
  description: string;

  @Column()
  @IsString({ message: RecruitmentErrorMessage.skill })
  skill: string;
}
