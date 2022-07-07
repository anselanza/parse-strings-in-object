const parseKeys = <T>(obj: object): T =>
  Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    const result = convert(value);

    return { ...acc, [key]: result };
  }, {}) as T;

const convert = (value: string | any[]): any => {

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
      if (
        !isNaN(parseFloat(value as string)) &&
        value === parseFloat(value as string).toString()
      ) {
        return parseFloat(value);
      } else {

       try {
        return JSON.parse(value as string);
       }catch(e) {
        // All else fails, just return the value as-is...
        // console.warn(`Failed to parse "${value}" (${e})`);
        return value;
       }

      }
  }

};

const convertArray = (a: any[]): any[] => a.map(el => convert(el));


  // s.split(token).map(element => element.trim());

export = parseKeys;
