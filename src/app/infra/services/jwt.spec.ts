import { JWT } from './jwt';
import { Either } from '../../core/errors/either';
import { ErrorBase } from '../../core/errors/errorBase';

describe('JWT tests', () => {
    const secretKey = 'mySecretKey';
    const jwtInstance = new JWT();
    let tokenTotest = ""


    it('should encode data and return a valid JWT token', () => {
        const dataToEncode = { userId: '123', role: 'admin' };
        const tokenDurationInMilliseconds = 3600000; // 1 hour

        const result = jwtInstance.encode(dataToEncode, tokenDurationInMilliseconds);

        expect(result.left).toBeUndefined();
        expect(result.right).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/); // JWT token format
        if(result.left) return
        tokenTotest = result.right
    });

    it('should decode a valid JWT token and return the decoded data', () => {

        const result = jwtInstance.decode(tokenTotest);

        expect(result.left).toBeUndefined();
        expect({...result.right,exp:undefined,iat:undefined}).toEqual({ userId: '123', role: 'admin' });
    });

    it('should return an error when decoding an invalid JWT token', () => {
        const invalidToken = 'invalid-jwt-token';

        const result = jwtInstance.decode(invalidToken);

        expect(result.left).toBeInstanceOf(ErrorBase);
        expect(result.left?.message).toBe('jwt malformed');
        expect(result.right).toBeUndefined();
    });

});
