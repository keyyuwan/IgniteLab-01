import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // exporta o prisma pra qualquer lugar da app
})
export class DatabaseModule {}
