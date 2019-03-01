const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const Item = require('../models/item');

const router = express.Router();

const s3 = new aws.S3({
	accessKeyId: 'AKIAJUVT3E7RB656TCKQ',
	secretAccessKey: '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',
	Bucket: 'wardrobe-belljjs'
});

// insert newItem to items table 

const imageUpload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'wardrobe-belljjs',
        acl: 'public-read',
        // key is to be used as filename
		key: function (req, file, cb) {
			cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
		}
	}),
	limits:{ fileSize: 2000000 }, // 2000000 bytes(2MB)
	fileFilter: function(req, file, cb){
		checkFileType(file, cb);
	}
}).single('itemImage');

checkFileType = (file, cb) => {
	const filetypes = /jpeg|jpg|png|gif/;
	const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
	const mimetype = filetypes.test( file.mimetype );
	if( mimetype && extname ){
		return cb( null, true );
	} else {
		cb( 'Error: Images Only!' );
	}
}

router.post( '/imageUpload', ( req, res ) => {
	imageUpload( req, res, ( error ) => {
		console.log( 'req.file', req.file );
		if( error ){
			console.log( 'errors', error );
			res.json( { error: error } );  
		} else {
			// If file not found
			if( req.file === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {
				// Success
				res.json( {
					image: req.file.key,
					location: req.file.location
				} );
			}
		}
	});
});

// router.get('/getImage/:imageId',  (req, res, next)=> {
//     var params = { 	
// 			Bucket: 'wardrobe-belljjs', 
// 			Key: req.params.imageId 
// 		};
//     s3.getObject(params, function(err, data) {
// 		if (err) {
// 			console.log(err, err.stack); // an error occurred
// 		} else {
// 			console.log(data);           // successful response
// 			res.writeHead(200, {'Content-Type': 'image/jpeg'});
// 			res.write(data.Body, 'binary');
// 			res.end(null, 'binary');
// 		} 
//     });
// });

router.post( '/newItem', ( req, res ) => {
	const item = req.body.item;
    Item.insert(item, (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json(result)
    })
})

router.get('/itemsAll', (req,res) => {
    Item.retrieveALL((err, result) => {
        if (err) {
			console.log( "---- error in Item.retrieveALL((err, res)")
            return res.json(err);
		} else {
			console.log("+++++ result in Item.retrieveALL((err, res)" ,result)
			return res.json(result)
		}
    })
})
module.exports = router;


