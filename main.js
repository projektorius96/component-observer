import WEB_STORE from "./src/index.js";

function notifier(property, oldValue, newValue) {
    switch (property) {
        case 'version':
            if (WEB_STORE.hasChanged(oldValue, newValue)){
                console.log(`${property} has changed from ${oldValue} to ${newValue}`) // # version has changed from null to 1 (this is subject to change)
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
document.body.appendChild(webstore)

/** 
> HOW TO USE
* - prefix [globalThis.] is optional, we can simply change 'version' as follows:
*/
webstore.version = 2 // "version has changed from 1 to 2"