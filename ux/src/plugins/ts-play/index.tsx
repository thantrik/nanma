import { Register, context } from "../../app";
import config from "./ts-play.config";

if (context.isExtension) Register(config);
