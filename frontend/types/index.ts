export interface Book {
  id: number;
  attributes: {
    title: string;
    description: string;
    author?: {
      data?: {
        id: number;
        attributes: {
          name: string;
          bio: string;
        };
      };
    };
  };
}

export interface Author {
  id: number;
  attributes: {
    name: string;
    bio: string;
    books?: {
      data: Book[];
    };
  };
}

export interface ApiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}