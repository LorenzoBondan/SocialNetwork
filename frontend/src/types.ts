export type SpringPage<T> = {
    content: T[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty: boolean;
  };


export type User = {
    id:number;
    name: string;
    email: string;
    password: string;
    imgUrl: string;
    bio: string;
    verified: boolean;
    roles : Role[];
    postsId: number[];
    commentsId: number[];
    followingId: number[];
    followersId: number[];
}

export type Role = {
    id: number;
    authority : string;
}

export type Post = {
    id: number;
    title: string;
    description: string;
    date: string;
    user: User;
    comments: Comment[];
    likes: Like[];
}

export type Comment = {
    id: number;
    description: string;
    user: User;
    postId : number;
}

export type Like = {
    id: number;
    user: User;
    postId: number;
}