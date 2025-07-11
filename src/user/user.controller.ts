import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto, LoginDto } from './dto/auth.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('signup')
  @ApiBody({ type: SignupDto })
  signup(@Body() dto: SignupDto) {
    return this.UserService.signup(dto.name,dto.email,dto.password, dto.confpassword);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.UserService.login(dto.email, dto.password);
  }
}
