function generateJsonFromJsonSchema(schema) {
    if (schema.type === 'object') {
        if (!schema.properties) {
            return {};
        }

        return Object.keys(schema.properties).reduce((object, propertyName) => {
            object[propertyName] = generateJsonFromJsonSchema(schema.properties[propertyName]);

            return object;
        }, {});
    }

    if (schema.type === 'integer') {
        return Math.round(Math.random() * 1000);
    }

    if (schema.type === 'string') {
        return schema.enum ? schema.enum[0] : `string ${Math.round(Math.random() * 10000)}`;
    }

    if (schema.type === 'number') {
        return Math.random();
    }

    if (schema.type === 'array') {
        if (!schema.items) {
            return [];
        }

        const arrLenth = Math.round(Math.random() * 3);

        return Array(arrLenth).join('.').split('.').reduce(arr => {
            return arr.concat([generateJsonFromJsonSchema(schema.items)]);
        }, []);
    }

    if (schema.type === 'boolean') {
        return Math.random() > 0.5;
    }

    if (schema.type === 'any') {
        return `string from type "any" ${Math.round(Math.random() * 10000)}`;
    }

    throw 'schema is not valid';
}
