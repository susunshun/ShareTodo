import 'firebase/firestore'
import {db} from '../../../../../../lib/db'

export default (req, res) => {
    const {
        query: {event, todo},
    } = req;

    const ref = db.collection('events').doc(event).collection("todos").doc(todo);
    const refEvent = db.collection('events').doc(event);
    if (req.method === 'PUT') {
        ref.update({
            text: req.body.text,
            memo: req.body.memo
        }).then(() => {
            res.status(200).json({message: `success`})
        }).catch(error => {
            res.status(500).json({message: `error`});
            console.log(`データを取得できませんでした (${error})`);
        })
    } else if (req.method === 'DELETE') {
        deleteTodo(ref, refEvent, todo).then((result) => {
            res.status(200).json({message: `success`});
        }).catch(error => {
            res.status(500).json({message: `error`});
            console.log(`データを削除できませんでした (${error})`);
        })
    }
};

async function deleteTodo(ref, refEvent, targetTodo) {
    let result = await new Promise((resolve, reject) => {
        refEvent.collection("todos").orderBy("order")
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

    let list = result.filter(todo => todo.id !== targetTodo);

    //　TODO:トランザクション処理にしたい
    await new Promise((resolve, reject) => {
        ref.delete().then(() => {
            resolve();
        }).catch((error) => {
            reject();
            console.log(`データを削除できませんでした (${error})`);
        })
    });

    await Promise.all(list.map(async (todo, index) => {
        await new Promise(
            (resolve, reject) => {
                refEvent.collection("todos").doc(todo.id).update({
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
