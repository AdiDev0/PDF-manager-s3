import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Container, Box, Divider, IconButton, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// const URL = 'https://pdf-manager-s3-v2.onrender.com';

const URL = 'http://localhost:5000'



const RenderReplies = ({ replies, client, setReload, id}) => {

    const onDeleteComment = (reply)=>{
        console.log(reply)

        axios.delete(`${URL}/deletereply/${id}`,{ data :{author: reply.author, reply: reply.reply}}).then((res)=>{
            setReload(prev => prev+1);
        })
    }

    return (
        <Box sx={{ pl: 4 }}>
            {replies.map((reply, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body1" sx={{marginRight:'1rem'}} gutterBottom>
                            {reply.reply}
                        </Typography>
                        
                        <Typography variant="caption" color="text.secondary" sx={{fontSize:'0.6rem'}}>
                            By: {reply.author}
                        </Typography>
                        {client && client === reply.author && (
                            <IconButton aria-label="Delete" onClick={() => onDeleteComment(reply)}>
                                <DeleteIcon sx={{ fontSize: '1rem' }} />
                            </IconButton>
                        )}
                </Box>
            ))}
        </Box>
    );
};



const CommentList = ({ comments, onDeleteComment, client, replyVisibility, setReplyvisibility, formDisplay, setFormDisplay, selectedCommentId, setSelectedcommentId, setReload }) => {


    const handleReply = (commentId) => {
        setReplyvisibility(!replyVisibility);
        setSelectedcommentId(commentId);
    };

    const handleFormDisplay = (id) => {
        if (formDisplay === 'comment') {
            setFormDisplay('reply');
        }
        else {
            setFormDisplay('comment');
        }
        setSelectedcommentId(id);
    }


    return (
        <Box my={2}>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                Comments
            </Typography>
            {comments.length === 0 ? (
                <Typography variant="body1" align="center" color="text.secondary">
                    No comments yet! Add a comment.
                </Typography>
            ) : (
                comments.map((comment, index) => (
                    <Box key={comment._id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', p: 2 }}>
                        <Typography variant="body1" gutterBottom>
                            {comment.comment}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            By: {comment.author}
                        </Typography>
                        {client && client === comment.author && (
                            <IconButton aria-label="Delete" onClick={() => onDeleteComment(comment._id)}>
                                <DeleteIcon sx={{ fontSize: '1rem' }} />
                            </IconButton>
                        )}
                        <IconButton aria-label="Reply" onClick={() => handleFormDisplay(comment._id)}>
                            <ReplyIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                        {replyVisibility && comment._id === selectedCommentId ? (
                            <>
                                {<RenderReplies replies={comment.replies} client={client} setReload={setReload} id={comment._id}/>}
                                <Button
                                    variant="text"
                                    size="small"
                                    sx={{ mt: 1, display: 'flex', alignItems: 'center', fontSize: '0.6rem' }}
                                    onClick={() => handleReply(comment._id)}
                                >
                                    <ExpandLessIcon sx={{ mr: 1, fontSize: '1rem' }} />
                                    
                                    <Typography variant="body2" sx={{ textTransform: 'lowercase', mr: 1, fontSize:'0.6rem' }}>
                                        Hide replies
                                    </Typography>
                                </Button>
                            </>
                        ) : comment.replies.length > 0 && (
                            <Button
                                variant="text"
                                size="small"
                                sx={{ mt: 1, display: 'flex', alignItems: 'center', fontSize: '0.6rem' }}
                                onClick={() => handleReply(comment._id)}
                            >
                                <ExpandMoreIcon sx={{ mr: 1, fontSize: '1rem', textTransform: 'lowercase' }} />
                                 {comment.replies.length === 1 ? <Typography variant="body2" sx={{ textTransform: 'lowercase', mr: 1, fontSize:'0.6rem'}}>
                                 {comment.replies.length}<span styles={{display:'hidden'}}>{' '}</span>reply
                                    </Typography> : <Typography variant="body2" sx={{ textTransform: 'lowercase', mr: 1, fontSize:'0.6rem' }}>
                                    {comment.replies.length }<span styles={{display:'hidden'}}>{' '}</span>replies
                                    </Typography>}
                            </Button>
                        )}
                        <Divider variant="middle" />
                    </Box>
                ))
            )}
        </Box>
    );
};

export default CommentList;