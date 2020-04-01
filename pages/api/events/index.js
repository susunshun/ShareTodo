import 'firebase/firestore'
import {db} from '../../../lib/db'

export default (req, res) => {
    const ref = db.collection('events');
    if (req.method === 'POST') {
        ref.add({
            title: req.body.title,
        }).then((doc) => {
            res.status(200).json({id: doc.id});
        }).catch(error => {
            res.status(500).json({message: `error`});
            console.log(`データを追加できませんでした (${error})`);
        })
    }
};
