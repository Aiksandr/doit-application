import { Moment } from 'moment';
import { IOrder } from 'app/shared/model/order.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrderHistory {
  id?: number;
  oldStatus?: OrderStatus;
  newStatus?: OrderStatus;
  createDate?: Moment;
  order?: IOrder;
}

export const defaultValue: Readonly<IOrderHistory> = {};
