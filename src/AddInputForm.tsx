import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

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
            <TextField
                size={"small"}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={"Title"}
                helperText={error}
                onBlur={onBlurHandler}
            />
            <IconButton color='primary' onClick={addItem}> <AddBox/> </IconButton>
        </div>
    )
}