const UserResponse = require('../../../models/UserResponse');
const db = require('../../../db/connect');
const { query } = require('express');

describe('user_response',()=>{
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());


    describe('getOneById',()=>{
        it('resolves with user score on successful db query',async ()=>{
            const testUserResponse = {response_id:1,user_id:1,score:1}
            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [testUserResponse]})

            const result = await UserResponse.getOneById(1)

            expect(result).toBeInstanceOf(UserResponse);
            expect(result.response_id).toBe(1)
            expect(result.user_id).toBe(1);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM user_responses WHERE user_id = $1", [1])
        })
        it('should throw an Error when a User is not found', async ()=>{
            jest.spyOn(db,'query').mockResolvedValueOnce({rows:[]})
            await expect(UserResponse.getOneById(999)).rejects.toThrow("Unable to locate user.")
        })
    })

    describe('create', () => {
        it('resolves with an entry into user_responses db', async () => {
            const userData = { user_id: 1, score: 9 };
    
            // Mock the DB query to return the inserted row
            jest.spyOn(db, 'query').mockResolvedValueOnce({ 
                rows: [{ response_id: 1, user_id: 1, score: 9 }] 
            });
    
            const result = await UserResponse.create(userData);
    
            expect(result).toBeInstanceOf(UserResponse); 
            expect(result).toHaveProperty('response_id', 1);
            expect(result).toHaveProperty('score', 9);
        });
    });

    describe('getAll', () => {
        it('resolves with all user responses and associated emails', async () => {
            const testUserResponses = [
                { response_id: 1, user_id: 1, score: 9, incorrect_categories: ['category1'], email: 'user1@example.com' },
                { response_id: 2, user_id: 2, score: 7, incorrect_categories: ['category2'], email: 'user2@example.com' },
            ];
 
            // Mock the DB query to return multiple user responses
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: testUserResponses });
 
            const result = await UserResponse.getAll();
 
            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('score', 9);
            expect(result[0]).toHaveProperty('email', 'user1@example.com');
        });
 
        it('should throw an error if the query fails', async () => {
            // Mock the DB query to simulate an error
            jest.spyOn(db, 'query').mockRejectedValueOnce(new Error('Database query error'));
 
            await expect(UserResponse.getAll()).rejects.toThrow('Database query error');
        });
    });
    
})