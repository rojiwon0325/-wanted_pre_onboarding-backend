export interface IEntity<IId> {
  id: IId;
}

export interface IBaseAggregate<IId> extends IEntity<IId> {
  created_at: Date;
  updated_at: Date;
}
