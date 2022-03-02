const express = require('express');
const router = express.Router();
const Member = require('../model/memberModel');
const multer = require('multer');

// SET STORAGE
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './upload/');
	},
	filename: function (req, file, cb) {
		cb(null, 'masud-' + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
// GET ALL THE POSTS
router.get('/', async (req, res) => {
	// res.send('we are on members');
	try {
		const { page = 1, limit = 10 } = req.query;
		const member = await Member.find()
			.limit(limit * 1)
			.skip((page - 1) * limit);
		res.json(member);
	} catch (error) {
		res.json({ message: error });
	}
});

// ADD THE USER
router.post('/', upload.single('profilePic'), async (req, res) => {
	const member = new Member({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		gender: req.body.gender,
		email: req.body.email,
		phone: req.body.phone,
		dob: req.body.dob,
		profilePic: req.file.path,
	});
	try {
		const saveMember = await member.save();
		res.json(saveMember);
	} catch (error) {
		res.json({ message: error });
	}
});

// GET SINGLE MEMBER
router.get('/:memberId', async (req, res) => {
	console.log(req.params.memberId);
	try {
		const singleMember = await Member.findById(req.params.memberId);
		res.json(singleMember);
	} catch (error) {
		res.json({ message: error });
	}
});

// DELETE A SPECIFIC MEMBER
router.delete('/:memberId', async (req, res) => {
	try {
		const deleteMember = await Member.remove({ _id: req.params.memberId });
		res.json(deleteMember);
	} catch (error) {
		res.json({ message: error });
	}
});

// UPDATE MEMBER INFO

router.patch('/:memberId', async (req, res) => {
	try {
		const updateMember = await Member.updateOne(
			{ _id: req.params.memberId },
			{
				$set: {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					gender: req.body.gender,
					email: req.body.email,
					phone: req.body.phone,
					dob: req.body.dob,
				},
			}
		);
		res.json(updateMember);
	} catch (error) {
		res.json({ message: error });
	}
});

module.exports = router;
