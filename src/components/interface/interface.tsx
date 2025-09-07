export interface PostType {
  userId: string;
  id: string;
  title: string;
  body: string;
}
export interface Post {
  userId: number | "";
  id: number | "";
  title: string;
  body: string;
}
export interface Author {
  id: number;
  name: string;
}
export interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
  userName?: string;
}
export interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
}
