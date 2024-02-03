export function registerAttrs(list){
    registerGetterSetter.prototype._attrs = [...list];
    return (
        Array.from(list.keys())
    )
}

export function registerGetterSetter(_thisArg){
    const _attrs = registerGetterSetter.prototype._attrs;
    return (
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
    )
}

export function hasChanged(oldValue, newValue){
    if (oldValue !== newValue){
        return true;
    }
    else {
        return false;
    }
}