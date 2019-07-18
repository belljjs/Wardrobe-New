// get the userID from request.
// retrieve all the items, outfits, cities.
// create new items, outfits, cities with new userId.
// use insert all.

const db = require('../../database');
const express = require('express');
const Cities = require('../models/cities');
const Outfit = require('../models/outfit');
const Item = require('../models/item');
const router = express.Router();

const guest = async (req, res) => {
    const userId = req.query.userId;
    const itemMapping = {};
    const outfitMapping = {};

     // Copy cities.
     try{
        const cities = await db.any(`SELECT * FROM cities WHERE user_id = 2 `)
        for (let i = 0; i < cities.length; i++){
            const oldCity= {...cities[i]};  // copy object
            console.log("oldCity.id: ",oldCity.id,", oldCity.city_name: ",oldCity.city_name);  
            try{
                let insertedCity = await db.query(`INSERT INTO cities 
                    (city_name, user_id)               
                    VALUES ($1, $2) RETURNING id`,
                    [
                        oldCity.city_name,
                        userId
                    ])
                console.log("** inserted city ",insertedCity);
                // res.json(insertedCity);
            }
            catch( error){
                console.log("** Error on insert cities:",error);
            }
        } 
    }   
    catch(error){
        console.log("citiesError :", error)
    }  
    // Copy items.
    try{
        const items = await db.any(`SELECT * FROM items WHERE user_id = 2 `)

        for (let i = 0; i < items.length; i++){
            const oldItem = {...items[i]};  // copy object
            console.log("oldItem.id",oldItem.id);   // print old item id
            itemMapping[oldItem.id] = 0;  //fill the key value with old item id

            try{
                let insertedItem = await db.query(`INSERT INTO items 
                    (user_id, category, color, season, occasion,  image_key, image_location)               
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
                    [
                        userId, 
                        oldItem.category,
                        oldItem.color, 
                        oldItem.season, 
                        oldItem.occasion, 
                        oldItem.image_key, 
                        oldItem.image_location
                    ])
                console.log("** inserted item ", insertedItem[0]);
                itemMapping[oldItem.id] = insertedItem[0].id;
                console.log("------ itemMap:", itemMapping);
            }
            catch( error){
                console.log("** Error on old item:",error);
            }
    
        } 
    }   
    catch(error){
        console.log("ItemError :", error)
    }  


    // Copy outfits.
    try{
        const outfits = await db.any(`SELECT * FROM outfits WHERE user_id = 2 `)
        console.log("&&& Outfits: ", outfits);
        for (let i = 0; i < outfits.length; i++){
            console.log("old outfit : ", outfits[i])
            const oldOutfit = {...outfits[i]};  // copy an outfit object
            outfitMapping[oldOutfit.id] = 0;
            try{
                let insertedOutfit = await db.one(`INSERT INTO outfits 
                (user_id, weather_name, weather_icon, high_temp, low_temp )
                VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                [
                    userId,
                    oldOutfit.weather_name,
                    oldOutfit.weather_icon,
                    oldOutfit.high_temp,
                    oldOutfit.low_temp
                ])
                console.log("** inserted outfit ", insertedOutfit);
                outfitMapping[oldOutfit.id] = insertedOutfit.id;
                console.log("------ outfitMappin:", outfitMapping);
            }
            catch(error){
                console.log("outfit insert error", error);
            }
        }   
    }
    catch(error) {
        console.log("outfits select error");
    }
    
    // Copy outfit_items
    const oldOutfitIds = Object.keys(outfitMapping)  // old outfit ids
    console.log("oldOutfitIds:",oldOutfitIds);
    for (let i = 0; i < oldOutfitIds.length; i++){  
        console.log("oldOufitIds[i]:", oldOutfitIds[i]);
        let oldOutfitId = oldOutfitIds[i]
        console.log("outfitMapping:" ,outfitMapping);
        const newOutfitId = outfitMapping[oldOutfitId]  // new outfit ids
        console.log("newOufitId:", newOutfitId);
        try{
            let data = await db.any(
                `SELECT * FROM outfit_items WHERE outfit_id = $1`
                ,[oldOutfitIds[i]])
            console.log(" selected outfit-items : ", data);  
            for (let j = 0; j < data.length; j++){
                console.log("++++++++++ outfit ", data[j].outfit_id, " +++++++++++");
            
                let oldItemId = data[j].item_id;   
                let newItemId = itemMapping[oldItemId]  
                try{
                    let insertedOutfitItem = await db.one(`INSERT INTO outfit_items 
                    (outfit_id,item_id)
                    VALUES ($1, $2) RETURNING item_id `,
                    [
                        newOutfitId,   
                        newItemId     
                    ])
                    console.log("** inserted outfit_item ", insertedOutfitItem);
                }
                catch(error){
                    console.log("outfit_items insert error", error);
                }
            }
        }      
        catch(e) {
            console.log(e.message);
        }
    } 
    
   
}

module.exports = guest;