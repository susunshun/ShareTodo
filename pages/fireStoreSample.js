import { db } from '../lib/db';
import React from 'react'

export default class Posts extends React.Component {
  static async getInitialProps() {
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
          })
          resolve(data)
        }).catch(error => {
        reject([])
      })
    })
    console.log(result);
    return {posts: result}
  }

  handleDelete = (id) => {
    console.log(id)
  }

  render() {
    const posts = this.props.posts
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
            <button onClick={this.handleDelete.bind(this, post.id)}>削除</button>
          </div>
        )}
      </div>
    );
  }
}