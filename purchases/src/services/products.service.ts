import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const slugAlreadyExists = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (slugAlreadyExists) {
      throw new Error('Another product with the same slug already exists');
    }

    const productCreated = await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });

    return productCreated;
  }
}
