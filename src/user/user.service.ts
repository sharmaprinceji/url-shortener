import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(name:string,email: string, password: string, confpassword: string) {
    const exists = await this.userModel.findOne({ email });
    if (exists) throw new ConflictException('User already exists');

    if (password !== confpassword) {
      throw new ConflictException('Passwords do not match');
    }

    const hashed = await bcrypt.hash(password,10);
    const user = new this.userModel({name, email, password: hashed });
    await user.save();

    const token = this.jwtService.sign({name, email, sub: user._id });
    return { access_token: token };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ email, sub: user._id });
    return { access_token: token };
  }
}
