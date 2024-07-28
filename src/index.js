import { 
    registerAttrs, 
    registerGetterSetter, 
    hasChanged, 
    isFunction, 
    getInterface, 
    UNICODE
} from './utils.js';

/**
 * 
 * @param {String} namespace - component name conforming to the the following spec:{@link https://html.spec.whatwg.org/multipage/custom-elements.html#prod-potentialcustomelementname}
 * @param {Map} props - Map<key,value> pair(s) that match(es) against HTML attributes observed (if any); spec:{@link https://html.spec.whatwg.org/multipage/dom.html#attributes} 
 * @param {Object} lifecycle - component's life cycle configuration
 * @param {Function} lifecycle.isMounted - self-explanatory
 * @param {Function} lifecycle.isDestroyed - self-explanatory
 * @param {Function} lifecycle.isObserved - self-explanatory
 * @returns a web component hook
 */
export default function CANVAS_COMPONENT(namespace, props, lifecycle = {isMounted: null, isDestroyed: null, isObserved: null}){

    customElements.define(String( namespace ), class extends HTMLElement {

        static get observedAttributes(){

            return ([
                ...registerAttrs(props)
            ]);

        }
    
        constructor() {
            
            registerGetterSetter( super() ) && Object.assign(this, document.createElement( getInterface( HTMLCanvasElement ) ));

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

    // DEV_NOTE # uncomment the following, if you prefer registering your component only in JavaScript, rather than between the BODY tags in your index.html
    // return (
    //     Reflect.construct(customElements.get( String( namespace ) ) , [])
    // );

}

CANVAS_COMPONENT[hasChanged.name] = hasChanged;
CANVAS_COMPONENT.namespace = CANVAS_COMPONENT.name.toLowerCase().replace(UNICODE.UNDERSCORE, UNICODE.HYPHEN)

