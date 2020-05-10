import { Register } from "../../app";
import json from"./vscode.reducer";
import route from"./vscode.routes";

const config = {
  name: "vscode",
  route,
  reducer: json,
};

Register(config);
