import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  console.log(data);
  const req = ctx.switchToHttp().getRequest();

  const user = req.user;
  if (!user) throw new InternalServerErrorException('User not found (request)');

  if (!data) return user;

  const returnData = user[data] || undefined;
  if (!returnData)
    throw new InternalServerErrorException(
      'Not found property in User(request)',
    );
  return returnData;
});
