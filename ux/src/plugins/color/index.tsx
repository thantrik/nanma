import { Register, context } from "../../app";
import config from "./color.config";

if (context.isExtension) Register(config);
