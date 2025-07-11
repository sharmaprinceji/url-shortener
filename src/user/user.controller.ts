import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto, LoginDto } from './dto/auth.dto';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists or passwords don\'t match' })
  signup(@Body() dto: SignupDto) {
    return this.UserService.signup(dto.name, dto.email, dto.password, dto.confpassword);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login existing user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful and token returned' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() dto: LoginDto) {
    return this.UserService.login(dto.email, dto.password);
  }
}
