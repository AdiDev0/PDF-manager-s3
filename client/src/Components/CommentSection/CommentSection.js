import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Container, Box, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentList = ({ comments, onDeleteComment }) => {
  return (
    <Box my={2}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>Comments</Typography>
      {comments.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">No comments yet! Add a comment.</Typography>
      ) : (
        comments.map((comment, index) => (
          <Box key={comment.id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', p: 2 }}>
            <Typography variant="body1" gutterBottom>{comment.text}</Typography>
            <Typography variant="caption" color="text.secondary">By: {comment.author}</Typography>
            <IconButton aria-label="Delete" onClick={() => onDeleteComment(comment.id)}>
              <DeleteIcon sx={{ fontSize: "1rem" }}/>
            </IconButton>
            <Divider variant="middle" />
          </Box>
        ))
      )}
    </Box>
  );
};

const CommentForm = ({ onCommentSubmit }) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text && author) {
      onCommentSubmit({ text, author });
      setText('');
      setAuthor('');
    }
  };

  return (
    <Box my={2}>
      <Typography variant="h7" sx={{ mt: 1}}>Add Comment</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Comment"
          multiline
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          required
          sx={{ mt: 1}}
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          required
          sx={{ mt: 1}}
        />
        <Button type="submit" variant="contained" color="primary" size="small" sx={{ mt: 1}}>Submit</Button>
      </form>
    </Box>
  );
};

const CommentSection = ({ documentId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Retrieve comments from local storage based on document ID on component mount
    const storedComments = localStorage.getItem(`comments_${documentId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [documentId]);

  useEffect(() => {
    // Save comments to local storage whenever comments state updates
    localStorage.setItem(`comments_${documentId}`, JSON.stringify(comments));
  }, [comments, documentId]);

  const handleCommentSubmit = (newComment) => {
    // Add the new comment to the comments array
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleDeleteComment = (commentId) => {
    // Remove the comment with the specified ID from the comments array
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  };

  return (
    <Container maxWidth="sm">
      <CommentList comments={comments} onDeleteComment={handleDeleteComment} />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </Container>
  );
};

export default CommentSection;

