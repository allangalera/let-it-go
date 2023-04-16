import { format, isBefore, parse } from "date-fns";

export const showDate = (dateStr: string) => {
  const date = parse(dateStr, "dd/MM/yyyy", new Date());
  const now = new Date();

  if (isBefore(date, now)) {
    return "Imediata";
  }

  return `a partir de ${format(date, "dd/MM/yyyy")}`;
};
