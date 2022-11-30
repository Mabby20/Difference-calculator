import fs from "fs";
import path from "path";
import _ from "lodash";

const compare = (obj1, obj2) => {
    const commonKeys = [...Object.keys(obj1), ...Object.keys(obj2)];
    const uniqKeys = _.sortBy(_.uniq(commonKeys));

    const lines = uniqKeys.reduce((acc, currentKey) => {
        if (_.has(obj1, currentKey) && _.has(obj2, currentKey)) {
            if (obj2[currentKey] === obj1[currentKey]) {
                return [...acc, `    ${currentKey}: ${obj1[currentKey]}`]
            }
            return [...acc, `  - ${currentKey}: ${obj1[currentKey]}`, `  + ${currentKey}: ${obj2[currentKey]}`]
        }
        if(_.has(obj1, currentKey) && !_.has(obj2, currentKey)) {
            return [...acc, `  - ${currentKey}: ${obj1[currentKey]}`]
        }
        if(!_.has(obj1, currentKey) && _.has(obj2, currentKey)) {
            return [...acc, `  + ${currentKey}: ${obj2[currentKey]}`]
        }
    }, []);

    const res = ['{', ...lines, '}'].join('\n');
    return res;
}

export default (filePath1, filePath2, type = 'json') => {
    let obj1;
    let obj2;
    if (type === "json") {
        obj1 = JSON.parse(fs.readFileSync(path.resolve(filePath1)));
        obj2 = JSON.parse(fs.readFileSync(path.resolve(filePath2)));
    }
    const res = compare(obj1, obj2);
    return res;
};
