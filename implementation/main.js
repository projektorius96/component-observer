import Observer from "../src/index.js";
import { ID, ATTRIBUTE } from './utils.js';
import { isObserved } from "./lifecycles/isObserved.js";

const
    { input_schema } = ID
    ,
    { min, max, value, step } = ATTRIBUTE
    ;
    
document.body.appendChild(
    Observer({
        id: input_schema
        ,
        observings: new Map([
            [ min , String(1) ],
            [ max , String(360) ],
            [ step , String(1) ],
            [ value , String(1) ],
        ])
        ,
        lifecycle: {
            isMounted: ()=> console.log('mounted')
            ,
            isObserved: isObserved.bind(null, {Observer, min, max, step, value})
            ,
            isDestroyed: ()=> console.log('destroyed')

        }
    })
);

/**
 * @debugger
 */
console.log(document.getElementById(input_schema));// # PASSING