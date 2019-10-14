import { Module } from '@nestjs/common';
import { SearchBookService } from './search-book.service';

@Module({
  providers: [SearchBookService],
  exports: [SearchBookService],
})
export class SearchBookModule {}
