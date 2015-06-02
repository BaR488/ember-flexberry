import ApplicationSerializer from '../serializers/application';

// TODO? or override extractArray in ApplicationSerializer.
// (http://emberjs.com/api/data/classes/DS.RESTSerializer.html#method_extractArray)
export default ApplicationSerializer.extend({
  // Раньше можно было определить primaryKey как функцию, и задать один алгоритм для всех сериализаторов.
  // Щас либо по отдельности для каждого задавать это свойство, либо переопределять функции,
  // в которых задействован primaryKey (нужно иметь ввиду, что Ember Data в бете).
  primaryKey: 'ContextID',

  normalizePayload: function(payload) {
    // TODO: refactor using extractSingle and extractArray.
    if (payload.value) {
      payload.contexts = payload.value;
      delete payload.value;
    } else {
      payload = { context: payload };
    }

    return payload;
  }
});