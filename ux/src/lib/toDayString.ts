import moment from "moment";

export const toDayString = () => moment().format("MMMM DoYYYY, h:mm:ss a");
