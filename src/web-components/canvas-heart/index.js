import { 
    registerAttrs, 
    registerGetterSetter, 
    hasChanged, 
    isFunction, 
    getImplname,
    getFilename
} from '../utils.js';

export default class CANVAS_COMPONENT {

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
                
                registerGetterSetter( super() );

                const 
                    canvas = document.createElement( getImplname( HTMLCanvasElement ) )
                    ,
                    ctx = canvas.getContext('2d')
                    ;

                    canvas.setAttribute('width', observings.get('width'))
                    canvas.setAttribute('height', observings.get('height'))

                    // Cubic curves example
                    // source@https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
                    ctx.beginPath();
                    ctx.moveTo(75, 40);
                    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
                    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
                    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
                    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
                    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
                    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
                    ctx.fill();  
                
                this.appendChild(canvas)

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
            Reflect.construct( customElements.get( namespace ), [] )
        );

    }

}

