import { Connection } from './utils/connection';

export class AboutClient {
  async getVersion(): Promise<string> {
    const connection = Connection.getConnection();

    //TODO: url constant
    return (await connection.getJson('about')).version;
  }
}
