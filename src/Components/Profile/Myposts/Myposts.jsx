import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import style from './Myposts.module.css';
import Post from './Post/Post';
import bodyStyle from './../../../body.module.css'
import cn from "classnames";

let maxLength10 = maxLengthCreator(10);

const Myposts = (props) => {

  let postsElements =
    props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  let onAddPost = (values) => {
    props.AddPost(values.newPostText);
  }

  return (
    <div>
      <div className={style.add_post}>
        <div>New Post</div>
        <AddPostFormRedux onSubmit={onAddPost} />
      </div>
      <div className={style.posts}>
        {postsElements}
      </div>
    </div>
  )
}


const postForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} >
      <div className={style.textarea_for_new_post}>
        <Field component={Textarea} name={'newPostText'} placeholder={'enter your post'}
          validate={[required, maxLength10]} />
      </div>
      <div>
        <button className={cn( bodyStyle.btn, style.post_button) }>Add post</button>
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm({ form: 'postAddMessageForm' })(postForm);

export default Myposts;