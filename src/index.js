import { registerAttrs, registerGetterSetter, hasChanged } from './utils/index.js';
export default function Component_Observer(namespace, observings, lifecycle = {isMounted: null, isDestroyed: null, isObserved: null}){

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

            if (typeof lifecycle.isObserved === Function.name.toLowerCase()){
                lifecycle.isObserved(...params)
            }

        }

        connectedCallback(){

            if (typeof lifecycle.isMounted === Function.name.toLowerCase()){
                lifecycle.isMounted()
            }

        }

        disconnectedCallback(){

            if (typeof lifecycle.isDestroyed === Function.name.toLowerCase()){
                lifecycle.isDestroyed()
            }

        }
    
    });

    return (
        Reflect.construct(customElements.get( String( namespace ) ) , [])
    )

}

Component_Observer[hasChanged.name] = hasChanged;
Component_Observer.namespace = Component_Observer.name.toLowerCase().replace("_", "-")

