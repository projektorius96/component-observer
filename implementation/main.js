import Observer from "../src/index.js";
import { ATTRIBUTE } from './utils.js';

const { min, max, value, step } = ATTRIBUTE;
document.body.appendChild(
    Observer({
        id: 'input-schema'
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
            isObserved
            ,
            isDestroyed: ()=> console.log('destroyed')

        }
    })
);

function isObserved(attribute, oldValue, newValue) {

    switch (attribute) {

        case value : {
            console.log(`Upgrading ${attribute} to ${newValue}`)
            break;
        }
        case min : {
            if (Observer.hasChanged(oldValue, newValue)) {
                console.log(`Upgrading ${attribute} to ${newValue}`)
            }
            break;
        }
        case max : {            
            if (Observer.hasChanged(oldValue, newValue)) {
                console.log(`Upgrading ${attribute} to ${newValue}`)
            }
            break;
        }
        case step : {
            if (Observer.hasChanged(oldValue, newValue)) {
                console.log(`Upgrading ${attribute} to ${newValue}`)
            }
            break;
        }

    }
    
}