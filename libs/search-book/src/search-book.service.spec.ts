import { Test, TestingModule } from '@nestjs/testing';
import { SearchBookService } from './search-book.service';

describe('SearchBookService', () => {
  let service: SearchBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchBookService],
    }).compile();

    service = module.get<SearchBookService>(SearchBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
