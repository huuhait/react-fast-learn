export const enum UserState {
  Active = 'active',
  Deleted = 'deleted',
  Pending = 'pending',
  Loading = 'loading'
}

export type SlideShow = {
  id: number
  image: string
  created_at: string
  updated_at: string
}

export type Product = {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  discount: number;
  description: string;
  image: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export const enum ProductStatus {
  Active = 1,
  Hide = 0
}

export type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export enum Align {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum SortType {
  Number = 'Number',
  String = 'String',
}

export enum SortKind {
  Up = 'up',
  Down = 'down',
  None = 'none',
}

export enum Format {
  DateTime = 'datetime',
  Time = 'time',
  Price = 'price',
}

export enum ParseType {
  DateTime = 'datetime',
  Time = 'time',
  Decimal = 'decimal',
}

export interface TableColumn {
  key: string
  title?: string
  class?: string
  align?: Align
  sort?: boolean
  sortBy?: SortType
  scopedSlots?: boolean
  headScopedSlots?: boolean
  formatBy?: Format
  sideKey?: string
  toUpper?: boolean
  toLower?: boolean
  hideColumn?: boolean
  parse?: ParseType
  precision?: number | ((item: any) => number)
  prefix?: string | ((item: any) => string)
  suffix?: string | ((item: any) => string)
}

export type Cart = {
  product_id: number
  quantity: number
}

export type User = {
  id?: number;
  email: string;
  password: string;
  fullname: string;
  address: string;
  created_at?: Date;
  updated_at?: Date;
}
