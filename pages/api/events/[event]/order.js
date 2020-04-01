import 'firebase/firestore'
import {db} from '../../../../lib/db'

export default (req, res) => {
    const {
        query: {event},
    } = req;

    const {fromOrder, toOrder} = req.body

    const ref = db.collection('events').doc(event);
    if (req.method === 'GET') {

    } else if (req.method === 'POST') {
        getTodo(ref, fromOrder, toOrder).then(result => {
            res.status(200).json({message: 'success'});
        }).catch(error => {
            res.status(500).json({message: `error`});
            console.log(`データを追加できませんでした (${error})`);
        })
    }
};

async function getTodo(ref, fromOrder, toOrder) {
    let result = await new Promise((resolve, reject) => {
        ref.collection("todos").orderBy("order")
            .get()
            .then(snapshot => {
                let data = []
                snapshot.forEach((doc) => {
                    data.push(
                        {
                            id: doc.id,
                            order: doc.data().order
                        }
                    )
                });
                resolve(data)
            }).catch(error => {
            reject([])
        })
    });

    let insertIndex = toOrder > fromOrder ? toOrder + 1 : toOrder;
    let deleteIndex = toOrder > fromOrder ? fromOrder : fromOrder + 1;
    let list = result.slice(0, result.length);
    list.splice(insertIndex, 0, result[fromOrder]);
    list.splice(deleteIndex, 1);

    // TODO: ここでStateの件数と差分があったら処理中断してリロードしたい
    // 「他の人が編集中です」的なアラート出して
    // TODO: トランザクション/バッチ処理にする
    await Promise.all(list.map(async (todo, index) => {
        await new Promise(
            (resolve, reject) => {
                ref.collection("todos").doc(todo.id).update({
                    order: index
                }).then(() => {
                    resolve(todo.id);
                }).catch(error => {
                    reject(error)
                })
            }
        );
    }));
}