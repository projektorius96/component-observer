import canvasComponent from "./src/canvas-web-components/canvas-heart.js";
import { openDB, deleteDB } from "idb";

// PLAYGROUND # document.getElementsByTagName('canvas-line')[0].version = 2
canvasComponent.paint(
    canvasComponent.namespace,
    new Map([
        ['version', String(1)],
        ['width', window.innerWidth* devicePixelRatio],
        ['height', window.innerHeight* devicePixelRatio],
    ]),
    {
        isObserved: notifier,
        /* DEV_NOTE (!) # isMounted logs only on the very first load of web-component */
        isMounted: ()=> console.log("isMounted"),
        /* DEV_NOTE # isDestroyed triggers when you remove web-component via DOM calls such as .removeChild(ref) | ref.remove() */
        isDestroyed: async ()=> {
            console.log("isDestroyed")
            await deleteDB(`${canvasComponent.name}_DB`)
        }
    }
)

async function notifier(property, oldValue, newValue) {

    switch (property) {
        case 'version':
            if (canvasComponent.hasChanged(oldValue, newValue)){

                await openDB(`${canvasComponent.name}_DB`, Number(newValue), {
                    async upgrade(db, oldVersion, newVersion, transaction, event){

                        /* console.log(oldVersion == oldValue, newVersion == newValue); */// [PASSING]

                        if (!db.objectStoreNames.contains(canvasComponent.namespace)) {
        
                            db
                            .createObjectStore(canvasComponent.namespace, {
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
                                await db.put(canvasComponent.namespace, newValue, property)
                            })

                        }
                        
                    }
                })

            }
            break;
        default:
            console.warn(`
                ${canvasComponent.name}: currently you are NOT observing the following attribute (property) "${property}"\n- in order to observe such, please modify the SWITCH statement within the ${notifier.name} declaration
            `.trim())
    }
}