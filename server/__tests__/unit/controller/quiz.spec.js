const quizController = require('../../../controllers/quiz')
const mcq = require('../../../models/mcq')
 
const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
 
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}));
 
const mockRes = { status: mockStatus };
 
describe('Quiz Controller',()=>{
    beforeEach(()=>jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())
 
    describe('index',()=>{
        it('should return all mcqs',async ()=>{
            const testUser = ['u1','u2']
            jest.spyOn(mcq, 'getAll').mockResolvedValue(testUser)
 
            await quizController.index(null, mockRes)
 
            expect(mcq.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testUser)
        })
        it('should return an error upon failure', async () => {
            jest.spyOn(mcq, 'getAll').mockRejectedValue(new Error('No questions available'))
     
            await quizController.index(null, mockRes)
           
            expect(mcq.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({ error: 'No questions available' })
          })
    })
 
    describe('show', () => {
        let testMcq, mockReq;
     
        beforeEach(() => {
          testMcq = { question_id: 1, question: 'Sample Question?', option_a: 'A', option_b: 'B', option_c: 'C', option_d: 'D', correct_answer: 'A', difficulty_level: 'Easy', category: 'General' };
          mockReq = { params: { id: 1 } };
          jest.clearAllMocks();
        });
     
        it('should return an MCQ with a 200 status code', async () => {
          jest.spyOn(mcq, 'getOneById').mockResolvedValue(new mcq(testMcq));
     
          await quizController.show(mockReq, mockRes);
     
          expect(mcq.getOneById).toHaveBeenCalledTimes(1);
          expect(mockStatus).toHaveBeenCalledWith(200);
          expect(mockJson).toHaveBeenCalledWith(new mcq(testMcq));
        });
     
        it('should return an error if the MCQ is not found', async () => {
          jest.spyOn(mcq, 'getOneById').mockRejectedValue(new Error('MCQ not found'));
     
          await quizController.show(mockReq, mockRes);
     
          expect(mcq.getOneById).toHaveBeenCalledTimes(1);
          expect(mockStatus).toHaveBeenCalledWith(404);
          expect(mockJson).toHaveBeenCalledWith({ error: 'MCQ not found' });
        });
      });      
})