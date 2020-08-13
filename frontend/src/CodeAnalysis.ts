import assert from 'assert';

export default class CodeAnalysis {
  async run(files: File[]) {
    const request = this.createCodeFilesRequest(files);
    const response = await this.sendRequest(request);
    return await response.json();
  }

  private createCodeFilesRequest(files: File[]) {
    const input = 'http://localhost:8080/tcc_backend_war_exploded/code-files';

    const formData = new FormData();

    for (const file of files) {
      formData.append('file', file, file.name);
    }

    const init = {
      method: 'POST',
      body: formData,
    };

    return new Request(input, init);
  }

  private async sendRequest(request: Request) {
    const response = await fetch(request);
    assert(response.ok);
    return response;
  }

}
