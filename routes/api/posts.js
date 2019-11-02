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

//@route    DELETE Post by Post id posts/post_id
//@desc     Delete Post by Post Id
//@access   Private
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
//End Delete Post

//@route    PUT api/posts/like/:id
//@desc     Like a post
//@access   Private
router.put('/like/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		//check if post had already been liked
		if (
			post.likes.filter(like => like.user.toString() === req.user.id).length > 0
		) {
			return res.status(400).json({ msg: 'Post already liked' });
		}
		post.likes.unshift({ user: req.user.id });

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});

//END Like Post

//@route    PUT api/posts/like/:id
//@desc     Unlike a post
//@access   Private
router.put('/unlike/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		//check if post had already been liked
		if (
			post.likes.filter(like => like.user.toString() === req.user.id).length ===
			0
		) {
			return res.status(400).json({ msg: 'Post has not yet liked' });
		}
		//post.likes.unshift({ user: req.user.id });

		const removeIndex = post.likes
			.map(like => like.user.toString())
			.indexOf(req.user.id);

		post.likes.splice(removeIndex, 1);

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});

//END Unlike Post

//@route    POST api/posts/comment/:post_id
//@desc     Post a comment on a post
//@access   Private
router.post(
	'/comment/:post_id',
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
			const post = await Post.findById(req.params.post_id);

			const newComment = {
				text: req.body.text,
				user: req.user.id,
				name: user.name,
				avatar: user.avatar
			};

			post.comments.unshift(newComment);

			await post.save();

			res.json(post);
		} catch (err) {
			console.error(err.message);
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ msg: 'Post not found' });
			}
			res.status(500).send('Server Error');
		}
	}
);
//End Add Comment to a post

//@route    DELETE api/posts/comment/:post_id/:comment_id
//@desc     DELETE a comment on a post
//@access   Private

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		const comment = post.comments.find(
			comment => comment.id === req.params.comment_id
		);

		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		const removeIndex = post.comments
			.map(comment => comment.id.toString())
			.indexOf(req.param.comment_id);

		post.comments.splice(removeIndex, 1);

		await post.save();

		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Route does not exist' });
		}
		res.status(500).send('Server Error');
	}
});

//END Delete Comment from post

//@route    PUT api/posts/comment/:post_id/:comment_id
//@desc     Edit a comment on a post
//@access   Private

router.put(
	'/comment/:post_id/:comment_id',
	[
		auth,
		check('text', 'Text is Required')
			.not()
			.isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const post = await Post.findById(req.params.post_id);

			if (!post) {
				return res.status(404).json({ msg: 'Post not found' });
			}

			const comment = post.comments.find(
				comment => comment.id === req.params.comment_id
			);

			if (!comment) {
				return res.status(404).json({ msg: 'Comment does not exist' });
			}

			if (comment.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: 'User not authorized' });
			}

			const removeIndex = post.comments
				.map(comment => comment.id.toString())
				.indexOf(req.param.comment_id);

			post.comments.splice(removeIndex, 1);

			await post.save();

			res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ msg: 'Route does not exist' });
			}
			res.status(500).send('Server Error');
		}
	}
);

//END Delete Comment from post

module.exports = router;
