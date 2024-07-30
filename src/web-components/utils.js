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

export const getImplname = (HTML_x_Element)=> /HTML(.+)Element/.exec(HTML_x_Element?.name)?.[1].toLowerCase();
export const getFilename = (import_meta_url)=> import_meta_url.split('/').at(-2);

document.getComponentBy = function (componentNamespace, defaultIndex = 0){
    return (
        document.getElementsByTagName(componentNamespace)[defaultIndex]
    );
}