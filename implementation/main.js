import { ATTRIBUTE } from './utils.js';

async function notifier({ dependencies }, property, oldValue, newValue) {

    const 
        { GLOBAL_DB, openDB } = dependencies;

    switch (property) {
        case ATTRIBUTE.version :
            if ( GLOBAL_DB.hasChanged(oldValue, newValue) ) {

                await openDB(`${GLOBAL_DB.name}`, Number(newValue), {

                    async upgrade(db, oldVersion, newVersion, transaction, event) {

                        /* console.log(oldVersion == oldValue, newVersion == newValue); */// [PASSING]
                        console.log(`${property} was updated`);
                        if ( !db.objectStoreNames.contains(GLOBAL_DB.name) ) {
        
                            db
                            .createObjectStore(GLOBAL_DB.name, {autoIncrement: true})
                            .put(
                                newValue,
                                property
                            );
                    
                        } else {
            
                            // [SOLVED] # Failed to execute 'transaction' on 'IDBDatabase': A version change transaction is running
                            transaction.done.then(
                                async ()=>{/* DEV_NOTE # as if `transaction.oncomplete` was registered, do the following:.. */
                                    await db.put(GLOBAL_DB.name, newValue, property);
                                }
                            );

                        }
                        
                    }

                });

            }
            break;
        default:
            console.warn('CURRENTLY YOU ARE OBSERVING "NOTHING", IF YOU WANT TO OBSERVE "SOMETHING",\nREGISTER YOUR "observings" as "Map<Key, Value> pairs"')
    }

}

async function disposer({ dependencies }) {

    const {
        GLOBAL_DB,
        deleteDB
    } = dependencies;

    console.log(`${GLOBAL_DB.name} was destroyed`);
    await deleteDB(`${GLOBAL_DB.name}`)
    
}

export {
    ATTRIBUTE,
    notifier,
    disposer
}