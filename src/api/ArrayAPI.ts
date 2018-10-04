const getMinIndex = (array: Array<number>) => {

    const indexOfMinValue = array.reduce((iMax, x, i, arr) => x < arr[iMax] ? i : iMax, 0)
    return indexOfMinValue
}

const getZeroArray = (length: number) => {
    let array = []
    for (let index = 0; index < length; index++) {
        array.push(0)
    }
    return array
}

export const ArrayAPI = {
    getMinIndex,
    getZeroArray
}