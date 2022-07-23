/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert, updateFilterStatus } from '../../store/reducers/configSlice';
import { setActiveRoute } from '../../store/reducers/routerSlice';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './home.scss';
import { changePathRoute, getCountPostsByDay } from '../../components/utils';
import { getPosts, getPostsByUser, getProfile, updateFollow } from '../../services/postsService';
import CardPost from '../../components/CardPost/CardPost';
import ModalDefault from '../../components/Modal/Modal';
import { updatePostsList } from '../../store/reducers/postsSlice';
import NewPostCard from '../../components/NewPostCard/NewPostCard';
import { updateCountPostByDay } from '../../store/reducers/profileSlice';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { setFollowing } from '../../store/reducers/userSlice';

const Home = () => {
  const [profileActive, setProfileActive] = useState(null);
  const [isProfilePage, setIsProfilePage] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const isFiltered = useSelector((state) => state.config.isFiltered);
  const activeRoute = useSelector((state) => state.router.pathname);
  const userDetail = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts.list);
  const dispatch = useDispatch();

  const handleActiveRoute = (value) => {
    const newPathname = `/home/${!value ? 'all' : 'following'}`;
    changePathRoute(newPathname)
    dispatch(setActiveRoute(newPathname));
  }

  const handleToggleChange = ({target}) => {
    handleActiveRoute(target.checked);
    dispatch(updateFilterStatus(target.checked));
  }
  
  const handleCloseModal = () => {
    handleActiveRoute(isFiltered);
    setProfileActive(null);
    setIsProfilePage(false);
    setIsFollowing(false);
    handleUpdatePosts();
  };

  const handleFollow = async () => {
    const newFollowing = [...userDetail.following];
    isFollowing
      ? newFollowing.splice(userDetail.following.indexOf(profileActive.id), 1)
      : newFollowing.push(profileActive.id);
      
    const objCurrentUser = {
      ...userDetail,
      following: newFollowing
    }

    const newFollowers = [...profileActive.followers];
    isFollowing
      ? newFollowers.splice(profileActive.followers.indexOf(userDetail.id), 1)
      : newFollowers.push(userDetail.id);

    const objProfileActive = {
      ...profileActive,
      followers: newFollowers
    }
       
    const respCurrent = await updateFollow(objCurrentUser);
    const respProfile = await updateFollow(objProfileActive);
    dispatch(setFollowing(respCurrent.data)); 
    setProfileActive(respProfile.data);
    setIsFollowing(!isFollowing);
  }

  const handleUpdatePosts = useCallback(async () => {
    const resp = await getPosts(isFiltered);
    const countPosts = getCountPostsByDay(resp.data, userDetail.id);
    const listPosts = isFiltered
      ? resp.data.filter(post => userDetail.following.indexOf(post.user.id) > -1)
      : resp.data;
    dispatch(updateCountPostByDay(countPosts));
    dispatch(updatePostsList(listPosts));
  }, [isFiltered, userDetail, dispatch]);
  
  const handleUpdatePostsByProfile = () => {
    setIsLoadingProfile(true);
  };

  const handleProfileDetail = useCallback(async () => {
    if (!activeRoute.includes('/home') && userDetail) {
      const resp = await getProfile(activeRoute.replace('/', ''));
      if (resp.data?.length > 0) {
        const resPostsByUser = await getPostsByUser(resp.data[0].id);
        const postsByUser = resPostsByUser.data ?? [];
        let date = new Date(resp.data[0].createAt);
        date = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
        const profile = {
          ...resp.data[0],
          createAt: date,
          posts: postsByUser
        }

        setIsFollowing(userDetail.following.indexOf(profile.id) > -1)
        setProfileActive(profile)
      } else {
        dispatch(showAlert({isShowing: true, msg: 'PROFILE_NOT_FOUND'}));
        handleActiveRoute(isFiltered);
      }
      setIsLoadingProfile(false);
    }
  }, [activeRoute, userDetail]);

  useEffect(() => {
    if (activeRoute.includes('/home')) {
      setIsProfilePage(false);
    } else {
      setIsProfilePage(true)
      setIsLoadingProfile(true);
    }
  },[activeRoute]);

  useEffect(() => {
    if(isLoadingProfile) {
      handleProfileDetail();
    }
  }, [handleProfileDetail, isLoadingProfile]) 

  useEffect(() => {
    handleUpdatePosts();
  }, [handleUpdatePosts])   

  return (
    <section id='home-container' className='container'>
      <header>
        <h2>Post feed</h2>
        <label>
          <span>Only following</span>
          <Toggle
            className='toggle-custom'
            checked={isFiltered}
            icons={false}
            onChange={handleToggleChange}
          />
        </label>
      </header>
      <NewPostCard onCreatePost={handleUpdatePosts}  />
      {posts.map((post, index) => (
        <CardPost post={post} key={`card-post-${index}`} onCreatePost={handleUpdatePosts} />
      ))}

      <ModalDefault open={isProfilePage} onClose={handleCloseModal} isProfile>
        {!profileActive ? (
          <span>Loading...</span>
        ) : (
          <>
            <div className='action-header-bar'><ArrowBackOutlinedIcon onClick={handleCloseModal} /> Profile Page</div>
            <div className='profile-header'>
              <ProfileImage userDetail={profileActive} size='big' />
              {
                profileActive.id !== userDetail.id
                  ? <button
                      className={`btn ${isFollowing ? 'btn-unfollow' : 'btn-primary'} btn-follow`}
                      onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
                  : null
              }
            </div>
            <div className='details-container'>
              <span><CalendarMonthIcon /> Joined in {profileActive.createAt}</span>
              <span><strong>{profileActive.posts.length}</strong> Posts</span>
              <span><strong>{profileActive.following.length}</strong> Following</span>
              <span><strong>{profileActive.followers.length}</strong> Followers</span>
            </div>

            <div className='posts-container'>
              {profileActive.id === userDetail.id && <NewPostCard onCreatePost={handleUpdatePostsByProfile} isProfile  />}
              <div className='list-container'>
                {profileActive.posts.map((post, index) => (
                  <CardPost post={post} key={`card-post-${index}`} onCreatePost={handleUpdatePostsByProfile} />
                ))}
              </div>
            </div>
          </>
        )}
      </ModalDefault>
    </section>
  );
}

export default Home;
