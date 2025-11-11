import { UNICODE, registerAttrs, registerGetterSetter, hasChanged, isFunction } from './utils/index.js';

export default function GLOBAL_DB({id, observings, lifecycle = {}}) {

    const {
        isMounted = null, 
        isDestroyed = null, 
        isObserved = null
    } = lifecycle;

    const wc_namespace = GLOBAL_DB.name.toLowerCase().replace(UNICODE.UNDERSCORE, UNICODE.HYPHEN);
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

                if (isFunction(/* lifecycle. */isObserved)) /* lifecycle. */isObserved(...params) ;

            }

            connectedCallback() {

                if ( isFunction(/* lifecycle. */isMounted) ) /* lifecycle. */isMounted() ;

            }

            disconnectedCallback() {

                if ( isFunction(/* lifecycle. */isDestroyed) ) /* lifecycle. */isDestroyed() ;

            }
    
        }
    );

    return (
        Reflect.construct( customElements.get( String( wc_namespace ) ) , [] )
    );

}

GLOBAL_DB[hasChanged.name] = hasChanged;

