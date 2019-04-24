import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: {
        id: id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(lyric => {
      return (
        <li className="collection-item" key={lyric.id}>
          {lyric.content}
          <i
            className="material-icons right"
            onClick={() => this.onLike(lyric.id, lyric.likes)}
          >
            thumb_up
          </i>
          {lyric.likes}
        </li>
      );
    });
  }

  render() {
    console.log(this.props);
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
