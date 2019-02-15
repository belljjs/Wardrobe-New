
const DEFAULT_PROPERTIES = {
    itemId: 1,
    user: " ",
    season: " ",
    occasion: " ",
    category: " ",
    color: " ",
    get itemDate() {
        return new Date()
      },
    image: " ",
}

class Item {
    constructor(
        { itemId,
          user,
          season,
          occasion,
          category,
          color,
          itemDate,
          image
        } = {} ) {
          this.itemId = itemId || DEFAULT_PROPERTIES.itemId;
          this.user =  user || DEFAULT_PROPERTIES.user;
          this.season =  season || DEFAULT_PROPERTIES.season;
          this.occasion = occasion || DEFAULT_PROPERTIES.occasion;
          this.category = category || DEFAULT_PROPERTIES.category;
          this.color = color || DEFAULT_PROPERTIES.color;
          this.itemDate = itemDate || DEFAULT_PROPERTIES.itemDate;
          this.image = image  || DEFAULT_PROPERTIES.image;

    }
}

module.exports = Item;