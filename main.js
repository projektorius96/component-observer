import WEBSTORE from "./src/index.js";
import { createStore, get, set, clear } from "idb-keyval";

/** 
 * idb-keyval:{@link https://github.com/jakearchibald/idb-keyval} 
 * @type {IDBFactory}
*/
const storeEntry = createStore(`${WEBSTORE.name}_DB`, WEBSTORE.namespace)

/** 
 * HTML@Attributes:{@link https://html.spec.whatwg.org/multipage/dom.html#attributes} 
 * @type {Map} - registers Map<Key, Value> pair(s)
*/
const observings = new Map([
    ['version', String(1)],
]);

const lifecycle = {
    isObserved: notifier,
    isMounted: async ()=>console.log(await get('version', storeEntry)),
    isDestroyed: async ()=>console.log(`${WEBSTORE.namespace} isDestroyed`, await clear(storeEntry))
}

/** 
HOW TO USE
* - prefix [globalThis.] is optional, we can simply change 'version' as follows:
* - webstore.version = 2; // # "version has changed from 1 to 2"
*/
function notifier(property, oldValue, newValue) {
    switch (property) {
        case 'version':
            WEBSTORE.hasChanged(oldValue, newValue) ? set(property, newValue, storeEntry) : set(property, oldValue, storeEntry) ;
            break;
    }
}
globalThis.webstore = WEBSTORE(
    WEBSTORE.namespace,
    observings,
    lifecycle
)
document.body.appendChild(webstore)