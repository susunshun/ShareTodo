import firebase from 'firebase/app'
import 'firebase/firestore'
import {db} from '../../lib/db'

export default (req, res) => {
    let firestore = firebase.firestore();
    const ref = firestore.collection('events').doc(req.query.eventId);
    ref.get().then((doc) => {
        if (doc.exists) {
            res.status(200).json(doc.data());
        } else {
            res.status(404).json({ message: `not found` });
        }
    }).catch((error) => {
        res.status(403).json({ message: `error` });
        console.log(`データを取得できませんでした (${error})`);
    });
};