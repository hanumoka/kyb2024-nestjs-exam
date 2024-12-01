import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

const posts: PostModel[] = [
  {
    id: 1,
    author: 'John',
    title: 'Hello World',
    content: 'This is the first post',
    likeCount: 10,
    commentCount: 5,
  },
  {
    id: 2,
    author: 'John2',
    title: 'Hello Worl2d',
    content: 'This is 2the first post',
    likeCount: 15,
    commentCount: 51,
  },
  {
    id: 3,
    author: 'John4',
    title: 'Hello Worl4d',
    content: 'This is 2444he first post',
    likeCount: 20,
    commentCount: 56,
  },
];

@Injectable()
export class PostsService {
  getAllPosts(): PostModel[] {
    return posts;
  }

  getPostById(id: number): PostModel {
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  createPost(author: string, title: string, content: string): PostModel {
    const newPost = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts.push(newPost);
    return newPost;
  }

  updatePost(
    id: number,
    author?: string,
    title?: string,
    content?: string,
  ): PostModel {
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    return post;
  }

  deletePost(id: number): number {
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      throw new NotFoundException('Post not found');
    }

    const deletedPost = posts.splice(postIndex, 1)[0];

    return deletedPost.id;
  }
}
