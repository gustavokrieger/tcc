import React from "react";
import assert from "assert";
import DropzoneArea from "./DropzoneArea";

export default function App() {

    async function handleDrop(files: File[]) {
        const formData = new FormData();

        for (const file of files) {
            formData.append("file", file, file.name);
        }

        const input = "http://localhost:8080/tcc_backend_war_exploded/code-files";

        const init = {
            method: "POST",
            body: formData,
        }

        const request = new Request(input, init);

        const response = await fetch(request);

        assert(response.ok);

        const result = await response.json();
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
