const parseKeys = (obj) => 
    Object.entries(obj).map( entry => {
        let key = entry[0];
        let val = entry[1];
        if (val === 'true') val = true;
        if (val === 'false') val = false;
        if (
            !isNaN(parseFloat(val))
            && val === parseFloat(val).toString()
        ) val = parseFloat(val)
     return [key, val]
    }).reduce( (acc, curr) => 
       ({...acc, [curr[0]]: curr[1] })
    , {});

module.exports = function(obj) {

    let result = parseKeys(obj);
    
    return result;
}