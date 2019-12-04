const parseKeys = (obj: object) =>
  Object.keys(obj).reduce((acc, curr) => {
    const key = curr;
    let val = obj[curr];

    if (typeof val === "object" && val !== null) {
      if (Array.isArray(val)) {
        return { ...acc, [key]: val };
      } else {
        const subtree = parseKeys(val);
        return { ...acc, [key]: subtree };
      }
    } else {
      if (val === "true") {
        val = true;
      }
      if (val === "false") {
        val = false;
      }
      if (val === "null") {
        val = null;
      }
      // if (val === 'undefined') val = undefined;
      if (!isNaN(parseFloat(val)) && val === parseFloat(val).toString()) {
        val = parseFloat(val);
      }
      return { ...acc, [curr[0]]: val };
    }
  }, {});

export = parseKeys;
