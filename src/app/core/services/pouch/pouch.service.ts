import PouchDB from 'pouchdb';

import { environment } from '../../../../environments/environment';

export class PouchService<T = any> {
  private readonly _prefix = 'kido--';
  private readonly _db: PouchDB.Database<T>;

  constructor(private readonly _name: string) {
    this._db = new PouchDB<T>(`${this._name}`, {
      revs_limit: 1,
      auto_compaction: true,
      size: environment.maxDbSizeMb,
      prefix: this._prefix,
      name: this._name,
    });
  }

  async put(item: T) {
    const res = await this._db.put(item);

    if (!res.ok) {
      throw new Error('ERROR: could not add/update');
    }

    return {
      ...item,
      _rev: res.rev,
    };
  }

  getOne(_id: string) {
    return this._db.get(_id);
  }

  async get(page?: number, size?: number, limit?: number, filter?: any) {
    await this._db.createIndex({
      index: { fields: ['createdAt', ...(filter ? Object.keys(filter) : [])] },
    });

    return await this._db.find({
      limit,
      skip: (page && size) ? (page * size) : undefined,
      selector: {
        ...filter,
        createdAt: { $gt: null },
      },
      sort: [{
        createdAt: 'desc',
      }],
    });
  }

  async remove(_id: string, _rev: string) {
    const res = await this._db.remove(_id, _rev);

    if (!res.ok) {
      throw new Error('ERROR: could not remove');
    }
  }

  bulk(docs: PouchDB.Core.Document<T>[]) {
    return this._db.bulkDocs(docs);
  }

  async removeWhere(filter: any) {
    const docs = await this.get(0, environment.maxMessages, environment.maxMessages, filter);
    return this._db.bulkDocs(docs.docs.map(d => ({
      ...d,
      _deleted: true,
    })));
  }
}
