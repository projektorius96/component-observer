import { CONSTANTS, registerAttrs, registerGetterSetter, hasChanged, isFunction } from './utils/index.js';

export default function Component_Observer({id, observings, lifecycle = {}}) {

    /* static */ Component_Observer.hasChanged = hasChanged;

    const {
        isMounted = null, 
        isDestroyed = null, 
        isObserved = null
    } = lifecycle;

    const wc_namespace = Component_Observer.name.toLowerCase().replace(CONSTANTS.UNICODE.UNDERSCORE, CONSTANTS.UNICODE.HYPHEN);
    customElements.define(

        String(wc_namespace)
        , 
        class extends HTMLElement {

            static get observedAttributes() {

                return ([
                    ...registerAttrs(observings)
                ]);

            }
        
            constructor() {
                
                registerGetterSetter( super() ) ;
                this.id = id;

            }

            attributeChangedCallback(...params) {

                if (isFunction(isObserved)) isObserved(...params) ;

            }

            connectedCallback() {

                if ( isFunction(isMounted) ) isMounted() ;

            }

            disconnectedCallback() {

                if ( isFunction(isDestroyed) ) isDestroyed() ;

            }
    
        }
    );

    return (
        Reflect.construct( customElements.get( String( wc_namespace ) ) , [] )
    );

}