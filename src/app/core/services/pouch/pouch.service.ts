import PouchDB from 'pouchdb';

import { environment } from '../../../../environments/environment';

export class PouchService<T = any> {
  private readonly _prefix = 'koda--';
  private readonly _db: PouchDB.Database<T>;

  constructor(private readonly _name: string) {
    this._db = new PouchDB<T>(`${this._prefix}${this._name}`, {
      revs_limit: 1,
      auto_compaction: true,
      size: environment.maxQueue,
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

  async get() {
    return await this._db.find({ selector: {  } });
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
