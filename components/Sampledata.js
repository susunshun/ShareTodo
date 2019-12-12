import React, {Component} from 'react';
import firebase from "firebase";
import "firebase/storage";
import {db} from '../lib/db';

class Sampledata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount(){
        this.getInitialProps().then(r => console.log(r));
    }

    async getInitialProps() {
        // db.jsのfirebaseのDB接続ファンクション
        // DBのpostsコレクション内を全て取得した結果 = result
        let result = await new Promise((resolve, reject) => {
            db.collection('users')
                .get()
                .then(snapshot => {
                    let data = []
                    snapshot.forEach((doc) => {
                        data.push(
                            Object.assign({
                                id: doc.id
                            }, doc.data())
                        )
                    });
                    resolve(data)
                }).catch(error => {
                reject([])
            })
        });
        this.setState({posts:result});
    }

    render() {
        const posts = this.state.posts;
        return (
            <div>
                {posts.map(post =>
                    <div className="post" key={post.id}>
                        <h2>
                            {post.message}
                        </h2>
                        <p>
                            {post.name}
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

export default Sampledata;