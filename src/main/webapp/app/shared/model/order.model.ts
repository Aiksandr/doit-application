import { ICategory } from 'app/shared/model/category.model';
import { IClient } from 'app/shared/model/client.model';
import { ILocation } from 'app/shared/model/location.model';
import { Language } from 'app/shared/model/enumerations/language.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrder {
  id?: number;
  language?: Language;
  status?: OrderStatus;
  title?: string;
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: ICategory;
  owner?: IClient;
  performer?: IClient;
  location?: ILocation;
}

export const defaultValue: Readonly<IOrder> = {};
