import React from "react";
import {DropzoneArea as InnerDropzoneArea} from "material-ui-dropzone";

type Props = {
    onDrop: (files: File[]) => void,
    acceptedFiles: string[],
}

export default function DropzoneArea(props: Props) {

    return (
        <InnerDropzoneArea
            onDrop={props.onDrop}
            acceptedFiles={props.acceptedFiles}
        />
    )

}
