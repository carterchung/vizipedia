var React = require('react');
var PlaylistActions = require('../actions/PlaylistActions');
var PlaylistStore = require('../stores/PlaylistStore');
var Router = require('react-router');
var Link = Router.Link;

var PlaylistItems = React.createClass({

  getInitialState: function() {
    // console.log('In playlistitems !!! this.props.playlistId', this.props.playlistId);

    return {};
  },
  componentWillMount: function() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    PlaylistActions.dispatchLoad(this.props.query.playlistId)
  },
  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div>
        <CurrentPlaylist playlistitems={this.state.playlistitems} />
        <Link to="profile" params={{username: this.props.query.username}}>{'Return to profile'}</Link>
      </div>
    );
  },
  _onChange: function() {
    this.setState(
      PlaylistStore.getPlaylistInfo()
    );
  }
});

var CurrentPlaylist = React.createClass({
  render: function() {
    if (this.props.playlistitems) {
      var itemNodes = this.props.playlistitems.map(function(item, index) {
        return (
          <Link to="wiki" params={{topic: item.topic}}>
          <PlaylistItem topic={item.topic} key={index} />
          </Link>
        );
      });
    } else {
      itemNodes = '';
    }
    return (
      <div>
        <h2>Current Playlist</h2>
        {itemNodes}
      </div>
    );
  }
});

var PlaylistItem = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.topic}
      </div>
    );
  }
})

module.exports = PlaylistItems;