import React from 'react';
import s from './Post.module.css';
import imgForPost from './../../../../assets/images/circle.jpg'

const Post = (props) => {
  return (
<div className={s.post}>
   <div className={s.innerPost}>
        <img className={s.innerPost__img} src={imgForPost} />
        <div className={s.innerPost__content}>
               <div className={s.writerPost}>Kiryll Serada</div>
               <div className={s.textPost}>{props.message}</div>
        </div>
   </div>
        <hr className={s.lineForPost} />
   <div>
        &#128155;{props.likesCount}
   </div>
</div>
  )
};

export default Post;