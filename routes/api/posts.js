const express = require('express');
// const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');

//@route    Post api/posts
//@desc     Create a User Posts
//@access   Private
router.post(
	'/',
	[
		auth,
		[
			check('text', 'Text is Required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			});

			const post = await newPost.save();

			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);
//End Add User Posts

//@route    PUT api/posts/post_id
//@desc     Edit a User Posts
//@access   Private
router.put(
	'/:post_id',
	[
		auth,
		[
			check('text', 'Text is Required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			// const user = await User.findById(req.user.id).select('-password');
			// const post = await Post.findById(req.params.post_id);

			post = await Post.findByIdAndUpdate(
				req.params.post_id,
				{ $set: req.body },
				{ new: true }
			);

			return res.json(post);
		} catch (err) {
			console.error(err.message);
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ msg: 'Post not Found' });
			}
			res.status(500).send('Server Error');
		}
	}
);
//END UPDATE User Post

//@route    Get All api/posts
//@desc     Get all User Posts
//@access   Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//End Get All posts

//@route    Get Post by Id api/posts/post_id
//@desc     Get a User Posts by Id
//@access   Private
router.get('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not Found' });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not Found' });
		}

		res.status(500).send('Server Error');
	}
});

//End Get posts by post id

//@route    Get Post by User Id api/posts/user/user_id
//@desc     Get a User Posts by User Id
//@access   Private
router.get('/user/:user_id', auth, async (req, res) => {
	try {
		const posts = await Post.find({ user: req.params.user_id }).sort({
			date: -1
		});

		if (!posts.length) {
			return res.status(404).json({ msg: 'No Post/s found for this user' });
		}

		res.json(posts);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'No Post/s found for this user' });
		}

		res.status(500).send('Server Error');
	}
});
//End Get posts by User id

router.delete('/:post_id', auth, async (req, res) => {
	try {
		//TODO Delete posts from user
		const post = await Post.findById(req.params.post_id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await post.remove();

		res.json({ msg: 'Post Deleted!' });
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});

module.exports = router;
