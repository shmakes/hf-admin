exports.pairedByFlightStatusBus = {
  map: function(doc) {
    if (doc.type == "Veteran") {
      emit([doc.flight.id, doc.flight.status, doc.flight.bus, doc.type, (doc.guardian.id.length > 0)], 1);
    } else if (doc.type == "Guardian") {
      emit([doc.flight.id, doc.flight.status, doc.flight.bus, doc.type, (doc.veteran.pairings.length > 0)], 1);
    }
  },
  reduce: function (key, values) {
    return sum(values);
  }
};

exports.medical_counts = {
  map: function(doc) {
    var flight
    if (doc.type === "Veteran") {
      flight = doc.flight.id;
      if (doc.medical.usesWheelchair) {
        emit([flight, "wheelchair"], 1);
      }
      if (doc.medical.isWheelchairBound) {
        emit([flight, "wheelchair bound"], 1);
      }
      if (doc.medical.usesCane) {
        emit([flight, "cane"], 1);
      }
      if (doc.medical.usesWalker) {
        emit([flight, "walker"], 1);
      }
      if (doc.medical.requiresOxygen) {
        emit([flight, "oxygen"], 1);
      }
    }
  },
  reduce: function (key, values) {return sum(values);}
};

exports.pairingErrorsFromVetsRef = {
  map: function(doc) {
    if ((doc.guardian) && (doc.guardian.id.length > 0)) {
      emit(doc.name.first + " " + doc.name.last, 1);
    }
    if ((doc.veteran) && (doc.veteran.pairings.length > 0)) {
      emit(doc.veteran.pairings[0].name, 1);
    }
  },
  reduce: function (key, values) {return sum(values);}
};

exports.pairingErrorsFromGrdsRef = {
  map: function(doc) {
    if ((doc.veteran) && (doc.veteran.pairings.length > 0)) {
      emit(doc.name.first + " " + doc.name.last, 1);
    }
    if ((doc.guardian) && (doc.guardian.id.length > 0)) {
      emit(doc.guardian.name, 1);
    }
  },
  reduce: function (key, values) {return sum(values);}
};

exports.counts_creation = {
  map: function(doc) {
    if(doc.metadata) {
      emit([doc.metadata.created_at.substr(0,7), doc.metadata.created_by, doc.type], 1);
    }
  },
  reduce: function (key, values) {return sum(values);}
};

exports.counts_updates = {
  map: function(doc) {
    if(doc.metadata) {
      emit([doc.metadata.updated_at.substr(0,7), doc.metadata.updated_by, doc.type], 1);
    }
  },
  reduce: function (key, values) {return sum(values);}
};

exports.counts_status_changes = {
  map: function(doc) {
    var change, person, changeType;
    if((doc.flight) && (doc.flight.history)) {
      for (var i in doc.flight.history) {
        change = doc.flight.history[i].change;
        person = change.substr(change.indexOf("by: ", 0) + 4)
        changeType = change.substring(8, change.indexOf("from:") - 1);
        emit([doc.flight.history[i].id.substr(0,7), person, changeType], 1);
      }
    }
  },
  reduce: function (key, values) {return sum(values);}
};

exports.counts_pairing_changes = {
  map: function(doc) {
    var change, person, changeType;
    if((doc.veteran) && (doc.veteran.history)) {
      for (var i in doc.veteran.history) {
        change = doc.veteran.history[i].change;
        person = change.substr(change.indexOf("by: ", 0) + 4);
        changeType = change.substring(0, change.indexOf(" "));
        emit([doc.veteran.history[i].id.substr(0,7), person, changeType], 1);
      }
    }
  },
  reduce: function (key, values) {return sum(values);}
};

exports.counts_confirmed = {
  map: function(doc) {
    if ((doc.flight) && (doc.flight.confirmed_date)) {
      emit([doc.flight.id, doc.type, doc.flight.status], 1);
    }
  },
  reduce: function (key, values) {return sum(values);}
};
