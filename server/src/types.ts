interface ILink {
  href: string;
}

export interface IPaginatedResponse<T, K extends string = 'items'> {
  _page: number;
  _links: {
    self: ILink;
    next?: ILink;
  };
  _embedded: {
    [key in K]: T[];
  };
}

export interface ICompany {
  id: number;
  name: string;
}

export interface IContact {
  id: number;
  name: string;
  request_id: string;
}

export interface IDeal {
  id: number;
  name: string;
  request_id: string;
}