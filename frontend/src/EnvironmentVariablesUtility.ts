import assert from 'assert';

export default class EnvironmentVariablesUtility {
  private static readonly _directorySeparatorInBackEnd = EnvironmentVariablesUtility.assertNotUndefined(
    process.env.REACT_APP_DIRECTORY_SEPARATOR_IN_BACK_END
  );
  private static readonly _backEndUrl = EnvironmentVariablesUtility.assertNotUndefined(
    process.env.REACT_APP_BACK_END_URL
  );

  private constructor() {}

  private static assertNotUndefined(
    environmentVariable: string | undefined
  ): string {
    assert(
      environmentVariable !== undefined,
      'Some environment variable is not set.'
    );
    return environmentVariable;
  }

  static get directorySeparatorInBackEnd(): string {
    return this._directorySeparatorInBackEnd;
  }

  static get backEndUrl(): string {
    return this._backEndUrl;
  }
}
