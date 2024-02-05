import WEB_STORE from "./src/index.js";
import { openDB, deleteDB } from "idb";

async function notifier(property, oldValue, newValue) {
    switch (property) {
        case 'version':
            if (WEB_STORE.hasChanged(oldValue, newValue)){

                await openDB(`${WEB_STORE.name}_DB`, Number(newValue), {
                    async upgrade(db, oldVersion, newVersion, transaction, event){

                        console.log(oldVersion == oldValue, newVersion == newValue);

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
            
                            transaction.done.then(()=>{
                                // NEXT_GOAL # create a new transaction and try to call db.put like so instead: 
                                // example # /* db.put(WEB_STORE.namespace, newValue, property) */
                            })
                        }

                        // // transaction.addEventListener("complete",  function(e){
                        // //     console.log("successful db.createObjectStore\n")
                        // //     console.log("READY_TO_START_NEW_TRANSACTION \n");
                        // //     console.log(currentStore); // # Failed to execute 'objectStore' on 'IDBTransaction': The specified object store was not found. (see below for explanation by JA)
                        // //     // TL;DR: Do not await other things between the start and end of your transaction, otherwise the transaction will close before you're done.
                        // //     // docs@https://github.com/jakearchibald/idb?tab=readme-ov-file#transaction-lifetime
                        // // })
                        // ///* DEV_NOTE # alternatively we could do something more close to nature of 'idb' wrapper */
                        // transaction.done.then(()=>{
                        //     console.log("successful db.createObjectStore\n")
                        //     console.log("READY_TO_START_NEW_TRANSACTION \n");
                        //     /* console.log(currentStore) */// # Failed to execute 'objectStore' on 'IDBTransaction': The specified object store was not found. (see below for explanation by JA)
                        //     /* 
                        //         TL;DR: Do not await other things between the start and end of your transaction, otherwise the transaction will close before you're done.
                        //         docs@https://github.com/jakearchibald/idb?tab=readme-ov-file#transaction-lifetime
                        //     */
                        //    // DEV_NOTE (IDEA) # one way is to create new transaction and do stuff here, or jump just outside of openDB call and write the code there...
                        // })
                        
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
        isDestroyed: ()=> console.log("isDestroyed")
    }
)

/* document.body.appendChild(webstore) */// DEV_NOTE # adding to DOM is optional if it's planned to be used only in run-time
/** 
> HOW TO USE
* - prefix [globalThis.] is optional, we can simply change 'version' as follows:
* - webstore.version = 2 # "version has changed from 1 to 2"
*/