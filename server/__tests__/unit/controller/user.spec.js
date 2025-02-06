const userController = require('../../../controllers/user');
const User = require('../../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
 
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
 
const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));
 
const mockRes = { status: mockStatus };
 
describe('User Controller', () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());
 
  describe('register', () => {
    it('should successfully register a new user', async () => {
        const mockReq = { body: { email: 'test@example.com', password: 'password123', user_type: 'regular' } };
        const hashedPassword = "hashedPassword123";
        const mockUser = { user_id: 1, email: mockReq.body.email, user_type: mockReq.body.user_type };
     
        bcrypt.genSalt.mockResolvedValue(10);
        bcrypt.hash.mockResolvedValue(hashedPassword);
        jest.spyOn(User, 'create').mockResolvedValue(mockUser);
     
        await userController.register(mockReq, mockRes);
     
        expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
        // expect(bcrypt.hash).toHaveBeenCalledWith(mockReq.body.password, 10);
        expect(User.create).toHaveBeenCalledWith({ ...mockReq.body, password: hashedPassword });  
        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockSend).toHaveBeenCalledWith({ ...mockReq.body, password: hashedPassword });
      });
     
     
 
    it('should return an error if registration fails', async () => {
      const mockReq = { body: { email: 'test@example.com', password: 'password123', user_type: 'regular' } };
 
      bcrypt.genSalt.mockResolvedValue(10);
      bcrypt.hash.mockResolvedValue('hashedPassword123');
      jest.spyOn(User, 'create').mockRejectedValue(new Error('User registration failed'));
 
      await userController.register(mockReq, mockRes);
 
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'User registration failed' });
    });
  });
 
  describe('login', () => {
    it('should successfully log in a user', async () => {
      const mockReq = { body: { email: 'test@example.com', password: 'password123' } };
      const mockUser = { user_id: 1, email: 'test@example.com', password: 'hashedPassword123' };
      const token = 'mockedJwtToken';
 
      jest.spyOn(User, 'getOneByEmail').mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockImplementation((payload, secret, options, callback) => callback(null, token));
 
      await userController.login(mockReq, mockRes);
 
      expect(User.getOneByEmail).toHaveBeenCalledWith(mockReq.body.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockReq.body.password, mockUser.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { user_id: mockUser.user_id, email: mockUser.email },
        process.env.SECRET_TOKEN,
        { expiresIn: 3600 },
        expect.any(Function)
      );
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        token,
        user_id: mockUser.user_id,
        email: mockUser.email,
      });
    });
 
    it('should return an error if the email does not exist', async () => {
      const mockReq = { body: { email: 'test@example.com', password: 'password123' } };
 
      jest.spyOn(User, 'getOneByEmail').mockResolvedValue(null);
 
      await userController.login(mockReq, mockRes);
 
      expect(User.getOneByEmail).toHaveBeenCalledWith(mockReq.body.email);
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: 'No account with this email' });
    });
 
    it('should return an error if the password is incorrect', async () => {
      const mockReq = { body: { email: 'test@example.com', password: 'wrongPassword' } };
      const mockUser = { user_id: 1, email: 'test@example.com', password: 'hashedPassword123' };
 
      jest.spyOn(User, 'getOneByEmail').mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);
 
      await userController.login(mockReq, mockRes);
 
      expect(User.getOneByEmail).toHaveBeenCalledWith(mockReq.body.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockReq.body.password, mockUser.password);
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: 'User could not be authenticated' });
    });
 
    it('should return an error if JWT token generation fails', async () => {
      const mockReq = { body: { email: 'test@example.com', password: 'password123' } };
      const mockUser = { user_id: 1, email: 'test@example.com', password: 'hashedPassword123' };
 
      jest.spyOn(User, 'getOneByEmail').mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockImplementation((payload, secret, options, callback) => callback(new Error('JWT error'), null));
 
      await userController.login(mockReq, mockRes);
 
      expect(User.getOneByEmail).toHaveBeenCalledWith(mockReq.body.email);
      expect(jwt.sign).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Error in token generation' });
    });
  });
});