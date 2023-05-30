import { AuthService } from "../../services";
import { AuthController } from "..";
import { IUserRequest } from "src/middlewares";
import { Response as IResponse } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(); // Create an instance of the postService
    authController = new AuthController(authService); // Create an instance of the postController with the postService
  });

  describe('register', () => {
    it('should create a user and return a response', async () => {
      // Mock the dependencies and input data
      const userData = { username: 'testuser', password: 'testpassword', email: 'testuser@example.com' };

      // Mock the authService.register method
      const mockRegister = jest.spyOn(authService, 'register');
      mockRegister.mockResolvedValueOnce({ email: 'testuser@example.com' });

      // Call the register method
      const result = await authController.register(userData);

      // Expectations
      expect(mockRegister).toHaveBeenCalledWith(userData);
      expect(result).toEqual({
        success: true,
        message: 'user registration successful',
        data: { user: { email: 'testuser@example.com' } },
      });
    });
  });
  describe('login', () => {
    it('should login a user and return a response', async () => {
      // Mock the dependencies and input data
      const userData = { password: 'testpassword', email: 'testuser@example.com' };

      // Mock the authService.register method
      const mockLogin = jest.spyOn(authService, 'login');
      mockLogin.mockResolvedValueOnce({
        token: 'loginToken',
        user: {

          "id": "647469a1d44c845ba9643745",
          "email": 'testuser@example.com',
          "username": 'testuser',

        }
      });

      // Call the login method
      const result = await authController.login(userData);

      // Expectations
      expect(mockLogin).toHaveBeenCalledWith(userData);
      expect(result).toEqual({
        success: true,
        message: 'login successful',
        data: {
          user: {
            email: 'testuser@example.com',
            "id": "647469a1d44c845ba9643745",
            "username": "testuser"
          }, token: 'loginToken'
        },
      });
    });
  });
});
