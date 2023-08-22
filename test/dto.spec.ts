import * as ClassTransformer from 'class-transformer';
import * as ClassValidator from 'class-validator';
import { Dto } from '../src/dto';

describe('Dto', () => {
  let service: Dto;

  beforeEach(() => {
    jest.restoreAllMocks();

    service = new Dto();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    beforeEach(() => {
      jest
        .spyOn(ClassValidator, 'validateOrReject')
        .mockResolvedValue(undefined);
    });

    it('should validate against the current DTO', async () => {
      // Given
      const expectedOptions = {
        whitelist: true,
        forbidNonWhitelisted: true,
      };

      // When
      await service.validate();

      // Then
      expect(ClassValidator.validateOrReject).toHaveBeenCalledTimes(1);
      expect(ClassValidator.validateOrReject).toHaveBeenCalledWith(
        service,
        expectedOptions,
      );
    });

    it('should throw an error if the validation fails', async () => {
      // Given
      const error = new Error('Validation error');
      jest
        .spyOn(ClassValidator, 'validateOrReject')
        .mockRejectedValueOnce(error);

      // When
      const result = service.validate();

      // Then
      await expect(result).rejects.toThrowError(error);
    });
  });

  describe('toPlainObject', () => {
    /**
     * Jest doesn't allow us to mock the return type of spied instanceToPlain method
     * so we have to use any here because it guess the type wrong.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plainObjectMock = { foo: 'bar' } as any;

    beforeEach(() => {
      jest
        .spyOn(ClassTransformer, 'instanceToPlain')
        .mockReturnValue(plainObjectMock);
    });

    it('should return the plain object representation of the current DTO', () => {
      // When
      const result = service.toPlainObject();

      // Then
      expect(ClassTransformer.instanceToPlain).toHaveBeenCalledTimes(1);
      expect(ClassTransformer.instanceToPlain).toHaveBeenCalledWith(service);
      expect(result).toEqual(plainObjectMock);
    });
  });
});
