export class MapperService {
    private _propertyMapping: any;
    private _target: any;

    /**
     * @ngdoc method
     * @name $MapperService
     * @description it is mapping service which maps API response Column and Data to UI Custom Column dynamically.
     *              Uses propertyMap to get dynamically model Class properties
     * @param  type Type is a Model is of type T1 with API Property Attribute
     * @param source Source is a data to mapped to return Type
     * @returns {*} return array of data of T2
     */

    map<T1, T2>(type: { new (): T1 }, source: any): T2[] {
        this._target = new type();
        this._propertyMapping = this._target.constructor._propertyMap;
        let targetList: T2[] = [];
        if (source && source.length) {
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
        }
        return targetList;
    }
}
