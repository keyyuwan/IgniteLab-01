import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchase';

@ObjectType('User')
// chave em comum entre as entidades de Customer e Student, que são a mesma coisa pro Front
@Directive('@key(fields: "authUserId")')
export class Customer {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
