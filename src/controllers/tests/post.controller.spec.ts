import { PostService } from "../../services";
import { PostController } from "..";
import { IUserRequest } from "src/middlewares";
import { Response as IResponse} from 'express';

describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService(); // Create an instance of the postService
    postController = new PostController(postService); // Create an instance of the postController with the postService
  });

  describe('postAct', () => {
    it('should like or unlike a post and return a response', async () => {
      // Mock the dependencies and input data
      const req:Partial<IUserRequest> = {
        user: { 
          id: '6474685cfbcd812fc5e8ce58',
          email: "testEmail@gmail.com",
          username: "testUsername",
          followers: [],
          follows: []
         },
         body: { content: 'Updated content' },
      };
      const res:Partial<IResponse> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const params = {
        postID: '647469a1d44c845ba9643745',
      };

      // Mock the postService.postAct method
      const mockpostAct = jest.spyOn(postService, 'postAct');
      mockpostAct.mockResolvedValueOnce({status: "liked" || "unliked",post:{id: '647469a1d44c845ba9643745', content: 'Updated content' } });

      // Call the postAct method
      await postController.postAct(req, res, params);

      // Expectations
      expect(mockpostAct).toHaveBeenCalledWith({
        // user: req.user,
        postID: params.postID,
        ...req.body
      },req.user);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'post updated',
        success:true,
        data:{
          status: "liked" || "unliked",
          post: {
            id: '647469a1d44c845ba9643745', 
            content: 'Updated content' 
          } 
        }
      });
    });
  });
  
  describe('getPosts', () => {
    it('should get all posts and return a response', async () => {
      // Mock the dependencies and input data
      const req:Partial<IUserRequest> = {
        user: { 
          id: '6474685cfbcd812fc5e8ce58',
          email: "testEmail@gmail.com",
          username: "testUsername",
          followers: [],
          follows: []
         },
         query : {
          skip:'0',
          take:'10'
        }
      };
      const res:Partial<IResponse> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const userPosts = [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ];
      const expectedResponse = {
       data:{ NoPosts: userPosts.length,
        posts: userPosts,}
      };

     // Mock the postService.postAct method
      const mockpostAct = jest.spyOn(postService, 'getUserPosts');
      mockpostAct.mockResolvedValueOnce(userPosts);

      // Call the postAct method
      await postController.getPosts(req, res);

      // Expectations
      expect(mockpostAct).toHaveBeenCalledWith(req.user,{    
        skip:'0',
        take:'10'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
        message: 'posts fetched',
        ...expectedResponse,
      }),);
    });
  });



});
