import 'firebase/firestore'
import {db} from '../../../../../lib/db'

export default (req, res) => {
    const {
        query: {event},
    } = req;

    const ref = db.collection('events').doc(event).collection("todos");
    if (req.method === 'GET') {
        ref.orderBy("order")
            .get()
            .then(snapshot => {
                let data = []
                snapshot.forEach((doc) => {
                    data.push(
                        {
                            id: doc.id,
                            order: doc.data().order,
                            text: doc.data().text,
                            memo: doc.data().memo,
                            completed: doc.data().completed
                        }
                    )
                });
                res.status(200).json(data);
            }).catch(error => {
            res.status(500).json({message: `error`});
            console.log(`データを取得できませんでした (${error})`)
        })
    } else if (req.method === 'POST') {
        addTodo(ref, res, req.body.text).then((result) => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json({message: `error`});
            console.log(`データを追加できませんでした (${error})`);
        })
    }
};


async function addTodo(ref, res, text) {
    let order = await new Promise((resolve, reject) => {
        ref.orderBy("order", "desc").limit(1)
            .get()
            .then(snapshot => {
                let latestOrder = 0;
                snapshot.forEach((doc) => {
                    latestOrder = doc.data().order + 1
                });
                resolve(latestOrder)
            }).catch(error => {
            reject();
            console.log(`データを取得できませんでした (${error})`);
        });
    });

    return await new Promise((resolve, reject) => {
        ref.add({
            text: text,
            completed: false,
            memo: "",
            order: order
        }).then((doc) => {
            resolve({id: doc.id, order: order})
        }).catch(error => {
            console.log(`データを追加できませんでした (${error})`);
            reject();
        })
    });
}