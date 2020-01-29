import firebase from 'firebase/app'
import 'firebase/firestore'
import {db} from '../../../../../lib/db'

export default (req, res) => {
    const {
        query: {event, todo},
    } = req;

    let firestore = firebase.firestore();
    const ref = firestore.collection('events').doc(event).collection("todos").doc(todo);
    if (req.method === 'PUT') {
        ref.update({
            text: req.body.text,
            memo: req.body.memo
        }).then(() => {
            res.status(200)
        }).catch(error => {
            res.status(500).json({message: `error`});
            console.log(`データを取得できませんでした (${error})`);
        })
    } else if (req.method === '') {

    }
};
