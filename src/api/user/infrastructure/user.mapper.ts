import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { User } from '../domain/user.aggregate';
import { IUser } from '../domain/user.interface';
import { UserEntity } from './user.entity';

export const map_UserEntity_to_UserAggregate = (entity: UserEntity): IUser => {
  const { id, created_at, updated_at, username } = entity;
  return User.get({ id, username, created_at, updated_at });
};

/** created_at updated_at을 제외한 나머지 데이터만 사용 */
export const map_UserAggregate_to_UserEntity = (
  aggregate: IUser,
): UserEntity => {
  const { id, username } = aggregate;
  const entity = new UserEntity();
  if (id != 0) {
    entity.id = id;
  }
  entity.username = username;
  return entity;
};

@Injectable()
export class UserEntityMapper implements IEntityMapper<IUser, UserEntity> {
  toAggregate = map_UserEntity_to_UserAggregate;
  toRootEntity = map_UserAggregate_to_UserEntity;
}
