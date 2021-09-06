import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const editModeDoubleClick = () => {
        setEditMode(!editMode)
    }

    const editableInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onBlur = () => {
        setEditMode(false);
    }

    return (
        <>
            {editMode
                ? <input onChange={editableInput} autoFocus onBlur={onBlur} value={title}/>
                : <span onDoubleClick={editModeDoubleClick}>{title} </span>}
        </>
    )
}