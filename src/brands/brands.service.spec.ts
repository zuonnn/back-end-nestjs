import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Brand } from '@prisma/client';
describe('BrandsService', () => {
  let service: BrandsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: PrismaService,
          useValue: {
            brand: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBrands', () => {
    it('should return an array of brands', async () => {
      const brands: Brand[] = [
        { id: 1, name: 'Brand 1', description: 'Description 1', country: 'Country 1' },
        { id: 2, name: 'Brand 2', description: 'Description 2', country: 'Country 2' }
      ];
      jest.spyOn(prismaService.brand, 'findMany').mockResolvedValue(brands);  

      const result = await service.getBrands();

      expect(result).toEqual(brands);
      expect(prismaService.brand.findMany).toHaveBeenCalled();
    });
  });

  describe('createBrand', () => {
    it('should create a new brand', async () => {
      const createBrandDto: CreateBrandDto = {
        name: 'New Brand',
        description: '',
        country: ''
      };
      const createdBrand: Brand = {
        id: 1, name: 'New Brand',
        description: '',
        country: ''
      };
      jest.spyOn(prismaService.brand, 'create').mockResolvedValue(createdBrand);

      const result = await service.createBrand(createBrandDto);

      expect(result).toEqual(createdBrand);
      expect(prismaService.brand.create).toHaveBeenCalledWith({ data: createBrandDto });
    });
  });
});
