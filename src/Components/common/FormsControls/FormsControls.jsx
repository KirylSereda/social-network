import React from "react";
import styles from "./FormsControls.module.css";
import {Field} from "redux-form";

const FormControl = ({ input, meta, child, Element, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.form_control + ' ' + (hasError ? styles.error : "")}>
            <div>
            <Element {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div >
    )
}

export const Textarea = (props) => {
    return <FormControl {...props} Element={'textarea'} ></FormControl>
}

export const Input = (props) => {
    return <FormControl {...props} Element={'input'}></FormControl>
}

export const createField = (placeholder, name, validators, component, props = {}, text = "") => (
    <div  >
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> <div> {text}</div>
    </div>
)