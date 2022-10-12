import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { IRecruitment } from 'src/api/recruitment/domain/recruitment.interface';
import { IUser } from 'src/api/user/domain/user.interface';
import {
  IApplyRecruitment,
  IApplyRecruitmentId,
  IApplyRecruitmentProps,
  IApplyRecruitmentResponseType,
} from './apply-recruitment.interface';

export class ApplyRecruitment
  extends BaseAggregate<IApplyRecruitmentId>
  implements IApplyRecruitment
{
  private user?: IUser;
  private recruitment?: IRecruitment;
  private constructor(
    id: IApplyRecruitmentId,
    readonly user_id: number,
    readonly recruitment_id: number,
    created_at: Date,
    updated_at: Date,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: IApplyRecruitmentProps): IApplyRecruitment {
    const { id, user_id, recruitment_id, created_at, updated_at } = props;
    const now = new Date();
    return new ApplyRecruitment(
      id ?? 0,
      user_id,
      recruitment_id,
      created_at ?? now,
      updated_at ?? now,
    );
  }

  getResponseType(): IApplyRecruitmentResponseType {
    const { user_id, recruitment_id } = this;
    return { user_id, recruitment_id };
  }
}
