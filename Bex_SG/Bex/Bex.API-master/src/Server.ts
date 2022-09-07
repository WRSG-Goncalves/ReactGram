import {PlatformApplication, Configuration, Inject} from "@tsed/common";
import {GlobalAcceptMimesMiddleware} from "@tsed/platform-express";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from "cors";
import "@tsed/ajv";
import "@tsed/typeorm";
import typeormConfig from "./config/typeorm";
import * as jwt from 'jsonwebtoken'
import { AuthChecker } from './middlewares/AuthChecker'

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: true, // CHANGE
  typeorm: typeormConfig,
  graphql: {
    'server': {
      path: '/graphql',
      serverConfig: {
        context: ({ req }: any) => {
          if(req.headers.authorization){
            const user = jwt.verify(req.headers.authorization, 'shhhhh')
            return { user }
          }
        }
      },
      buildSchemaOptions: {
        authChecker: AuthChecker
      }
    }
  },
  componentsScan: [
    '${rootDir}/resolvers/**/*.ts',
    '${rootDir}/services/**/*.ts',
  ],
  exclude: [
    "**/*.spec.ts"
  ]
} as any)
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit() {
    this.app
      .use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }
}
