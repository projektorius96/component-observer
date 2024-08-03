export function registerAttrs(list){
    registerGetterSetter.prototype._attrs = [...list];
    return (
        Array.from(list.keys())
    )
}

export function registerGetterSetter(_thisArg){
    const _attrs = registerGetterSetter.prototype._attrs;
    [...new Array(_attrs.length)].forEach((_, i)=>{

        _thisArg.setAttribute(_attrs[i][0], _attrs[i][1])
            Object.defineProperty(_thisArg, String(_attrs[i][0]), {
                get() {
                    return _thisArg.getAttribute(String(_attrs[i][0]));
                }
                ,
                set(newValue) {
                    return _thisArg.setAttribute(String(_attrs[i][0]), newValue);
                }
            })

    })
    return true;
}

export function hasChanged(oldValue, newValue){
    if (oldValue !== newValue){
        return true;
    }
    else {
        return false;
    }
}

export function isFunction(input){
    return (
        typeof input === Function.name.toLowerCase()
    );
}

/**
 * @param {interface} HTML_x_Element - such as `HTMLCanvasElement`, see the line below for an explanation:
 * @returns an example given for `HTMLCanvasElement`, function strips interface.name, so only the middle part stays as is, i.e. 'Canvas', but returned as 'canvas' (in lower-case)
 */
export const getImplname = (HTML_x_Element)=> /HTML(.+)Element/.exec(HTML_x_Element?.name)?.[1].toLowerCase();

/**
 * 
 * @param {Object} import_meta_url - self explanatory [import.meta.url] of self module
 * @returns self module file-based namespace
 */
export const getFilename = (import_meta_url)=> import_meta_url.split('/').at(-2);

document.getComponentBy = function (componentNamespace, defaultIndex = 0){
    return (
        document.getElementsByTagName(componentNamespace)[defaultIndex]
    );
}