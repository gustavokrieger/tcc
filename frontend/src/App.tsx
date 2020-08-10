import React from 'react';
import {Button} from '@material-ui/core';
import {UploadButton} from './UploadButton';

export class App extends React.Component {

    handleClick() {
        console.log("alo")
    }

    render() {
        return (
            <div className="app">
                <UploadButton/>
                <FileUpload
                    value={1}
                    onClick={() => this.handleClick()}
                />
            </div>
        );
    }
}

type FileUploadProps = {
    value: number,
    onClick: () => void
}

function FileUpload(props: FileUploadProps) {
    return (
        <Button className="file-upload" variant="contained" onClick={props.onClick}>
            {props.value}
        </Button>
    );
}
