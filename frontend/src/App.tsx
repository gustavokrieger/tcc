import React from "react";
import assert from "assert";
import DropzoneArea from "./DropzoneArea";

export default function App() {

    const handleDrop = async (files: File[]) => {
        const formData = new FormData();

        for (const file of files) {
            formData.append('files', file, file.name);
        }

        const input = "http://localhost:8080/tcc_backend_war_exploded/TestServlet";

        const init = {
            method: "POST",
            body: formData,
        }

        const request = new Request(input, init);

        const response = await fetch(request);

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

    return (
        <div className="app">
            <DropzoneArea
                onDrop={handleDrop}
                acceptedFiles={['.java']}
            />
        </div>
    );

}
