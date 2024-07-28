import CANVAS_COMPONENT from "./src/index.js";
import { openDB, deleteDB } from "idb";

async function notifier(property, oldValue, newValue) {
    switch (property) {
        case 'version':
            if (CANVAS_COMPONENT.hasChanged(oldValue, newValue)){

                await openDB(`${CANVAS_COMPONENT.name}_DB`, Number(newValue), {
                    async upgrade(db, oldVersion, newVersion, transaction, event){

                        /* console.log(oldVersion == oldValue, newVersion == newValue); */// [PASSING]

                        if (!db.objectStoreNames.contains(CANVAS_COMPONENT.namespace)) {
        
                            db
                            .createObjectStore(CANVAS_COMPONENT.namespace, {
                                autoIncrement: true
                            })
                            .put(
                                newValue,
                                property
                            )
                    
                        }
                        else {
            
                            // [SOLVED] # Failed to execute 'transaction' on 'IDBDatabase': A version change transaction is running
                            transaction.done.then(async ()=>{/* as if transaction.oncomplete */
                                await db.put(CANVAS_COMPONENT.namespace, newValue, property)
                            })

                        }
                        
                    }
                })

            }
            break;
        default:
            console.warn(`
                ${CANVAS_COMPONENT.name}_ERROR : \nCURRENTLY YOU ARE NOT OBSERVING the following property, which is "${property}"
            `.trim())
    }
}

/** 
 * HTML@Attributes:{@link https://html.spec.whatwg.org/multipage/dom.html#attributes} 
 * @type {Map} - registers Map<Key, Value> pair(s)
*/
const observings = new Map([
    ['version', String(1)],
    ['width', 800],
    ['height', 600],
]);

globalThis.canvasComponent = CANVAS_COMPONENT(
    CANVAS_COMPONENT.namespace,
    observings,
    {
        isObserved: notifier,
        /* DEV_NOTE (!) # isMounted logs only on the very first load of web-component */
        isMounted: ()=> console.log("isMounted"),
        /* DEV_NOTE # isDestroyed triggers when you remove web-component via DOM calls such as .removeChild(ref) | ref.remove() */
        isDestroyed: async ()=> {
            console.log("isDestroyed")
            await deleteDB(`${CANVAS_COMPONENT.name}_DB`)
        }
    }
)

/** 
> HOW TO USE
* - prefix [globalThis.] is optional, we can simply change 'version' as follows:
* - canvasComponent.version = 2 // OUTPUT # "version has changed from 1 to 2"
*/
/* document.body.appendChild(canvasComponent) */