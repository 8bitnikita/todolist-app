import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddInputFormPropsType = {
    addItem: (title: string) => void
}

export const AddInputForm = (props: AddInputFormPropsType) => {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addItem()
        }
    }
    const onBlurHandler = () => {
        setError(null)
    }

    // Function that checks Input and add Error message
    let addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Enter the title!')
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error': ''}
                   onBlur={onBlurHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}