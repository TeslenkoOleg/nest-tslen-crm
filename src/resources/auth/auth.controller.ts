import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SkipAuth } from './decorators/public.guard';
import { SignInResponseDto } from './dto/signIn.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
