import { Register, context } from "../../app";
import config from "./dashboard.config";

if (context.isExtension) Register(config);
