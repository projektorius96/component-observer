import WEB_STORE from "./src/index.js";
import { openDB, deleteDB } from "idb";

async function notifier(property, oldValue, newValue) {
    switch (property) {
        case 'version':
            if (WEB_STORE.hasChanged(oldValue, newValue)){

                await openDB(`${WEB_STORE.name}_DB`, Number(newValue), {
                    async upgrade(db, oldVersion, newVersion, transaction, event){

                        /* console.log(oldVersion == oldValue, newVersion == newValue); */// [PASSING]

                        if (!db.objectStoreNames.contains(WEB_STORE.namespace)) {
        
                            db
                            .createObjectStore(WEB_STORE.namespace, {
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
                                await db.put(WEB_STORE.namespace, newValue, property)
                            })

                        }
                        
                    }
                })

            }
            break;
        default:
            console.warn("SWITCH_STATEMENT : \nCURRENTLY YOU ARE OBSERVING NOTHING, IF YOU WANT TO OBSERVE SOMETHING,\nREGISTER YOUR OBSERVINGS as Map<Key, Value> PAIRS")
    }
}

/** 
 * HTML@Attributes:{@link https://html.spec.whatwg.org/multipage/dom.html#attributes} 
 * @type {Map} - registers Map<Key, Value> pair(s)
*/
const observings = new Map([
    ['version', String(1)],
]);

globalThis.webstore = WEB_STORE(
    WEB_STORE.namespace,
    observings,
    {
        isObserved: notifier,
        /* DEV_NOTE (!) # isMounted logs only on the very first load of web-component */
        isMounted: ()=> console.log("isMounted"),
        /* DEV_NOTE # isDestroyed triggers when you remove web-component via DOM calls such as .removeChild(ref) | .remove(self) */
        isDestroyed: async ()=> {
            console.log("isDestroyed")
            await deleteDB(`${WEB_STORE.name}_DB`)
        }
    }
)

document.body.appendChild(webstore)// DEV_NOTE # adding to DOM is optional if it's planned to be used only in run-time
/** 
> HOW TO USE
* - prefix [globalThis.] is optional, we can simply change 'version' as follows:
* - webstore.version = 2 # "version has changed from 1 to 2"
*/