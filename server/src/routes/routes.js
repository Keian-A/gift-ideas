'use strict';

const Member = require('../models/Family.js');

const routes = {};

routes.getMembers = async function (req, res) {
    try {
        let familyData = await Member.find({});
        res.send(familyData);
    } catch {
        res.status(500).send('Server error.');
    }
}

routes.createMember = async function (req, res) {
    try {
        let result = await Member.create(req.body);
        res.status(200).send(result);
    } catch {
        res.status(500).send('Server error.')
    }
}

routes.addGift = async function (req, res) {
    try {
        if (req.body.id) {
            let familyMember = await Member.findById(req.body.id);
            let temp = {
                giftName: req.body.giftName,
                link: req.body.link,
                bought: false
            }
            familyMember.gifts.push(temp);
            await familyMember.save();
            res.status(200).send('Success');
        } else {
            res.status(500).send('Server error.');
        }
    } catch {
        res.status(500).send('Server error.');
    }
}

routes.removeGift = async function (req, res) {
    try {
        let familyMember = await Member.findById(req.body.id);
        familyMember.gifts = familyMember.gifts.filter(gift => gift.giftName !== req.body.giftName);
        await familyMember.save();
        res.status(204).send('Resource deleted successfully.');
    } catch {
        res.status(500).send('Server error.');
    }
}

module.exports = routes;
