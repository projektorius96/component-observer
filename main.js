import { openDB } from "idb";
import GLOBAL_DB from "./src/index.js";
import { notifier } from "./implementation/main.js";

/** 
 * HTML@Attributes:{@link https://html.spec.whatwg.org/multipage/dom.html#attributes} 
 * @typedef {Map}
*/
const observings = new Map([
    ['version', String(1)],
]);

document.body.appendChild(
    GLOBAL_DB({
        id: GLOBAL_DB.name.toLowerCase()
        ,
        observings
        ,
        lifecycle: {
            isObserved: notifier.bind(null, {dependencies: { GLOBAL_DB, openDB }}),
            /* DEV_NOTE (!) # isMounted logs only on the very first load of web-component */
            isMounted: ()=> console.log(`${GLOBAL_DB.name} was mounted`),
            /* DEV_NOTE # isDestroyed triggers when you remove web-component via DOM calls such as .removeChild(ref) | ref.remove() */
            isDestroyed: async ()=> {
                console.log(`${GLOBAL_DB.name} was destroyed`)
                await deleteDB(`${GLOBAL_DB.name}`)
            }
        }
    })
);
/** 
> HOW TO USE
* - Run `document.body.children.global_db.version = 2;` [see cont'd]
    [cont'd] # Open Application -> IndexedDB on your browser's DevTools and observe changes in real-time saying somethine like "version: 2".
        NOTE # You may need Refresh, or close and Open Application -> IndexedDB, but it's there, believe me!
*/