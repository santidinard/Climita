import React from 'react';
import styles from './Spinner.module.css';
import { ImSpinner2 } from 'react-icons/im';

const Spinner = (props) => {
    return (
        <span className={`${styles.spinner} ${props.cls}`} {...props}>
            <ImSpinner2 />
        </span>
    )
}

export default Spinner;