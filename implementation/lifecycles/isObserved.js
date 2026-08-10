export function isObserved({Observer, value, min, max, step}, attribute, oldValue, newValue) {

    switch (attribute) {

        case value : {
            console.log(`Upgrading ${attribute} to ${newValue}`)
            break;
        }
        case min : {
            if (Observer.hasChanged(oldValue, newValue)) {
                console.log(`Upgrading ${attribute} to ${newValue}`)
            }
            break;
        }
        case max : {            
            if (Observer.hasChanged(oldValue, newValue)) {
                console.log(`Upgrading ${attribute} to ${newValue}`)
            }
            break;
        }
        case step : {
            if (Observer.hasChanged(oldValue, newValue)) {
                console.log(`Upgrading ${attribute} to ${newValue}`)
            }
            break;
        }

    }
    
}