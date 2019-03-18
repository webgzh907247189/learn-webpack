import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const swig = require('swig')
const path = require('path')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useStaticAssets(path.resolve(__dirname,'../public'))
  app.setBaseViewsDir(path.resolve(__dirname,'../views'))
  app.engine('html',swig.renderFile)
  app.setViewEngine('html')

  await app.listen(3000);
}
bootstrap();
