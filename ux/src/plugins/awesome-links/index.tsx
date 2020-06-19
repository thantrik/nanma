import { Register, getCtx } from "../../app";
import config from "./awesome-links.config";

if (getCtx().isExtension) Register(config);
