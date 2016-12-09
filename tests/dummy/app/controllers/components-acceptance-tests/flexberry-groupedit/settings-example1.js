import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import { translationMacro as t } from 'ember-i18n';
const { getOwner } = Ember;

export default EditFormController.extend({
  /**
    Name of selected detail's model projection.

    @property _detailsProjectionName
    @type String
    @private
   */
  _detailsProjectionName: 'DetailE',

  /**
    Array of available detail's model projections.

    @property _detailsProjections
    @type Object[]
   */
  _detailsProjections: Ember.computed('model.details.relationship.belongsToType', function() {
    let detailsModelName = this.get('model.details.relationship.belongsToType');
    let detailsClass = getOwner(this)._lookupFactory('model:' + detailsModelName);

    return Ember.get(detailsClass, 'projections');
  }),

  /**
    Array of available detail's model projections names.

    @property _detailsProjectionsNames
    @type String[]
   */
  _detailsProjectionsNames: Ember.computed('_detailsProjections.[]', function() {
    let detailsProjections = this.get('_detailsProjections');
    if (Ember.isNone(detailsProjections)) {
      return [];
    }

    return Object.keys(detailsProjections);
  }),

  /**
    Model projection for 'flexberry-groupedit' component 'modelProjection' property.

    @property detailsProjection
    @type Object
   */
  detailsProjection: Ember.computed('_detailsProjections.[]', '_detailsProjectionName', function() {
    let detailsProjectionName = this.get('_detailsProjectionName');
    if (Ember.isBlank(detailsProjectionName)) {
      return null;
    }

    let detailsModelName = this.get('model.details.relationship.belongsToType');
    let detailsClass = getOwner(this)._lookupFactory('model:' + detailsModelName);
    let detailsClassProjections = Ember.get(detailsClass, 'projections');
    if (Ember.isNone(detailsClassProjections)) {
      return null;
    }

    return detailsClassProjections[detailsProjectionName];
  }),

  /**
    Text for 'flexberry-groupedit' component 'placeholder' property.

    @property placeholder
    @type String
   */
  placeholder: t('components.flexberry-groupedit.placeholder'),
  /**
    Handles changes in placeholder.

    @method _placeholderChanged
    @private
   */
  _placeholderChanged: Ember.observer('placeholder', function() {
    if (this.get('placeholder') === this.get('i18n').t('components.flexberry-groupedit.placeholder').toString()) {
      this.set('placeholder', t('components.flexberry-groupedit.placeholder'));
    }
  }),
  /**
    Flag: indicates whether 'flexberry-groupedit' component is in 'readonly' mode or not.

    @property readonly
    @type Boolean
   */
  readonly: false,

  /**
    Flag for 'flexberry-groupedit' component 'tableStriped' property.

    @property tableStriped
    @type Boolean
   */
  tableStriped: true,

  /**
    Flag for 'flexberry-groupedit' component 'createNewButton' property.

    @property createNewButton
    @type Boolean
   */
  createNewButton: true,

  /**
    Flag for 'flexberry-groupedit' component 'deleteButton' property.

    @property deleteButton
    @type Boolean
   */
  deleteButton: true,

  /**
    Flag for 'flexberry-groupedit' component 'allowColumnResize' property.

    @property allowColumnResize
    @type Boolean
   */
  allowColumnResize: true,

  /**
    Flag for 'flexberry-groupedit' component 'showAsteriskInRow' property.

    @property showAsteriskInRow
    @type Boolean
   */
  showAsteriskInRow: true,

  /**
    Flag for 'flexberry-groupedit' component 'showCheckBoxInRow' property.

    @property showCheckBoxInRow
    @type Boolean
   */
  showCheckBoxInRow: true,

  /**
    Flag for 'flexberry-groupedit' component 'showDeleteButtonInRow' property.

    @property showDeleteButtonInRow
    @type Boolean
   */
  showDeleteButtonInRow: false,

  /**
    Flag for 'flexberry-groupedit' component 'showDeleteButtonInRow' property.

    @property showDeleteButtonInRow
    @type Boolean
   */
  showEditMenuItemInRow: false,

  /**
    Flag for 'flexberry-groupedit' component 'showDeleteButtonInRow' property.

    @property showDeleteButtonInRow
    @type Boolean
   */
  showDeleteMenuItemInRow: false,

  /**
    Text for 'flexberry-groupedit' component 'singleColumnHeaderTitle' property.

    @property singleColumnHeaderTitle
    @type Boolean
   */
  singleColumnHeaderTitle: undefined,

  /**
    Flag for 'flexberry-groupedit' component 'rowClickable' property.

    @property rowClickable
    @type Boolean
   */
  rowClickable: false,

  /**
    Flag for 'flexberry-groupedit' component 'immediateDelete' property.

    @property immediateDelete
    @type Boolean
   */
  immediateDelete: false,

  /**
    Method to get type and attributes of a component,
    which will be embeded in object-list-view cell.

    @method getCellComponent.
    @param {Object} attr Attribute of projection property related to current table cell.
    @param {String} bindingPath Path to model property related to current table cell.
    @param {DS.Model} modelClass Model class of data record related to current table row.
    @return {Object} Object containing name & properties of component, which will be used to render current table cell.
    { componentName: 'my-component',  componentProperties: { ... } }.
   */
  getCellComponent: function(attr, bindingPath) {
    var cellComponent = this._super(...arguments);

    if (attr.kind === 'belongsTo' && bindingPath === 'master') {
      cellComponent.componentProperties = {
        projection: 'MasterL',
        displayAttributeName: 'text',
        title: 'Master',
        relationName: 'master',
        choose: 'showLookupDialog',
        remove: 'removeLookupValue'
      };
    }

    return cellComponent;
  }
});
