import { parse } from "@babel/parser";

const parseKeys = (obj: object): object =>
  Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    const result = convert(value);

    return { ...acc, [key]: result };
  }, {});

const convert = (value: string | any[]): any => {
  let result: any = value;

  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      return convertArray(value);
    } else {
      return parseKeys(value);
    }
  }

  if (value === "true") {
    result = true;
  }
  if (value === "false") {
    result = false;
  }
  if (value === "null") {
    result = null;
  }
  if (value === "undefined") {
    result = undefined;
  }
  if (
    !isNaN(parseFloat(value as string)) &&
    value === parseFloat(value as string).toString()
  ) {
    result = parseFloat(value);
  }

  return result;
};

const convertArray = (a: any[]): any[] => a.map(el => convert(el));

export = parseKeys;
