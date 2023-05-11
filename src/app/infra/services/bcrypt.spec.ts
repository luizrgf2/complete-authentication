import { Bcrypt } from './bcrypt';
import { Either } from '../../core/errors/either';
import { ErrorBase } from '../../core/errors/errorBase';

describe('Bcrypt tests', () => {
  const bcryptInstance = new Bcrypt();
  const passwordToTest = 'myPassword123';
  let hashedPassword: string = '';

  it('should hash the password and return a valid hash', async () => {
    const result = await bcryptInstance.hash(passwordToTest);

    expect(result.left).toBeUndefined();
    expect(result.right).toBeDefined();
    if (result.right) hashedPassword = result.right;
  });

  it('should compare the correct password to a valid hash and return true', async () => {
    const result = await bcryptInstance.compare(passwordToTest, hashedPassword);

    expect(result.left).toBeUndefined();
    expect(result.right).toBe(true);
  });



  // Add more tests to cover edge cases and error scenarios
});
