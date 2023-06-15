import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Container, Box, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';


const CommentList = ({ comments, onDeleteComment, client}) => {


  return (
    <Box my={2}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>Comments</Typography>
      {comments.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">No comments yet! Add a comment.</Typography>
      ) : (
        comments.map((comment, index) => (
          <Box key={comment._id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', p: 2 }}>
            <Typography variant="body1" gutterBottom>{comment.comment}</Typography>
            <Typography variant="caption" color="text.secondary">By: {comment.author}</Typography>
            {client && client===comment.author && <IconButton aria-label="Delete" onClick={() => onDeleteComment(comment._id)}>
              <DeleteIcon sx={{ fontSize: "1rem" }} />
            </IconButton>}
            <Divider variant="middle" />
          </Box>
        ))
      )}
    </Box>
  );
};

const CommentForm = ({ client, setReload, pdfid }) => {
  const [comment, setComment] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/submitComment', {author: client, pdfid, comment}, {headers: { 'Content-Type': 'application/json'}}).then((res)=>{
      console.log(res);
      setComment('');
      setReload(prev => prev+1)
    })
  };
  if(!client || client.length===0){
    return <div>Login to comment</div>
  }

  return (
    <Box my={2}>
      <Typography variant="h7" sx={{ mt: 1 }}>Add Comment</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Comment"
          multiline
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          required
          sx={{ mt: 1 }}
        />
        <Button type="submit" variant="contained" color="primary" size="small" sx={{ mt: 1 }}>Submit</Button>
      </form>
    </Box>
  );
};

// const CommentForm = ({ client, setReload, pdfid }) => {
//   const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
//   const [comment, setComment] = useState([]);

//   const handleEditorChange = (newEditorState) => {
//     setEditorState(newEditorState);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const comment = editorState.getCurrentContent().getPlainText();
//     // You can also get the HTML or Markdown content from the editorState if needed

//     axios.post('http://localhost:5000/submitComment', {author: client, pdfid, comment}, {headers: { 'Content-Type': 'application/json'}}).then((res)=>{
//       console.log(res);
//       setComment('');
//       setReload(prev => prev+1)
//     })
//     setEditorState(EditorState.createEmpty()); // Clear the editor state after submitting
//     setReload((prev) => prev + 1);
//   };

//   if (!client || client.length === 0) {
//     return <div>Login to comment</div>;
//   }

//   const handleKeyCommand = (command, editorState) => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       handleEditorChange(newState);
//       return 'handled';
//     }
//     return 'not-handled';
//   };

//   return (
//     <Box my={2}>
//       <Typography variant="h7" sx={{ mt: 1 }}>Add Comment</Typography>
//       <form onSubmit={handleSubmit}>
//         <Editor
//           editorState={editorState}
//           onChange={handleEditorChange}
//           handleKeyCommand={handleKeyCommand}
//           placeholder="Write your comment..."
//         />
//         <Button type="submit" variant="contained" color="primary" size="small" sx={{ mt: 1 }}>Submit</Button>
//       </form>
//     </Box>
//   );
// };




const CommentSection = ({ client, pdfid }) => {
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(0);
  

  useEffect(() => {
    axios.get('http://localhost:5000/comments').then((res)=>{
      const data = res.data;
      const temp = data.filter((c)=>{
        return c.pdfId===pdfid
      })
      setComments(temp);
    })
  }, [pdfid, reload]);



  const handleDeleteComment = (commentId) => {
    axios.delete(`http://localhost:5000/deleteComment/${commentId}`).then((res)=>{
      console.log(res.data);
      setReload(prev => prev+1)
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  return (
    <Container maxWidth="sm">
      <CommentList comments={comments} onDeleteComment={handleDeleteComment} client={client}/>
      <CommentForm client={client} setReload={setReload} pdfid={pdfid}/>
    </Container>
  );
};

export default CommentSection;

