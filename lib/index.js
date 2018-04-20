const parseKeys = (obj) => 
    Object.entries(obj)
        .reduce( (acc, curr) => {
            let key = curr[0];
            let val = curr[1];

            if (typeof val === 'object' && val !== null) {
                if (Array.isArray(val)) {
                    return {...acc, [key]: val};
                } else {
                    let subtree = parseKeys(val);
                    return {...acc, [key]: subtree};
                }
            } else {
                if (val === 'true') val = true;
                if (val === 'false') val = false;
                if (
                        !isNaN(parseFloat(val))
                        && val === parseFloat(val).toString()
                    ) val = parseFloat(val);
                return {...acc, [curr[0]]: val };
            }


        }, {});

module.exports = function(obj) {

    let result = parseKeys(obj);
    
    return result;
}