export class ModelMapperService<T> {
    _propertyMapping: any;
    _target: any;
    constructor(type: { new (): T }) {
        this._target = new type();
        this._propertyMapping = this._target.constructor._propertyMap;
    }

    map<T>(source: any) : T[] {
        let targetList: T[] = [];
        source.forEach((sKey: any, sIndex: any) => {
            let target: any = {};
            Object.keys(this._target).forEach((key) => {
                const mappedKey = this._propertyMapping[key];
                if (mappedKey) {
                    target[key] = source[sIndex][mappedKey];
                } else {
                    target[key] = source[sIndex][key];
                }
            });
            targetList.push(target);
        });
        return targetList;
    }
}
