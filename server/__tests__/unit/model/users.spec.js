const Users = require('../../../models/User');
const db = require('../../../db/connect');
const { query } = require('express');

describe('Users',()=>{
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe('getOneById',()=>{
        it('resolves with user on successful db query',async ()=>{
            const testUser = {user_id:1,email:'user@hotmail.com',password:1234,user_type:'Teacher'}
            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [testUser]})

            const result = await Users.getOneById(1)

            expect(result).toBeInstanceOf(Users);
            expect(result.email).toBe('user@hotmail.com')
            expect(result.user_id).toBe(1);
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE user_id = $1;', [1])
        })
        it('should throw an Error when a User is not found', async ()=>{
            jest.spyOn(db,'query').mockResolvedValueOnce({rows:[]})
            await expect(Users.getOneById(999)).rejects.toThrow("Unable to locate user.")
        })
    })

    describe('create', () => {
        it('resolves with an entry into users db', async () => {
            const userData = { email: 'user@user.com', password: '1234', user_type: 'Admin' };
    
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ user_id: 1 }] });
    
            const mockUser = new Users({ ...userData, user_id: 1 });
            jest.spyOn(Users, 'getOneById').mockResolvedValueOnce(mockUser);
    
            const result = await Users.create(userData);
    
            expect(result).toBeInstanceOf(Users); 
            expect(result).toHaveProperty('user_id', 1);
            expect(result).toHaveProperty('email', 'user@user.com');
        });
    });
    
    
})