import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export function getWeekdayNameUS(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function getFormattedDate(time) {
  return format(parseISO(time), "eeee dd/MM/yyyy", { locale: enUS });
}
