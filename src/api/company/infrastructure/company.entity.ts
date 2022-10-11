import { TypeOrmBaseEntity } from 'src/api/common/model/typeorm-entity.base';
import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';

export const CompanyErrorMessage = {
  name: '회사명은 문자열입니다.',
  country: '국가는 문자열입니다.',
  region: '지역은 문자열입니다.',
};

@Entity({ name: 'companys' })
export class CompanyEntity extends TypeOrmBaseEntity {
  @Column()
  @IsString({ message: CompanyErrorMessage.name })
  name: string;

  @Column()
  @IsString({ message: CompanyErrorMessage.country })
  country: string;

  @Column()
  @IsString({ message: CompanyErrorMessage.region })
  region: string;
}
