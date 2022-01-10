import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { OrdersService } from '../services/orders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.orderService.ordersByCustomer(user.sub);
  }
}
