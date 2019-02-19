CREATE TABLE item
    id              SERIAL  PRIMARY KEY,
    "userId"        INTEGER REFERENCES user,
    "categoryId"    INTEGER REFERENCES category,
    "colorId"       INTEGER REFERENCES color,
    "seasonId"      INTEGER REFERENCES season,
    "occasionId"    INTEGER REFERENCES occasion,
    itemDate
    VARCHAR(64)
INTEGER
DATE
BOOLEAN
TIMESTAMP NOT NULL
FOREIGN KEY REFERENCES