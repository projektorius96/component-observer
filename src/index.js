import { registerAttrs, registerGetterSetter, hasChanged, isFunction } from './utils/index.js';
export default function WEB_STORE(namespace, observings, lifecycle = {isMounted: null, isDestroyed: null, isObserved: null}){

    customElements.define(String( namespace ), class extends HTMLElement {

        static get observedAttributes(){

            return ([
                ...registerAttrs(observings)
            ]);

        }
    
        constructor() {
            
            registerGetterSetter( super() );

        }

        attributeChangedCallback(...params) {

            if (isFunction(lifecycle.isObserved)){
                lifecycle.isObserved(...params)
            }

        }

        connectedCallback(){

            if (isFunction(lifecycle.isMounted)){
                lifecycle.isMounted()
            }

        }

        disconnectedCallback(){

            if (isFunction(lifecycle.isDestroyed)){
                lifecycle.isDestroyed()
            }

        }
    
    });

    return (
        Reflect.construct(customElements.get( String( namespace ) ) , [])
    );

}

WEB_STORE[hasChanged.name] = hasChanged;
WEB_STORE.namespace = WEB_STORE.name.toLowerCase().replace("_", "-")

