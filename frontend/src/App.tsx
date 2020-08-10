import React from 'react';

export class App extends React.Component {

    handleClick() {
        console.log("alo")
    }

    render() {
        return (
            <div className="app">
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
        <button
            className="file-upload"
            onClick={props.onClick}>

            {props.value}

        </button>
    );
}
