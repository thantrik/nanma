import config from "./diff.config";
import { Register, context } from "../../app";

if (context.isExtension) Register(config);
