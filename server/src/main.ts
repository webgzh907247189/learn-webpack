import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const swig = require('swig')
const path = require('path')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(path.resolve(__dirname,'../public'))
  app.setBaseViewsDir(path.resolve(__dirname,'../views'))

  console.log(path.resolve(__dirname,'../public'),'1111111111')
  console.log(path.join(__dirname,'../views'),'44444444444')
  app.engine('html',swig.renderFile)
  app.setViewEngine('html')

  await app.listen(3000);
}
bootstrap();
