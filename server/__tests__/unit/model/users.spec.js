const Users = require('../../../models/User');
const db = require('../../../db/connect');

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
    })
})