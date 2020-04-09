const db =require('../db_queries');

describe('Member Query Tests', () => {
  xit('Test Get Member', async () =>{
    const member = await db.getMember('X4KX5r1rSlQoFQu1RBsCYV8Cv4m2')
    expect (typeof member).toBe("object")
  })
  xit('Test Get All Members returns object', async () =>{
    const member = await db.getAllMembers()
    expect (typeof member).toBe("object")
  })

  xit('Test Get All Members', async () =>{
    const member = await db.getAllMembers()
    console.log(member.length)
    console.log(member[0])
    expect (typeof member[0]).toBe("object")
  })

  xit('Test Get Member Degrees', async () => {
    const degrees = await db.findMemberDegreeswWithUid('X4KX5r1rSlQoFQu1RBsCYV8Cv4m2')
    expect(typeof degrees).toBe("object")
    const expected = [];
    expect(degrees).toStrictEqual(expected)
  })
})
