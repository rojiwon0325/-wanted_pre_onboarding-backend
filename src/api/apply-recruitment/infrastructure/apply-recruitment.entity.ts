import { TypeOrmBaseEntity } from 'src/api/common/model/typeorm-entity.base';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsNumber } from 'class-validator';
import { UserEntity } from 'src/api/user/infrastructure/user.entity';
import { RecruitmentEntity } from 'src/api/recruitment/infrastructure/recruitment.entity';
import { IUserId } from 'src/api/user/domain/user.interface';
import { IRecruitmentId } from 'src/api/recruitment/domain/recruitment.interface';

export const ApplyRecruitmentErrorMessage = {
  user: '존재하지 않는 사용자입니다.',
  recruitment: '존재하지 않는 채용공고입니다.',
};

@Unique(['user_id', 'recruitment_id'])
@Entity({ name: 'apply_recruitments' })
export class ApplyRecruitmentEntity extends TypeOrmBaseEntity {
  @Column()
  @IsNumber({}, { message: ApplyRecruitmentErrorMessage.user })
  user_id: IUserId;

  @Column()
  @IsNumber({}, { message: ApplyRecruitmentErrorMessage.recruitment })
  recruitment_id: IRecruitmentId;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => RecruitmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recruitment_id' })
  recruitment?: RecruitmentEntity;
}
