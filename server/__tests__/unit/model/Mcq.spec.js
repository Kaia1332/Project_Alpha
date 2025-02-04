const Mcq = require('../../../models/mcq');
const db = require('../../../db/connect');

describe('Mcq', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('getAll', () => {
    it('resolves with questions on successful db query', async () => {
      // Arrange
      const mockMcqs = [
        { question_id: 1, question: 'q1', option_a: 'A', option_b: 'B', option_c: 'C', option_d: 'D', correct_answer: 'A', difficulty_level: 'Easy', category: 'General' },
        { question_id: 2, question: 'q2', option_a: 'A', option_b: 'B', option_c: 'C', option_d: 'D', correct_answer: 'B', difficulty_level: 'Medium', category: 'Science' }
      ];
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockMcqs });

      // Act
      const mcqs = await Mcq.getAll();

      // Assert
      expect(mcqs).toHaveLength(2);
      expect(mcqs[0]).toHaveProperty('question_id');
      expect(mcqs[0].question).toBe('q1');
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM mcq;");
    });

    it('should throw an error when no questions are found', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      // Act & Assert
      await expect(Mcq.getAll()).rejects.toThrow('No questions available');
    });
  });

  describe('getOneById', () => {
    it('resolves with question on successful db query', async () => {
      // Arrange
      const testMcq = { question_id: 1, question: 'What is 2+2?', option_a: '1', option_b: '2', option_c: '3', option_d: '4', correct_answer: 'D', difficulty_level: 'Easy', category: 'Math' };
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testMcq] });

      // Act
      const result = await Mcq.getOneById(1);

      // Assert
      expect(result).toBeInstanceOf(Mcq);
      expect(result.question).toBe('What is 2+2?');
      expect(result.question_id).toBe(1);
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM mcq WHERE question_id = $1;', [1]);
    });

    it('should throw an error when question is not found', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      // Act & Assert
      await expect(Mcq.getOneById(999)).rejects.toThrow('Unable to locate question');
    });
  });
});
