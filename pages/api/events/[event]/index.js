import 'firebase/firestore'
import {db} from '../../../../lib/db'

export default (req, res) => {
    const {
        query: {event},
    } = req;

    const ref = db.collection('events').doc(event);
    if (req.method === 'GET') {
        ref.get().then((doc) => {
            if (doc.exists) {
                res.status(200).json(doc.data());
            } else {
                res.status(404).json({message: `not found`});
            }
        }).catch((error) => {
            res.status(500).json({message: `error`});
            console.log(`データを取得できませんでした (${error})`);
        });
    } else if (req.method === 'PUT') {
        ref.update({
            title: req.body.title
        }).then(() => {
            res.status(200).json({message: `success`});
        }).catch(error => {
            res.status(500).json({message: `error`});
            console.log(`データを取得できませんでした (${error})`);
        })
    }
};