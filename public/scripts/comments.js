var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
   },

  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Hello, world! I am a happy CommentBox :).</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var AllComments = this.props.data.map(function(comment){
      return(
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      )
    });

    return (
      <div className="commentList">
        {AllComments}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world... I am an ataraxic CommentForm :|.
      </div>
    );
  }
});

var Comment = React.createClass({
  //NOT RECOMMENDED!!!
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
      //See? Dangerously!!!!
    );
  }
});

var data = [
  {id: 1, author: "Horus", text: "Birdhead"},
  {id: 2, author: "Hades", text: "*Candlehead* comment"}
];

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval="2000" />,
  document.getElementById('content')
);
