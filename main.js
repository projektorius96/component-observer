import GLOBAL_DB from "./src/index.js";
import { openDB, deleteDB } from "idb";

async function notifier(property, oldValue, newValue) {
    switch (property) {
        case 'version':
            if (GLOBAL_DB.hasChanged(oldValue, newValue)){

                await openDB(`${GLOBAL_DB.name}`, Number(newValue), {
                    async upgrade(db, oldVersion, newVersion, transaction, event){

                        /* console.log(oldVersion == oldValue, newVersion == newValue); */// [PASSING]

                        if ( !db.objectStoreNames.contains(GLOBAL_DB.namespace) ) {
        
                            db
                            .createObjectStore(GLOBAL_DB.namespace, {
                                autoIncrement: true
                            })
                            .put(
                                newValue,
                                property
                            )
                    
                        } else {
            
                            // [SOLVED] # Failed to execute 'transaction' on 'IDBDatabase': A version change transaction is running
                            transaction.done.then(
                                async ()=>{/* DEV_NOTE # as if `transaction.oncomplete` was hooked in... */
                                    await db.put(GLOBAL_DB.namespace, newValue, property)
                                }
                            )

                        }
                        
                    }
                })

            }
            break;
        default:
            console.warn('CURRENTLY YOU ARE OBSERVING "NOTHING", IF YOU WANT TO OBSERVE "SOMETHING",\nREGISTER YOUR "observings" as "Map<Key, Value> pairs"')
    }
}

/** 
 * HTML@Attributes:{@link https://html.spec.whatwg.org/multipage/dom.html#attributes} 
 * @type {Map} - registers Map<Key, Value> pair(s)
*/
const observings = new Map([
    ['version', String(1)],
]);

globalThis.webstore = GLOBAL_DB(
    GLOBAL_DB.namespace,
    observings,
    {
        isObserved: notifier,
        /* DEV_NOTE (!) # isMounted logs only on the very first load of web-component */
        isMounted: ()=> console.log("isMounted"),
        /* DEV_NOTE # isDestroyed triggers when you remove web-component via DOM calls such as .removeChild(ref) | ref.remove() */
        isDestroyed: async ()=> {
            console.log("isDestroyed")
            await deleteDB(`${GLOBAL_DB.name}_DB`)
        }
    }
)

document.body.appendChild(webstore)// DEV_NOTE # adding to DOM is optional if it's planned to be used only in run-time
/** 
> HOW TO USE
* - prefix [globalThis.] is optional, we can simply change 'version' as follows:
* - webstore.version = 2 # "version has changed from 1 to 2"
*/