import AV from 'leancloud-storage'

export class Entity {
  private _object: AV.Object

  constructor(entity: AV.Object) {
    this._object = entity
  }

  public static from(object: AV.Object | AV.Queriable): Entity
  public static from<T extends Entity>(object: AV.Object[] | AV.Queriable[], entity: new (obj: AV.Object) => T): T[]
  public static from<T extends Entity>(object: any, entity: new (obj: AV.Object) => T): T
  public static from(object, entity?) {
    if (!object) {
      throw Error('数据实体不能为空')
    }

    // 生成实体
    const generatorEntity = creator => {
      if (object instanceof Array) {
        return object.map(x => creator())
      } else {
        return creator()
      }
    }

    if (entity) {
      return generatorEntity(() => new entity(object))
    } else {
      return generatorEntity(() => new Entity(object))
    }
  }

  public get object() {
    if (!this.valid) {
      throw new Error('entity not init')
    }

    return this._object
  }

  public get attributes() {
    return {
      ...this.object.attributes,
      id: this.id
    }
  }

  public get value() {
    return this.object.attributes
  }

  public get id() {
    return this.object.id
  }

  public get get() {
    return this.object.get
  }

  public get set() {
    return this._object.set.bind(this._object)
  }

  public get save() {
    return this._object.save.bind(this._object)
  }

  public get fetch() {
    return this._object.fetch.bind(this._object)
  }

  public valid() {
    return this._object && this._object instanceof AV.Object
  }
}
