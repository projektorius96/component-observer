import canvas_heart from "./src/web-components/canvas-heart";
import { openDB, deleteDB } from "idb";

document.body.append(...[
    canvas_heart.paint(
        canvas_heart.namespace,
        new Map([
            /* PLAYGROUND # document.getComponentBy('canvas-heart').version = 2; */
            ['version', String(1)],
            ['width', Number(window.innerWidth * devicePixelRatio)],
            ['height', Number(window.innerHeight * devicePixelRatio)],
        ]),
        {
            isObserved: notifier,
            /* DEV_NOTE (!) # isMounted logs only on the very first load of web-component */
            isMounted: ()=> console.log("isMounted"),
            /* DEV_NOTE # isDestroyed triggers when you remove web-component via DOM calls such as .removeChild(ref) | ref.remove() */
            isDestroyed: async ()=> {
                console.log("isDestroyed")
                await deleteDB(`${canvas_heart.name}_DB`)
            }
        }
    )
    ,
])

async function notifier(property, oldValue, newValue) {

    switch (property) {
        case 'version':
            if (canvas_heart.hasChanged(oldValue, newValue)){

                await openDB(`${canvas_heart.name}_DB`, Number(newValue), {
                    async upgrade(db, oldVersion, newVersion, transaction, event){

                        /* console.log(oldVersion == oldValue, newVersion == newValue); */// [PASSING]

                        if (!db.objectStoreNames.contains(canvas_heart.namespace)) {
        
                            db
                            .createObjectStore(canvas_heart.namespace, {
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
                                await db.put(canvas_heart.namespace, newValue, property)
                            })

                        }
                        
                    }
                })

            }
            break;
        default:
            console.warn(`
                ${canvas_heart.name}: currently you are NOT observing the following attribute (property) "${property}"\n- in order to observe such, please modify the SWITCH statement within the ${notifier.name} declaration
            `.trim())
    }
}