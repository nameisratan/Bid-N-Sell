const express = require('express');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const fileupload = require('express-fileupload'); 
const ItemModel = require('../models/items');
router.use(fileupload({useTempFiles: true}))

require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
});

router.post('/', async (req, res) => {
    // console.log(req.body.general_info);
    // console.log(req);
    const general_info_json = JSON.parse(req.body.general_info);
    const general_info = req.body.general_info;
    // console.log(69, general_info_json);
    // console.log(general_info_json.name);
    const upload_v = req.body.upload_present;
    // console.log(upload_v);
    const no_of_files = req.body.no_of_files;
    // general_info.forEach(gen => {
    //     console.log(gen.name);
    // })

    // const ;

    //console.log(no_of_files);
    const urls = [];
    // console.log(files);
    general_info_json["imageURL"] = [];
    general_info_json["bids"] = [];
    var idx = 0;
    if (no_of_files > 0) {
        if (no_of_files == 1) {
            //.log(req.files.file);
            const file = req.files.file;
            try {
                //console.log(file);
                const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
                general_info_json["imageURL"].push(uploadResult.secure_url);
                const item = new ItemModel(general_info_json);
                item.save();
                res.send({
                    data: "success"
                });
                //console.log(general_info_json);
            } catch (error) {
                //console.log('Error uploading image:', error);
                const item = new ItemModel(general_info_json);
                item.save();
                res.send({
                    data: "success"
                });
            }
        }
        else{
            const files = req.files.file;
            files.forEach(async (file)=>
            {
            try {
                // const file = req.files.file;
                const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
                // urls.push(uploadResult.secure_url);
                general_info_json["imageURL"].push(uploadResult.secure_url);
                // console.log(uploadResult.secure_url);
                // res.json({ url: uploadResult.secure_url });
                idx++;
                if(idx == no_of_files) 
                {
                    const item = new ItemModel(general_info_json);
                    item.save();
                   // console.log(general_info_json);
                    res.send({
                        data: "success",
                        message: "Item Added Successfully"
                    });
                }
            } catch (error) {
                
                //console.log('Error uploading image:', error);
                // res.status(500).json({ error: 'Image upload failed' });
                idx++;
                if(idx == no_of_files) 
                {
                    const item = new ItemModel(general_info_json);
                    item.save();
                    //console.log(general_info_json);
                    res.send({
                        data: success,
                        message: "Item Added Successfully"
                    });
                }
            }
            // console.log(general_info_json["imageURL"]);

            })
        }
    }
    else{
        const item = new ItemModel(general_info_json);
        item.save();
        res.send({
            data: "success",
            message: "Item Added Successfully"
        });
    }
    // res.json({url: urls});
});

router.put('/', async (req, res) => {
    //console.log("PUT CALLEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
    //console.log(req.body);
    // console.log(req.files.file);
    const general_info_json = JSON.parse(req.body.general_info);
    const general_info = req.body.general_info;
    // console.log(69, general_info_json);
    // console.log(general_info_json.name);
    const upload_v = req.body.upload_present;
    // console.log(upload_v);
    const no_of_files = req.body.no_of_files;
    //console.log(general_info_json.id);
    
    await ItemModel.findById(general_info_json.id).then( async obtItem=>{
        obtItem['name'] = general_info_json['name'];
        obtItem['description'] = general_info_json['description'];
        obtItem['category'] = general_info_json['category'];
        obtItem['cost'] = general_info_json['cost'];
        obtItem['buyYear'] = general_info_json['buyYear'];
        obtItem['warranty'] = general_info_json['warranty'];
        obtItem['showBids'] = general_info_json['showBids'];
        obtItem['age'] = general_info_json['age'];
        // obtItem['sold'] = false;
        var idx = 0;
        if (no_of_files > 0) {
            if (no_of_files == 1) {
               // console.log(req.files.file);
                const file = req.files.file;
                try {
                    //console.log(file);
                    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
                    obtItem["imageURL"].push(uploadResult.secure_url);
                    obtItem.save();
                    res.send({
                        data: "success",
                        message: "Product updated successfully"
                    })
                } catch (error) {
                    //console.log('Error uploading image:', error);
                    obtItem.save();
                    res.send({
                        data: "success",
                        message: "Product updated successfully"
                    })
                }
            }
            else{
                const files = req.files.file;
                files.forEach(async (file)=>
                {
                try {
                    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
                    obtItem["imageURL"].push(uploadResult.secure_url);
                    idx++;
                    if(idx == no_of_files) 
                    {
                        obtItem.save();
                        res.send({
                            data: "success",
                            message: "Product updated successfully"
                        })
                    }
                } catch (error) {
                    //console.log('Error uploading image:', error);
                    idx++;
                    if(idx == no_of_files) 
                    {
                        obtItem.save();
                        res.send({
                            data: "success",
                            message: "Product updated successfully"
                        })
                    }
                }
                // console.log(general_info_json["imageURL"]);
    
                })
            }
        }
        else{
            obtItem.save();
            res.send({
                data: "success",
                message: "Product updated successfully"
            })
        }
    }).catch(err => "not found");
    // // cnsole.log(100, req.user);
    // // console.log(req.body.imageFiles);
    // // console.log(req.body.imageFiles.files.file);
    // // console.log(req.image_files.files);
    // // console.log(req.body.general_info);
    // console.log(req);
    // const general_info_json = JSON.parse(req.body.general_info);
    // const general_info = req.body.general_info;
    // // console.log(69, general_info_json);
    // // console.log(general_info_json.name);
    // const upload_v = req.body.upload_present;
    // // console.log(upload_v);
    // const no_of_files = req.body.no_of_files;
    // // general_info.forEach(gen => {
    // //     console.log(gen.name);
    // // })

    // // const ;

    // console.log(no_of_files);
    // const urls = [];
    // // console.log(files);
    // general_info_json["imageURL"] = [];
    // general_info_json["bids"] = [];
    // var idx = 0;
    // if (no_of_files > 0) {
    //     if (no_of_files == 1) {
    //         console.log(req.files.file);
    //         const file = req.files.file;
    //         try {
    //             console.log(file);
    //             const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
    //             general_info_json["imageURL"].push(uploadResult.secure_url);
    //             const item = new ItemModel(general_info_json);
    //             item.save();
    //             res.send(general_info_json);
    //             console.log(general_info_json);
    //         } catch (error) {
    //             console.log('Error uploading image:', error);
    //             const item = new ItemModel(general_info_json);
    //             item.save();
    //             res.send(general_info_json);
    //             console.log(general_info_json);
    //         }
    //     }
    //     else{
    //         const files = req.files.file;
    //         files.forEach(async (file)=>
    //         {
    //         try {
    //             // const file = req.files.file;
    //             const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
    //             // urls.push(uploadResult.secure_url);
    //             general_info_json["imageURL"].push(uploadResult.secure_url);
    //             // console.log(uploadResult.secure_url);
    //             // res.json({ url: uploadResult.secure_url });
    //             idx++;
    //             if(idx == no_of_files) 
    //             {
    //                 const item = new ItemModel(general_info_json);
    //                 item.save();
    //                 console.log(general_info_json);
    //                 res.send({
    //                     data: success,
    //                     message: "Item Added Successfully"
    //                 });
    //             }
    //         } catch (error) {
    //             console.log('Error uploading image:', error);
    //             // res.status(500).json({ error: 'Image upload failed' });
    //             idx++;
    //             if(idx == no_of_files) 
    //             {
    //                 const item = new ItemModel(general_info_json);
    //                 item.save();
    //                 console.log(general_info_json);
    //                 res.send({
    //                     data: success,
    //                     message: "Item Added Successfully"
    //                 });
    //             }
    //         }
    //         // console.log(general_info_json["imageURL"]);

    //         })
    //     }
    // }
    // else{
    //     const item = new ItemModel(general_info_json);
    //     item.save();
    //     res.send({
    //         data: "success",
    //         message: "Item Added Successfully"
    //     });
    // }
    // // res.json({url: urls});
});


module.exports = router;