import React from "react";
import {UploadButton} from "./UploadButton";
import assert from "assert";

export class App extends React.Component {

    // todo tentar remover construtor
    constructor(props: Readonly<{}>) {
        super(props);

        this.handleUploadButtonChange = this.handleUploadButtonChange.bind(this);
    }

    async handleUploadButtonChange(event: React.ChangeEvent<HTMLInputElement>) {
        assert(event.target.files !== null)

        const file = event.target.files[0];

        const formData = new FormData();

        formData.append(
            "myFile",
            file,
            file.name
        );

        const input = "http://localhost:8080/tcc_backend_war_exploded/TestServlet";

        const init = {
            method: "POST",
            body: formData,
            // todo ver ser precisa de header
            // headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }

        const response = await fetch(input, init);

        assert(response.ok)

        // todo continuar
        // if (response.body !== null) {
        //     // body is ReadableStream<Uint8Array>
        //     // parse as needed, e.g. reading directly, or
        //     const asString = new TextDecoder("utf-8").decode(response.body);
        //     // and further:
        //     const asJSON = JSON.parse(asString);  // implicitly 'any', make sure to verify type on runtime.
        // }

    }

    render() {
        return (
            <div className="app">
                <UploadButton
                    onChange={this.handleUploadButtonChange}
                />
            </div>
        );
    }
}
