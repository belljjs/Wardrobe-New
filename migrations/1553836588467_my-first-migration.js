
exports.shorthands = { 
  id:{ type: 'serial', unique: true, notNull: true, primaryKey: true }
};

exports.up = (pgm) => {
  pgm.createTable("users", {
      id: "id",
      first_name: { type: "varchar(256)", notNull: true },
      last_name: { type: "varchar(256)", notNull: true },
      email: { type: "varchar(256)", notNull: true, unique: true },
      pw: { type: "varchar(256)", notNull: true },
      signup_date: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp")
      }
    });

  pgm.createTable("cities", {
    id: "id",
    city_name: { type: "varchar(256)", notNull: true },
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "cascade"
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
  
  pgm.createTable("outfits", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "cascade"
    },
    weather_name: { type: "varchar(256)", notNull: true }, 
    weather_icon: { type: "varchar(256)", notNull: true }, 
    high_temp: { type: "integer", notNull: true }, 
    low_temp: { type: "integer", notNull: true }, 
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    },
  });

  pgm.createTable("items", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
        references: "users",
        onDelete: "cascade"

    },
    image_key: { type: "varchar(256)", notNull: true }, 
    image_location : { type: "varchar(256)", notNull: true }, 
    category : { type: "varchar(256)", notNull: true },
    color : { type: "varchar(256)", notNull: true },
    season : { type: "varchar(256)", notNull: true },
    occasion : { type: "varchar(256)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createTable("outfit_items", {
    // id: "id",
    outfit_id: {
      type: "integer",
      primaryKey: true,
      notNull: true,
      references: "outfits",
      onDelete: "cascade"
    },
    item_id: {
      type: "integer",
      primaryKey: true,
      notNull: true,
      references: "items",
      onDelete: "cascade"
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
      }
  });

};




exports.down = (pgm) => {

};


