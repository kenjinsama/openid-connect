import * as ClassTransformer from 'class-transformer';
import * as ClassValidator from 'class-validator';
import { Dto } from '../../../src/utils/dto';
import { validationErrorMock } from '../provider/config/config.service.mock';

describe('Dto', () => {
  let service: Dto;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();

    service = new Dto();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    beforeEach(() => {
      jest.spyOn(ClassValidator, 'validate').mockResolvedValue([]);
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
      expect(ClassValidator.validate).toHaveBeenCalledTimes(1);
      expect(ClassValidator.validate).toHaveBeenCalledWith(
        service,
        expectedOptions,
      );
    });

    it('should return the validation errors if the validation fails', async () => {
      // Given
      jest
        .spyOn(ClassValidator, 'validate')
        .mockResolvedValueOnce(validationErrorMock);

      // When
      const result = await service.validate();

      // Then
      expect(result).toEqual(validationErrorMock);
    });

    it('should throw an error if the validation fails', async () => {
      // Given
      const error = new Error('Validation error');
      jest.spyOn(ClassValidator, 'validate').mockRejectedValueOnce(error);

      // When
      const result = service.validate();

      // Then
      await expect(result).rejects.toThrowError(error);
    });

    it('should override the validation options if they are passed as argument', async () => {
      // Given
      const expectedOptions = {
        whitelist: false,
        forbidNonWhitelisted: false,
      };

      // When
      await service.validate(expectedOptions);

      // Then
      expect(ClassValidator.validate).toHaveBeenCalledTimes(1);
      expect(ClassValidator.validate).toHaveBeenCalledWith(
        service,
        expectedOptions,
      );
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
