export async function notifier({ dependencies }, property, oldValue, newValue) {

    const 
        { GLOBAL_DB, openDB } = dependencies;

    switch (property) {
        case 'version':
            if ( GLOBAL_DB.hasChanged(oldValue, newValue) ) {

                await openDB(`${GLOBAL_DB.name}`, Number(newValue), {

                    async upgrade(db, oldVersion, newVersion, transaction, event){

                        /* console.log(oldVersion == oldValue, newVersion == newValue); */// [PASSING]
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