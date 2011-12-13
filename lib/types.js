/**
 * Kanso document types to export
 */

var Type = require('couchtypes/types').Type,
    fields = require('couchtypes/fields'),
    widgets = require('couchtypes/widgets');

var metadata_fields = {
  created_at: fields.createdTime(),
  created_by: fields.creator(),
  updated_at: fields.string(),
  updated_by: fields.creator()
};

var name_fields = {
  first: fields.string(),
  middle: fields.string(),
  last: fields.string(),
  nickname: fields.string()
};

var address_fields = {
  street: fields.string(),
  city: fields.string(),
  state: fields.string(),
  zip: fields.string(),
  phone_day: fields.string(),
  phone_mbl: fields.string(),
  phone_eve: fields.string(),
  email: fields.email()
};

exports.volunteer = new Type('volunteer', {
  fields: {
    name: name_fields,
    address: address_fields,
    app_date: fields.string(),
    birth_date: fields.string(),
    waiver_received: fields.boolean(),
    training_complete: fields.boolean(),
    waiver_received: fields.boolean(),
    notes: {
      other: fields.string()
    },
    metadata: metadata_fields
  }
});

