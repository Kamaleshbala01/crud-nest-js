import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
declare const module:any
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  await app.listen(3001).then(()=>{
    console.log("SERVER running in http://localhost:3001");
  }).catch((error)=>{
    console.log(error.message);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
