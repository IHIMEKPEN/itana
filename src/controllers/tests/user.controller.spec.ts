import { UserService } from "../../services";
import { UserController } from "..";
import { IUserRequest } from "src/middlewares";
import { Response as IResponse} from 'express';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(); // Create an instance of the UserService
    userController = new UserController(userService); // Create an instance of the UserController with the UserService
  });

  describe('userAct', () => {
    it('should follow a user and return a response', async () => {
      // Mock the dependencies and input data
      const req:Partial<IUserRequest> = {
        user: { 
          id: '6474685cfbcd812fc5e8ce58',
          email: "testEmail@gmail.com",
          username: "testUsername",
          followers: [],
          follows: []
         },
      };
      const res:Partial<IResponse> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const params = {
        userID: '647469a1d44c845ba9643745',
      };

      // Mock the userService.userAct method
      const mockUserAct = jest.spyOn(userService, 'userAct');
      mockUserAct.mockResolvedValueOnce({status: "unfollowed" || "followed" });

      // Call the userAct method
      await userController.userAct(req, res, params);

      // Expectations
      expect(mockUserAct).toHaveBeenCalledWith({
        user: req.user,
        userID: params.userID,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'user follows updated',
        success:true,
        data:{
          post:{
            status: "unfollowed" || "followed" 
          }
        }
      });
    });
  });
});
