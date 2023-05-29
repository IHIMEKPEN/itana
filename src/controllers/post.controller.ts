import { Request, Response, Body, Controller, Get, Post, Patch, Param, Query,  UseInterceptors } from '@nestjs/common';
import { PostService } from '../services';
import { httpResponse } from '../utils';
import _ from 'underscore';
import { Request as IRequest, Response as IResponse, NextFunction, query } from 'express';
import { IUserRequest } from '../middlewares';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
// @UseInterceptors(CacheInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('/api/v1/post')
  async addPost(@Request() req: IUserRequest, @Response() res: IResponse,): Promise<void> {
    let user = req.user
    let data = {
      ...req.body,
      userID: user?.id,
    }
    
    let post = await this.postService.addPost(data);

    res.status(200)
      .json(httpResponse('post created', { post }));
  }

  @Patch('/api/v1/post/:postID/comment')
  async addComment(@Request() req: Partial<IUserRequest>, @Response() res: IResponse,@Param() params: { postID: string }): Promise<any> {
    let user = req.user
    let data = {
    ...req.body,
    postId: params.postID
    }
    
    let post = await this.postService.addComment(data);
    res.status(200)
    .json(httpResponse('comment added', { post }));

  }
  @Patch('/api/v1/post/:postID/act')
  async postAct(@Request() req: Partial<IUserRequest>, @Response() res: Partial<IResponse>,@Param() params: { postID: string }): Promise<any> {
    let user = req.user
    let data = {
    ...req.body,
    postID: params.postID
    }
    
    let post = await this.postService.postAct(data,user);
    res.status(200)
    .json(httpResponse('post updated', { ...post }));

  }
  
  @Get('/api/v1/post/search')
  async postSearch(@Request() req: Partial<IUserRequest>, @Response() res: IResponse,@Query() query: { keywords: string }): Promise<any> {
    let user = req.user
    let {skip=0,take=10}=req.query
    let post = await this.postService.postSearch(query.keywords,{skip,take});
    res.status(200)
    .json(httpResponse('post updated', { ...post }));

  }

  @Get('/api/v1/post')
  async getPosts(@Request() req: IUserRequest, @Response() res: IResponse): Promise<void> {
    let user = req?.user
    let {skip=0,take=10}=req.query
    let posts = await this.postService.getUserPosts(user,{skip,take});
    res.status(200)
      .json(httpResponse('posts fetched', { NoPosts:posts.length,posts }));
  }

}
