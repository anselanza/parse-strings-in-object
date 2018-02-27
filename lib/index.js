const parseKeys = (obj) => 
// let key = entry[0];
// let val = entry[1];



// if (val === 'true') val = true;
// if (val === 'false') val = false;
// if (
    //     !isNaN(parseFloat(val))
    //     && val === parseFloat(val).toString()
    // ) val = parseFloat(val)
    // return [key, val]
    Object.entries(obj)
        .reduce( (acc, curr) => {
            let val = curr[1];
            if (val === 'true') val = true;
            if (val === 'false') val = false;
            if (
                    !isNaN(parseFloat(val))
                    && val === parseFloat(val).toString()
                ) val = parseFloat(val)
            return {...acc, [curr[0]]: val }

        }
        , {});

module.exports = function(obj) {

    let result = parseKeys(obj);
    
    return result;
}