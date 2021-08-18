
export const generateQuery = (query) => {
    let url = '';

    return (
        url +
        Object.keys(query).reduce((accumulator, key, index) => {
            if (
                query[key] == '' ||
                query[key] == null ||
                key == 'url_id' ||
                (query[key] !== null && query[key].toString().trim() == '')
            ) {
                return accumulator;
            } else {
                return accumulator + `${index != 0 ? '&' : '?'}${key}=${query[key]}`;
            }
        }, '')
    );
};



export const addQuery = (dataObject, apiObject) => {
    if (!dataObject) {
      return '';
    }
  
    const keys = [
      'page',
      'limit',
      'search'
    ];
  
    keys.map((key) => {
      if (dataObject.hasOwnProperty(key) && typeof dataObject[key] != 'object') {
        if (apiObject.query.hasOwnProperty(key)) {
          apiObject.addQuery = { key, payload: dataObject[key] };
        }
      } else {
        dataObject[key] &&
          Object.keys(dataObject[key]).map((keyName) => {
            if (apiObject.query.hasOwnProperty(keyName)) {
              apiObject.addQuery = { key: keyName, payload: dataObject[key][keyName] };
            }
          });
      }
    });
  };