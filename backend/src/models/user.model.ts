type User = {
  id: number;
  user: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  pronouns: string;
  bio: string;
  followers: number[];
  following: number[];
  blocked: number[];
}

export { User };