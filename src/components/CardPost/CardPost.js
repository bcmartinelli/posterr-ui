import ProfileImage from '../../components/ProfileImage/ProfileImage'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { savePost } from '../../services/postsService';
import { useDispatch, useSelector } from 'react-redux';

import './cardPost.scss';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import ModalDefault from '../Modal/Modal';
import NewPostCard from '../NewPostCard/NewPostCard';
import { showAlert } from '../../store/reducers/configSlice';

const CardPost = ({post, isQuote, className, onCreatePost}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [postToQuote, setPostToQuote] = useState(null);
  const userDetail = useSelector((state) => state.user);
  const { countPostByDay } = useSelector((state) => state.profile);
  const isRepost = post.type === 'REPOST';

  const handleRepost = async () => {
    if(countPostByDay < 5) {
      const date = new Date();
      const createDate = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate();
      const user = isRepost ? post.repost.user : post.user;
      const obj = {
        createDate,
        type: "REPOST",
        repost: {
          type: "POST",
          repost: null,
          user: {
            id: user.id,
            photo: user.photo,
            name: user.name,
            username: user.username
          },
          body: isRepost ? post.repost.body : post.body,
        },
        user: {
          id: userDetail.id,
          photo: userDetail.photo,
          name: userDetail.name,
          username: userDetail.username
        },
        body: '',
      }
      await savePost(obj);
      onCreatePost();
    } else {
      dispatch(showAlert({isShowing: true, msg: 'LIMIT_PER_DAY'}))
    }
  }

  const handleOpenModal = (originalPost) => {
    originalPost = {
      ...originalPost,
      repost: null,
      type: 'POST'
    };
    setPostToQuote(originalPost);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setPostToQuote(null);
    setShowModal(false);
  }

  return (
    <div className={`post-card container ${className}`}>
      { post.type === 'REPOST' ? (
        <span className='repost'><SyncOutlinedIcon /> {post.user.username} repost</span>
      ) : null }

      <ProfileImage userDetail={!isRepost ? post.user : post.repost.user} linear={true} size={isQuote ? 'very-small': 'small'} />

      <div className='body'>
        {!isRepost ? post.body : post.repost.body}

        {post.type === 'QUOTE' ? (
          <CardPost post={post.repost} isQuote className="mt-1" />
        ): null}
      </div>

      {!isQuote ? (
        <div className='actions-bar'>
          <Tooltip title="Create a post quote">
            <button onClick={() => handleOpenModal(!isRepost ? post : post.repost)} className='action'>
              <ModeCommentOutlinedIcon />
              Post Quote
            </button>
          </Tooltip>
          <Tooltip title="Create a repost">
            <button onClick={handleRepost} className='action'>
              <SyncOutlinedIcon />
              Repost
            </button>
          </Tooltip>
        </div>
      ) : null}

      <ModalDefault open={showModal} onClose={handleCloseModal} size='small'>
        <NewPostCard isQuote post={postToQuote} onCreatePost={onCreatePost} onClose={handleCloseModal}>
          <CardPost post={postToQuote} isQuote className="mt-1" />
        </NewPostCard>        
      </ModalDefault>
    </div>
  );
}

export default CardPost;
