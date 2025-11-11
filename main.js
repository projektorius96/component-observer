import GLOBAL_DB from "./src/index.js";
import { openDB, deleteDB } from "idb";
import { notifier, disposer, ATTRIBUTE } from "./implementation/main.js";

/** 
 * HTML@Attributes:{@link https://html.spec.whatwg.org/multipage/dom.html#attributes} 
 * @typedef {Map}
*/
const
    observings = new Map([
        [ ATTRIBUTE.version , String(1) ],
    ])
    ;

/**
 * @example
 *  
 * Run the `document.body.children.global_db.version = 2;` [see cont'd]
 * [cont'd] # Open Application -> IndexedDB on your browser's DevTools and observe changes in real-time saying somethine like "version: 2".
        NOTE # You may need to refresh the browser, or close and open it again through `Application -> IndexedDB` again, but it's there, believe me !
*/
document.body.appendChild(
    GLOBAL_DB({
        id: GLOBAL_DB.name.toLowerCase()
        ,
        observings
        ,
        lifecycle: {
            
            /* DEV_NOTE (!) # the `isMounted` logs only on the very first load of web-component */
            isMounted: ()=> console.log(`${GLOBAL_DB.name} was mounted`)
            ,
            
            isObserved: notifier.bind(null, {dependencies:  { GLOBAL_DB, openDB  }})
            ,
            
            /* DEV_NOTE # the `isDestroyed` triggers when you remove web-component via DOM call something like `document.body.children.global_db.remove();` */
            isDestroyed: disposer.bind(null, {dependencies: { GLOBAL_DB, deleteDB }})

        }
    })
);