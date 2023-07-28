type User = {
    id: number;
    username: string;
    email: string;
    followers: number[];
    following: number[];
  };
  
  const users: User[] = [
    {
      id: 1,
      username: "Alice",
      email: "alice@example.com",
      followers: [],
      following: []
    },
    {
      id: 2,
      username: "Bob",
      email: "bob@example.com",
      followers: [],
      following: []
    },
    {
      id: 3,
      username: "Charlie",
      email: "charlie@example.com",
      followers: [],
      following: []
    },
    {
      id: 5,
      username: "Junior",
      email: "junior@example.com",
      followers: [],
      following: []
    }
  ];
  
  export default users;