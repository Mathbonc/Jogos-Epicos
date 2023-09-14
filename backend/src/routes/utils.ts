import { User } from "../models/user.model";
import { Post } from "../models/post.model";

export function createUser(
    id: number,
    user: string,
    email: string,
    password: string,
    name: string,
    lastName: string,
    pronouns: string = '',
    bio: string = '',
    followers: number[] = [],
    following: number[] = [],
    blocked: number[] = []
  ):  User {
    const newUser: User = {
      id,
      user,
      email,
      password,
      name,
      lastName,
      pronouns,
      bio,
      followers,
      following,
      blocked,
    };
  
    return newUser;
  }

export function createPost(
    user_id: number,
    post_id: number,
    category: [string],
    game: string,
    rate: number,
    title: string = '',
    description: string = ''
  ):  Post {
    const newPost: Post = {
        user_id,
        post_id,
        status: 'active',
        date: new Date().toISOString(),
        category,
        game,
        rate,
        title,
        description,
        comments: 0,
    };
  
    return newPost;
  }
