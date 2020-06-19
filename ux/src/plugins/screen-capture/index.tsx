import { Register, context } from "../../app";
import config from "./screen-capture.config";

if (context.isExtension) Register(config);
