import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
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

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): PostModel {
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

  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ): PostModel {
    const post = posts.find((post) => post.id === +id);

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

  @Delete(':id')
  deletePost(@Param('id') id: string): string {
    const postIndex = posts.findIndex((post) => post.id === +id);

    if (postIndex === -1) {
      throw new NotFoundException('Post not found');
    }

    const deletedPost = posts.splice(postIndex, 1)[0];

    return deletedPost.id + '';
  }
}
