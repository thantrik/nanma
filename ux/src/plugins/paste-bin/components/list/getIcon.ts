import { DocumentType, Flag } from "../../paste-bin.types";

import IconBug from "../../../../assets/bug.png";
import IconButterFly from "../../../../assets/butterfly.png";
import IconContact from "../../../../assets/contact.png";
import IconDiamond from "../../../../assets/diamond.png";
import IconDocument from "../../../../assets/document.png";
import IconFavorite from "../../../../assets/star.png";
import IconFolder from "../../../../assets/folder.png";
import IconImportant from "../../../../assets/important.png";
import IconLightning from "../../../../assets/lightning.png";
import IconPin from "../../../../assets/pin.png";
import IconPinkFile from "../../../../assets/pink_file.png";
import IconRecycleBin from "../../../../assets/recycle_bin.png";
import IconSchedule from "../../../../assets/schedule.png";
import IconSettings from "../../../../assets/settings.png";
import IconStar from "../../../../assets/star.png";
import IconSuper from "../../../../assets/super.png";
import IconTask from "../../../../assets/task.png";

// import IconOpenFolder from "../../../../assets/opened_folder_48.png";
//import IconFile from "../../../../assets/document.png";

// const icons = {
//   default = "default",
// star = "star",
// super = "super",
// lightning = "lightning",
// butterfly = "butterfly",
// schedule = "schedule",
// task = "task",
// bug = "bug",
// contact = "contact",
// pin = "pin",
// pink = "pink",
// favorite = "favorite",
// recycleBin = "recycle bin",
// settings = "settings",
// }

export const getIcon = (
  type: DocumentType | Flag | string,
  tags?: string[]
): string => {
  switch (type) {
    case DocumentType.folder:
      return IconFolder;
    case Flag.bug:
      return IconBug;
    case Flag.butterfly:
      return IconButterFly;
    case Flag.favorite:
      return IconFavorite;
    case Flag.star:
      return IconStar;
    case Flag.super:
      return IconSuper;
    case Flag.lightning:
      return IconLightning;
    case Flag.schedule:
      return IconSchedule;
    case Flag.task:
      return IconTask;
    case Flag.contact:
      return IconContact;
    case Flag.pin:
      return IconPin;
    case Flag.pink:
      return IconPinkFile;
    case Flag.recycleBin:
      return IconRecycleBin;
    case Flag.settings:
      return IconSettings;
    case Flag.diamond:
      return IconDiamond;
    case Flag.important:
      return IconImportant;
    case Flag.default:
    default:
      return IconDocument;
  }
};
