import { ValidationError } from 'class-validator';
import { Parent, RefParent } from '../../src/utils/validate-if-parent';

describe('validateIfParent', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('RefParent', () => {
    beforeEach(() => {
      jest.spyOn(Reflect, 'defineMetadata').mockImplementation();
      jest.spyOn(Object, 'defineProperty');
    });

    it('should define getter and setter on the target', () => {
      // Given
      const objectMock = {
        hello: 'world',
      };
      const decorator = RefParent();

      // When
      decorator(objectMock, 'hello');

      // Then
      expect(Object.defineProperty).toHaveBeenCalledTimes(1);
      expect(Object.defineProperty).toHaveBeenCalledWith(objectMock, 'hello', {
        get: expect.any(Function),
        set: expect.any(Function),
        enumerable: true,
        configurable: true,
      });
    });

    it('should call defineMetadata on the setter', () => {
      // Given
      const objectMock = {
        hello: 'world',
      };
      const decorator = RefParent();
      decorator(objectMock, 'hello');

      // When
      objectMock.hello = 'foo';

      // Then
      expect(Reflect.defineMetadata).toHaveBeenCalledTimes(1);
      expect(Reflect.defineMetadata).toHaveBeenCalledWith(
        '__parent',
        objectMock,
        objectMock.hello,
      );
    });
  });

  describe('Parent', () => {
    const parentMock = {
      foo: 'bar',
    };

    beforeEach(() => {
      jest.spyOn(Reflect, 'getMetadata').mockReturnValue(parentMock);
    });

    it('should get the parent from the metadata', () => {
      // Given
      const objectMock = {
        hello: 'world',
      };
      const value = {};

      // When
      Parent(() => true)(objectMock, value);

      // Then
      expect(Reflect.getMetadata).toHaveBeenCalledTimes(1);
      expect(Reflect.getMetadata).toHaveBeenCalledWith('__parent', objectMock);
    });

    it('should return true if the parent is defined', () => {
      // Given
      const objectMock = {
        hello: 'world',
      };
      const value = {};

      // When
      const result = Parent(() => true)(objectMock, value);

      // Then
      expect(result).toEqual(true);
    });

    it('should throw an error if the parent is not defined', () => {
      // Given
      jest.mocked(Reflect.getMetadata).mockReturnValue(undefined);
      const objectMock = {
        hello: 'world',
      };
      const value = {};
      const expectedValidationError = new ValidationError();
      expectedValidationError.constraints = objectMock;

      // When
      const result = () => Parent(() => true)(objectMock, value);

      // Then
      expect(result).toThrow(ValidationError);
    });
  });
});
