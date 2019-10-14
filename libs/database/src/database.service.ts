import { Injectable } from '@nestjs/common';
import { Collection, Db, MongoClient } from 'mongodb';

@Injectable()
export class DatabaseService {
  private static connectionURI: string;
  private static mongoClient: MongoClient;

  public static set connectURI(uri: string) {
    if (DatabaseService.connectionURI) {
      throw new Error('URI Couldn\'t set more than once');
    }
    DatabaseService.connectionURI = uri;
  }

  public static get connectURI(): string {
    return DatabaseService.connectionURI;
  }

  private static get client() {
    if (!DatabaseService.mongoClient) {
      if (!DatabaseService.connectURI) {
        throw new Error('Set MongoDB URI First');
      }
      DatabaseService.mongoClient = new MongoClient(DatabaseService.connectURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
    }

    return DatabaseService.mongoClient;
  }

  public static async connect(): Promise<MongoClient> {
    return DatabaseService.client.connect();
  }

  public static get database(): Promise<Db> {
    return new Promise((resolve) => {
      resolve(DatabaseService.connect());
    }).then((client: MongoClient) => {
      return client.db();
    });
  }

  public static collection<T>(name: string): Promise<Collection<T>> {
    return DatabaseService.database.then((db: Db) => {
      return db.collection(name);
    });
  }
}
