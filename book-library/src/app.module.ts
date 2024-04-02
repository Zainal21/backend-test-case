import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './shared/services/database-connection.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { BorrowedItemsModule } from './borrowed-items/borrowed-items.module';
import { EntityManager } from 'typeorm';
import { DbValidatorsModule } from '@youba/nestjs-dbvalidator';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    DbValidatorsModule.register({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    BooksModule,
    MembersModule,
    BorrowedItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EntityManager],
})
export class AppModule {}
