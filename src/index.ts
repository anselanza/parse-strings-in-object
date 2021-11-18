const parseKeys = <T>(obj: object): T =>
  Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    const result = convert(value);

    return { ...acc, [key]: result };
  }, {}) as T;

const convert = (value: string | any[]): any => {
  let result: any = value;

  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      return convertArray(value);
    } else {
      return parseKeys(value);
    }
  }

  switch(value) {
    case "true":
      return true;
    case "false":
      return false;
    case "null":
      return null;
    case "undefined":
      return undefined;
    default:
      // other cases
      if (isNumber(value)) {
        return parseFloat(value as string);
      } else {

        if (isArrayLikeString(value) === true) {
          return convertArray(arrayLikeStringToArray(value as string));
        } else {
          // All else fails, return value as is...
          return value;
        }

      }
  }

  return result;
};

const isNumber = (value: any = ''): boolean => {
  const val = '' + value;
  return !isNaN(parseFloat(val)) && val === ((val.startsWith('+') ? '+' : '') + parseFloat(val).toString());
};

const convertArray = (a: any[]): any[] => a.map(el => convert(el));

const isArrayLikeString = (s: any): boolean => {
  if (typeof s === "string") {
    const commaSeparated = s.split(",");
    if (commaSeparated.length > 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  } 
}

const arrayLikeStringToArray = (s: string, token: string = ",") => 
  s.split(token).map(element => element.trim()).filter(element => element !== "" && element !== null);

export = parseKeys;
