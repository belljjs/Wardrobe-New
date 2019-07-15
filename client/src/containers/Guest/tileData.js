import itemInfoShot from './asset/itemInfoShot.png';
import deleteShot from './asset/deleteShot.png';
import closetSelectedShot from './asset/closetSelectedShot.png';
import weatherShot from './asset/weatherShot.png';
import outfitShot from './asset/outfitShot.png';

 const tileData = [
   {img: weatherShot,
        title: 'Check Weather',
        description: 'First check weather. You can use current location or select one from your history. Also, you may add a new location.'
   },
   {img: itemInfoShot,
        title: 'Add Item',
        description: 'Add your new items from the image file on your menmory.'
    },
    {img: deleteShot,
        title: 'Delete Item',
        description: 'Select an item to delete it and confirm deleting.'
        },
    {img: closetSelectedShot,
        title: 'Select items in closet',
        description: 'Select items to build an outfit. Then they are collected in the lower stack. ',
    },
    {img: outfitShot,
        title: 'List outfit ',
        description: 'Check the history of your outfit. You may delete some. ',
    },
    ];

 export default tileData;