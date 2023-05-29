import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUser } from 'src/interfaces';
import { AppError } from 'src/utils';
import { Cache } from 'cache-manager';


// type StringFilter ={
//   search: String | SearchFilter // The String shorthand would resolve into mode: NATURAL
// }

// type SearchFilter ={
//   query: String
//   mode: SearchFilterMode
// }

// enum SearchFilterMode {
//   NATURAL,
//   BOOLEAN
// }
@Injectable()
export class PostService {
  private readonly prisma = new PrismaService();
  // @Inject(CACHE_MANAGER) private cacheService= Cache

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

  async postAct(PostData: any,user:Partial<IUser>): Promise<any> {
    //validate post
    await this.getPostById(PostData.postId)

    let post = await this.prisma.post.findUnique({
      where: {
        id: PostData.postId
      },
      select: {
        likes: true
      },
    })
   let likes:any= post.likes.find((id:string)=>id==user.id)
   if(likes){
    //unlike
    likes= post.likes.filter((id:string)=>id!=user.id)
   }else{
//like
     likes = [...post.likes, user.id ]
   }

    post = await this.prisma.post.update({
      where: { id: PostData.postId },
      data: {
        likes: { set: likes }
      }
    })

    return { status:post.likes.find((id:string)=>id==user.id)?'liked':'unliked', post};
  }

  async postSearch(keywords: any, { skip, take }: any): Promise<any> {
    // check if data is in cache:
    // const cachedData = await this.cacheService.get<{ name: string }>(
    //   id.toString(),
    // );
    // if (cachedData) {
    //   console.log(`Getting data from cache!`);
    //   return `${cachedData.name}`;
    // }
    let posts = await this.prisma.post.findMany({
      where: {
        content: { 
          contains: keywords
        }
      },
      skip: Number(skip),
      take: Number(take)
    })


    return posts;
  }

  async getUserPosts(user: IUser, { skip, take }: any): Promise<any> {
    let userFollows=[user.id,...user.follows]
    let posts=[]
    for(let id of userFollows){

      const userPosts = await this.prisma.post.findMany({
        where: { userID: id },
        skip: Number(skip),
        take: Number(take)
      });
    posts=[...posts,...userPosts]
    }
  // console.log(posts)
    return posts;
  }
  // async getFollowsPosts(follows: any): Promise<any> {
  //   //get user follows

  //   let followsPosts=await this.prisma.post.findMany({
  //     where: { userID: String(_id) },
  //     skip: Number(skip),
  //     take: Number(take)
  //   });
  //   const posts = await this.prisma.post.findMany({
  //     where: { userID: String(_id) },
  //     skip: Number(skip),
  //     take: Number(take)
  //   });
  //   return posts;
  // }

  async getPostById(_id: any): Promise<any> {
    const post = await this.prisma.post.findUnique({
      where: { id: _id},
    });
    if(!post) throw new AppError(`no post with id ${_id}`)
    return post;
  }
}
