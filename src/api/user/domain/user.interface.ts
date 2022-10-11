import { BaseAggregate } from 'src/api/common/model/aggregate.base';

export type IUserId = number;

export interface IUserProperty extends BaseAggregate<IUserId> {
  username: string;
}

export type IUserReponseType = Omit<
  IUserProperty,
  keyof BaseAggregate<IUserId>
>;

export type IUserMethod = {
  getResponseType: () => IUserReponseType;
};

export type IUser = IUserProperty & IUserMethod;

export type IUserProps = Omit<IUserProperty, keyof BaseAggregate<IUserId>> &
  Partial<BaseAggregate<IUserId>>;
