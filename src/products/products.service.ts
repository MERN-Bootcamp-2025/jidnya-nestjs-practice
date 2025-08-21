import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  //post
  create(dto: CreateProductDto) {
    const product = this.repo.create(dto);
    return this.repo.save(product);
  }

  //getall
  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  //get by id
  async findOne(id: string) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  //put
  async update(id: string, dto: UpdateProductDto) {
    const pre = await this.findOne(id);
    Object.assign(pre, dto);
    return this.repo.save(pre);
  }

  //delete
  async remove(id: string) {
    const pre = await this.findOne(id);
    await this.repo.remove(pre);
    return { deleted: true };
  }
}
