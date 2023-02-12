import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { json, urlencoded } from 'express'
import { AllExceptionsFilter } from '@/support/http-exception.filter'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const port = process.env.NEST_LISTEN_PORT || '3030'
  const logger = new Logger('AppModule')

  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')

  logger.log(
    '\n--------------------------------------------------------------------------------' +
      '\nBACKEND SERVER IS RUNNING AT http://localhost:' +
      port +
      '\nTIMEZONE is Viet Nam, current Time is ' +
      new Date().toLocaleString() +
      '\n--------------------------------------------------------------------------------'
  )

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next()
  })

  app.enableCors({
    // allowedHeaders: "*",
    origin: true,
    credentials: true
  })

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ limit: '50mb' }))
  app.use(cookieParser())
  await app.listen(Number.parseInt(port))
}
bootstrap()
