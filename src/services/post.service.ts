import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUser } from 'src/interfaces';
import { AppError } from 'src/utils';

@Injectable()
export class PostService {
  private readonly prisma = new PrismaService();

  async addPost(PostData: any): Promise<any> {


    const post = await this.prisma.post.create({ data: PostData });
    return post;
  }

  async addComment(CommentData: any): Promise<any> {
    //validate post
    await this.getPostById(CommentData.postId)
    const comment = await this.prisma.comment.create({ data: CommentData });

    let post = await this.prisma.post.findUnique({
      where: {
        id: CommentData.postId
      },
      select: {
        comments: true
      },
    })
   
    const comments = [...post.comments, comment.id ]

    post = await this.prisma.post.update({
      where: { id: CommentData.postId },
      data: {
        comments: { set: comments }
      }
    })

    return post;
  }

  async getUserPosts(_id: IUser['_id'], { skip, take }: any): Promise<any> {
    const posts = await this.prisma.post.findMany({
      where: { userID: String(_id) },
      skip: Number(skip),
      take: Number(take)
    });
    return posts;
  }
  async getFollowsPosts(_id: IUser['_id'], { skip, take }: any): Promise<any> {
    const posts = await this.prisma.post.findMany({
      where: { userID: String(_id) },
      skip: Number(skip),
      take: Number(take)
    });
    return posts;
  }

  async getPostById(_id: IUser['_id']): Promise<any> {
    const post = await this.prisma.post.findUnique({
      where: { id: String(_id) },
    });
    if(!post) throw new AppError(`no post with id ${_id}`)
    return post;
  }
}
