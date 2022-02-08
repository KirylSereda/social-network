import React from 'react';
import s from './Dialogs.module.css';
import bodyStyle from './../../body.module.css'
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const Dialogs = (props) => {

    let dialogsElements =
        props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);

    let messageElements =
        props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} />);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    if (!props.isAuth) { 
        return <Redirect to={"/login"} />
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
                < AddMessageFormRedux onSubmit={addNewMessage}  />
            </div>
        </div>
    )
}

const maxLength50=maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} 
            validate={[required,maxLength50]}
            name={'newMessageBody'} placeholder={'enter your message'} />
        </div>
        <div>
            <button className={bodyStyle.btn}> Send</button>
        </div>
    </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

export default Dialogs;
