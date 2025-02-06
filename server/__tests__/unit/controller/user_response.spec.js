const user_responseController = require('../../../controllers/user_response');
const UserResponse = require('../../../models/UserResponse');
 
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
 
const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}));
 
const mockRes = { status: mockStatus };
 
describe('User Response Controller', () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());
 
    describe('index', () => {
        it('should return all user responses', async () => {
            const testResponses = [
                { response_id: 1, user_id: 1, email: "user1@example.com", score: 10, incorrect_categories: ["Math"] },
                { response_id: 2, user_id: 2, email: "user2@example.com", score: 8, incorrect_categories: ["Science"] }
            ];
            jest.spyOn(UserResponse, 'getAll').mockResolvedValue(testResponses);
 
            await user_responseController.index(null, mockRes);
 
            expect(UserResponse.getAll).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testResponses);
        });
 
        it('should return an error upon failure', async () => {
            jest.spyOn(UserResponse, 'getAll').mockRejectedValue(new Error('Failed to retrieve responses'));
 
            await user_responseController.index(null, mockRes);
 
            expect(UserResponse.getAll).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to retrieve responses' });
        });
    });
 
    describe('show', () => {
        let testResponse, mockReq;
 
        beforeEach(() => {
            testResponse = { response_id: 1, user_id: 1, score: 10, incorrect_categories: ["Math"] };
            mockReq = { params: { id: 1 } };
            jest.clearAllMocks();
        });
 
        it('should return a user response with a 200 status code', async () => {
            jest.spyOn(UserResponse, 'getOneById').mockResolvedValue(new UserResponse(testResponse));
 
            await user_responseController.show(mockReq, mockRes);
 
            expect(UserResponse.getOneById).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new UserResponse(testResponse));
        });
 
        it('should return an error if the user response is not found', async () => {
            jest.spyOn(UserResponse, 'getOneById').mockRejectedValue(new Error('User response not found'));
 
            await user_responseController.show(mockReq, mockRes);
 
            expect(UserResponse.getOneById).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: 'User response not found' });
        });
    });
 
    describe('create', () => {
        it('should return a new user response with a 201 status code', async () => {
            let testResponse = { user_id: 1, score: 10, incorrect_categories: ["Math"] };
            const mockReq = { body: testResponse };
 
            jest.spyOn(UserResponse, 'create').mockResolvedValue(new UserResponse(testResponse));
 
            await user_responseController.create(mockReq, mockRes);
 
            expect(UserResponse.create).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new UserResponse(testResponse));
        });
 
        it('should return an error if creation fails', async () => {
            let testResponse = { user_id: 1, score: 10 };
            const mockReq = { body: testResponse };
 
            jest.spyOn(UserResponse, 'create').mockRejectedValue(new Error('Failed to create user response'));
 
            await user_responseController.create(mockReq, mockRes);
 
            expect(UserResponse.create).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to create user response' });
        });
    });
});