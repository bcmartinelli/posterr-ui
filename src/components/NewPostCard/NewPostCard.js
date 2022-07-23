import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePost } from '../../services/postsService';
import { showAlert } from '../../store/reducers/configSlice';
import CardPost from '../CardPost/CardPost';
import ProfileImage from '../ProfileImage/ProfileImage';
import './newPostCard.scss';

const NewPostCard = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [countCharacter, setCountCharacter] = useState(0);
  const userDetail = useSelector((state) => state.user);
  const { countPostByDay } = useSelector((state) => state.profile);

  const submitNewPost = async (e) => {
    e.preventDefault();
    const value = e.target[0].value.trim();
    if (value && countPostByDay < 5) {
      setIsLoading(true);

      const date = new Date();
      const createDate = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate();
      const obj = {
        createDate,
        type: props.isQuote ? 'QUOTE' : 'POST',
        repost: props.isQuote ? props.post : null,
        user: {
          id: userDetail.id,
          photo: userDetail.photo,
          name: userDetail.name,
          username: userDetail.username
        },
        body: value,
      }
      const res = await savePost(obj);
      if (res) {
        document.getElementById('txt-new-post').value = '';
        setCountCharacter(0);
        props.onCreatePost()
      }

      setIsLoading(false)
      if (props.isQuote) {
        props.onClose();
      }
    } else if (countPostByDay >= 5) {
      dispatch(showAlert({isShowing: true, msg: 'LIMIT_PER_DAY'}))
    }
  }

  return (
    <div className='form-container container'>
      {!props.isProfile ? <ProfileImage onlyImage className='profile-post' /> : null }
      <form id={props.isQuote ? 'new-quote' : props.isProfile ? 'new-profile' : 'new-post'} onSubmit={submitNewPost}>
        <textarea
          id='txt-new-post'
          placeholder='Make a post'
          maxLength={777}
          onKeyUp={(e) => setCountCharacter(e.target.value.trimStart().length)}
        />
        {props.isQuote ? (
          <CardPost post={props.post} isQuote className="mt-1" />
        ) : null}
        <hr />
        <div className='actions-bar'>
          <span>{countCharacter}/777 characters</span>
          <button type='submit'
            form={props.isQuote ? 'new-quote' : props.isProfile ? 'new-profile' : 'new-post'}
            className='btn btn-primary'
            disabled={countCharacter === 0 || isLoading}>Post</button>
        </div>
      </form>
    </div>
  );
}

export default NewPostCard;
