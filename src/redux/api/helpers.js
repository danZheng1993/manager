import {findIndex} from 'lodash'

export const refreshResult = (list, update) => {
    let index = findIndex(list, {_id: update._id})
    if (index !== -1) {
        list.splice(index, 1, update)
    } else {
        list.push(update)
    }
    return list
}

export const updateUnreadMessageList = (list, from) => {
    if (list[from]) {
        let count = list[from] + 1
        return {
            ...list,
            [from]: count
        }
    } else {
        return {
            ...list,
            [from]: 1       
        }
    }
}