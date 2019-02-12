
const DEFAULT_PROPERTIES = {
    itemId: undefined,
    season: undefined,
    occasion: undefined,
    category: undefined,
    color: undefined,
    get itemDate() {
        return new Date()
      },
    image: undefined,
}

class Item {
    constructor(
        { itemId,
          season,
          occasion,
          category,
          color,
          itemDate,
          image
        } ={} ) {
          this.itemId = itemId || DEFAULT_PROPERTIES.itemId;
          this.season =  season || DEFAULT_PROPERTIES.season;
          this.occasion = occasion || DEFAULT_PROPERTIES.occasion;
          this.category = category || DEFAULT_PROPERTIES.category;
          this.color = color || DEFAULT_PROPERTIES.color;
          this.itemDate = itemDate || DEFAULT_PROPERTIES.itemDate;
          this.image = image  || DEFAULT_PROPERTIES.image;

    }
}

module.exports = Item;