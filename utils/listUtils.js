export function order(todos, fromOrder, toOrder){
    let list = [];
    let order;
    if (toOrder > fromOrder) {
        todos.map(todo => {
            if (todo.order === fromOrder) {
                order = toOrder;
            } else if (todo.order <= toOrder && todo.order > fromOrder) {
                order = todo.order - 1
            } else {
                order = todo.order
            }
            list.push({...todo, order: order});
        })
    } else {
        todos.map(todo => {
            if (todo.order === fromOrder) {
                order = toOrder;
            } else if (todo.order < fromOrder && todo.order >= toOrder) {
                order = todo.order + 1;
            } else {
                order = todo.order
            }
            list.push({...todo, order: order});
        })
    }
    return list;
}