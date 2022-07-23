
import { useDispatch } from 'react-redux';
import imgUserDefault from '../../assets/images/profile-image.png';
import { setActiveRoute } from '../../store/reducers/routerSlice';
import { changePathRoute } from '../utils';

import './profileImage.scss';

const ProfileImage = ({userDetail = '', linear, size = '', onlyImage, className=''}) => {
  const dispatch = useDispatch();

  const acessProfile = () => {
    if (!onlyImage) {
      changePathRoute(`/${userDetail.username}`)
      dispatch(setActiveRoute(`/${userDetail.username}`));
    }
  }

  return (
    <div className={`profile-container ${size} ${className} ${onlyImage && 'no-profile'}`}>
      <img src={userDetail?.photo ? userDetail.photo : imgUserDefault} alt='user' onClick={acessProfile} />
      {!onlyImage ? (
        <div className={`user-detail ${linear ? 'linear' : ''}`} onClick={acessProfile}>
          <div className='user-name'>{userDetail.name}</div>
          <div className='user-username'>@{userDetail.username}</div>
        </div>
      ) : null}
    </div>
  );
}

export default ProfileImage;
