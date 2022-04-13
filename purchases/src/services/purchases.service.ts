import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!productExists) {
      throw new Error('Product not found');
    }

    const purchaseCreated = await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });

    return purchaseCreated;
  }
}
