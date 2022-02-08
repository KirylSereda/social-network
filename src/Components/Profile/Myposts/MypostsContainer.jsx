import { connect } from 'react-redux';
import { addPostActionCreator} from '../../Redux/profile-reducer';
import Myposts from './Myposts';

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      AddPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    }
  }
};

const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts);

export default MypostsContainer;