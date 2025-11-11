/**
 * @example
 * 
 * ENUM.give;  //  'give'
 * ENUM.me;    //  'me'
 * ENUM.value; //  'value'
*/
export const 
    ENUM = 
    new Proxy( Object.create(null) , {
        get(nil, key){
            return (
                key = `${key}`
            );
        }
    })
    ;

/**
    * @alias
*/
export const
    [ ID, ATTRIBUTE, CASE ] = Array(3).fill(ENUM);
    ;