import { Request, Response, Body, Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { PostService } from '../services';
import { httpResponse } from 'src/utils';
import _ from 'underscore';
import { Request as IRequest, Response as IResponse, NextFunction } from 'express';
import { IUserRequest } from 'src/middlewares';


@Controller()
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('/api/v1/post')
  async addPost(@Request() req: IUserRequest, @Response() res: IResponse,): Promise<void> {
    let user = req.user
    let data = {
      ...req.body,
      userID: user?.id,
      // comments:[]
    }
    
    let post = await this.postService.addPost(data);

    res.status(200)
      .json(httpResponse('post created', { post }));
  }

  @Patch('/api/v1/post/:postID/comment')
  async addComment(@Request() req: IUserRequest, @Response() res: IResponse,@Param() params: { postID: string }): Promise<any> {
    let user = req.user
    let data = {
    ...req.body,
    postId: params.postID
    }
    
    let post = await this.postService.addComment(data);
    res.status(200)
    .json(httpResponse('comment added', { post }));

  }

  @Get('/api/v1/post')
  async getPosts(@Request() req: IUserRequest, @Response() res: IResponse): Promise<void> {
    let user = req?.user
    let {skip=0,take=10}=req.query
    let posts = await this.postService.getUserPosts(user?.id,{skip,take});
    res.status(200)
      .json(httpResponse('posts fetched', { posts }));
  }

}
