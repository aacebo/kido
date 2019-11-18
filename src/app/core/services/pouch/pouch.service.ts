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

  async get(page?: number, size?: number, limit?: number) {
    await this._db.createIndex({
      index: { fields: ['createdAt'] },
    });

    return await this._db.find({
      limit,
      skip: (page && size) ? (page * size) : undefined,
      selector: { },
      sort: [{
        createdAt: 'desc',
      }],
    });
  }

  async remove(_id: string) {
    const item = await this.getOne(_id);

    if (item) {
      const res = await this._db.remove(item);

      if (!res.ok) {
        throw new Error('ERROR: could not remove');
      }
    }
  }
}
