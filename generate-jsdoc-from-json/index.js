function getType(item) {
    if (Array.isArray(item)) {
        return 'array';
    }

    if (item === null) {
        return 'null';
    }

    return typeof item;
}

// const json = {
//   body: {
//     body_html: 'It\'s the small iPod with a big idea: Video.',
//     created_at: '2012-02-15T15:12:21-05:00',
//     handle: 'ipod-nano',
//     images: [
//       {
//         position: 1,
//         created_at: '2018-01-08T12:34:47-05:00',
//         updated_at: '2018-01-08T12:34:47-05:00',
//         width: 100,
//         height: 100,
//         src: 'https://fastcode.space/wp-content/uploads/2017/03/a-abstract-logo-design_1043-4-1.jpg',
//         variant_ids: [
//           '808950810',
//         ],
//       },
//     ],
//     options: [
//       {
//         name: 'Color',
//         values: [
//           'Blue',
//           'Black',
//         ],
//       },
//     ],
//     product_type: 'Cult Products',
//     published_at: '2007-12-31T19:00:00-05:00',
//     published_scope: 'global', // web, global
//     tags: 'Emotive, Flash Memory, MP3, Music',
//     template_suffix: 'product.liquid',
//     title: 'DDD IPod Nano - 8GB',
//     metafields_global_title_tag: 'IPod Nano - White, 8GB',
//     metafields_global_description_tag: 'It\'s the small iPod with a big idea: Video.',
//     updated_at: '2012-08-24T14:01:47-04:00',
//     variants: [
//       {
//         barcode: '1234_pink',
//         compare_at_price: 250,
//         created_at: '2012-08-24T14:01:47-04:00',
//         fulfillment_service: 'manual',
//         grams: 567,
//         weight: 0.2,
//         weight_unit: 'kg',
//         inventory_item_id: '341629',
//         inventory_management: 'shopify',
//         inventory_policy: 'continue',
//         inventory_quantity: 10,
//         option1: 'Pink',
//         position: 1,
//         price: 239.99,
//         requires_shipping: true,
//         sku: 'IPOD2008PINK',
//         taxable: true,
//         title: 'Pink',
//         updated_at: '2012-08-24T14:01:47-04:00',
//       },
//     ],
//     vendor: 'Apple',
//     published: true
//   },
// };
//
// const test = {
//   price: 239.99,
//   requires_shipping: true,
//   sku: 'IPOD2008PINK',
//   taxable: true,
//   title: 'Pink',
//   updated_at: '2012-08-24T14:01:47-04:00',
//   asd: {
//     qwe: 123,
//     zxc: 'asdqwe'
//   },
//   qwe: [
//     'asdasd',
//     'ojojjio',
//     {
//       qwe: 123
//     }
//   ],
// };

function generateJsDocFromJson(json) {
  function generate(json, rootName = 'root', ignoreObject) {
    const valueType = getType(json);
    let paramLine;

    if (valueType === 'object') {
      paramLine = ignoreObject ? '' : `@param {Object} ${rootName}\n`;
    } else if (valueType === 'array') {
      const arrayFirstItem = json[0];

      if (!arrayFirstItem) {
        return `@param {Array} ${rootName}\n`;
      }

      const arrayFirstItemType = getType(arrayFirstItem);

      const newLine = `@param {${arrayFirstItemType === 'object' ? 'Object[]' : arrayFirstItemType + '[]'}} ${rootName}\n`;

      if (['number', 'string', 'boolean'].includes(arrayFirstItemType)) {
        return newLine;
      } else if (arrayFirstItemType === 'object') {
        return `${newLine}${generate(arrayFirstItem, rootName + '[]', true)}`
      } else if (arrayFirstItemType === 'array') {
        return `${newLine}${generate(arrayFirstItem, rootName + '[]')}`
      }

      paramLine = `@param {Array} ${rootName}\n`;

    } else if (['number', 'string', 'boolean'].includes(valueType)) {
      return `@param {${valueType}} ${rootName}\n`;
    }

    return Object.entries(json).reduce((str, [key, value]) => {
      const line = `${str}${generate(value, rootName + '.' + key )}`;
      return line;
    }, paramLine);
  }

  const generated = generate(json);

  return `/**\n${generated.split('\n').slice(0, -1).map(i => ' * ' + i).join('\n')}\n*/`
}

// console.log('generateJsDocFromJson(json)\n', generateJsDocFromJson(json));
