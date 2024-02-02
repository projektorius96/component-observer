import { registerAttrs, registerGetterSetter, hasChanged } from './utils/index.js';
export default function Store(namespace, observings, lifecycle = {isMounted: null, isDestroyed: null, isObserved: null}){

    customElements.define(String( namespace ), class extends HTMLElement {

        static get observedAttributes(){
            return [
                ...registerAttrs(observings)
            ]
        }
    
        constructor() {
            
            super();
            registerGetterSetter(this);

        }

        attributeChangedCallback(...params) {

            if (lifecycle.isObserved && typeof lifecycle.isObserved === Function.name.toLowerCase()){
                lifecycle.isObserved(...params)
            }

        }

        connectedCallback(){

            if (lifecycle.isMounted && typeof lifecycle.isMounted === Function.name.toLowerCase()){
                lifecycle.isMounted()
            }

        }

        disconnectedCallback(){

            if (lifecycle.isDestroyed && typeof lifecycle.isDestroyed === Function.name.toLowerCase()){
                lifecycle.isDestroyed()
            }

        }
    
    });

    return (
        Reflect.construct(customElements.get( String( namespace ) ) , [])
    )

}

Store[hasChanged.name] = hasChanged;

