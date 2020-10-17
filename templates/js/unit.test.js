const add = require('../')

describe('add', () => {
  it('compute the sum of two numbers', () => {
    expect(add(2, 3)).toBe(5)
  })
})
