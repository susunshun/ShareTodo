import 'firebase/firestore'
import {db} from '../../../../../../lib/db'

export default (req, res) => {
    const {
        query: {event, todo},
    } = req;

    const ref = db.collection('events').doc(event).collection("todos").doc(todo);
    if (req.method === 'POST') {
        ref.update({
            completed: req.body.completed,
        }).then(() => {
            res.status(200).json({message: `success`})
        }).catch(error => {
            res.status(500).json({message: `error`});
            console.log(`データを取得できませんでした (${error})`);
        })
    } else if (req.method === '') {

    }
};
