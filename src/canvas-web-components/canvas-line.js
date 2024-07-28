import { 
    registerAttrs, 
    registerGetterSetter, 
    hasChanged, 
    isFunction, 
    getImplname,
    getFilename
} from './utils.js';

export default class CANVAS_LINE {

    static [hasChanged.name] = hasChanged;
    static namespace = getFilename(import.meta.url);

    /**
     * @param {String} namespace - component's name conforming to the the following spec:{@link https://html.spec.whatwg.org/multipage/custom-elements.html#prod-potentialcustomelementname}
     * @param {Map} observings - Map<key,value> HTML attribute pair(s) that match(es) against the {observings} (if any registered); spec:{@link https://html.spec.whatwg.org/multipage/dom.html#attributes} 
     * @param {Object} lifecycle - component's life cycle configuration, whose properties are as follows:
     * @param {Function} lifecycle.isMounted - called once whenever the component being added to the document via JavaScript | declaratively in your .html file
     * @param {Function} lifecycle.isDestroyed - called once whenever the component gets destroyed, this can only happen during run-time via JavaScript e.g. `customeElement.remove()`  
     * @param {Function} lifecycle.isObserved - is the core of this component hook, which in the nutshell enables us to observe state changes without complete DOM re-flow
     * @returns a web component hook
     */
    static paint( namespace, observings, lifecycle = {isMounted: null, isDestroyed: null, isObserved: null} ){

        customElements.define(String( namespace ), class extends HTMLElement {

            static get observedAttributes(){
    
                return ([
                    ...registerAttrs(observings)
                ]);
    
            }
        
            constructor() {
                
                registerGetterSetter( super() ) && Object.assign(this, document.createElement( getImplname( HTMLCanvasElement ) ));
    
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

    }

}

