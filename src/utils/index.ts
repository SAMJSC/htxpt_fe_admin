import moment from "moment";
import { EMPTY_DEFAULT_TEXT, FORMAT_BIRTH_PICKER, FORMAT_DATE_PICKER } from "src/constants/common";

export const formatDate = (date: moment.MomentInput | any, type = FORMAT_DATE_PICKER) => {
  return date ? moment(date).format(type) : EMPTY_DEFAULT_TEXT;
};

export const formatBirth = (date: moment.MomentInput | any, type = FORMAT_BIRTH_PICKER) => {
  return date ? moment(date).format(type) : EMPTY_DEFAULT_TEXT;
};