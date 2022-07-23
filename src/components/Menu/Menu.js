import { useDispatch, useSelector } from 'react-redux';
import { updateFilterStatus } from '../../store/reducers/configSlice';
import { changePathRoute } from '../utils';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Logo from '../../assets/images/logo.png'

import './menu.scss';
import { setActiveRoute } from '../../store/reducers/routerSlice';
import ProfileImage from '../ProfileImage/ProfileImage';

const Menu = () => {
  const userDetail = useSelector((state) => state.user);
  const activeRoute = useSelector((state) => state.router.pathname);
  const isFiltered = useSelector((state) => state.config.isFiltered);
  const dispatch = useDispatch();

  const changeRoute = (path) => {
    dispatch(setActiveRoute(path));
    changePathRoute(path)
  }

  return (
    <header id='menu-container' className='container'>
      <div className='logo' onClick={() => dispatch(updateFilterStatus(!isFiltered))}>
        <img src={Logo} alt={'Logo posterR'} />
      </div>
      <ProfileImage userDetail={userDetail} />
      <nav>
        <button onClick={() => changeRoute(`/home/${!isFiltered ? 'all' : 'following'}`)} className={activeRoute.includes('/home') ? 'active' : ''}>
          <HomeRoundedIcon />
          <span>Main Page</span>
        </button>
        <button onClick={() => changeRoute(`/${userDetail.username}`)} className={activeRoute.includes(`/${userDetail.username}`) ? 'active' : ''}>
          <PersonOutlineOutlinedIcon />
          <span>Profile</span>
        </button>
      </nav>
    </header>
  );
}

export default Menu;
