/** @format */

module.exports = paginate;

function paginate(model) {
	return async (req, res, next) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		var filter = {};
		var sorted = {};

		// console.log(req.body.filter.bookname);

		if (req.body.filter) {
					var bookname = req.body.filter.bookname
						? req.body.filter.bookname
						: "$^";
					var category = req.body.filter.category
						? req.body.filter.category
						: "$^";
					var author = req.body.filter.author ? req.body.filter.author : "$^";
					var year = req.body.filter.year ? req.body.filter.year : "$^";
			filter = {
				$or: [
					{ bookname: { $regex: bookname } },
					{ category: { $regex: category } },
					{ author: { $regex: author } },
					{ publication_year :{$regex: year}},
				],
			};
		}
		console.log(filter);
		if (req.body.sorted) {
			sorted = req.body.sorted;
		}
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const result = {};

		if (endIndex < (await model.countDocuments().exec())) {
			result.next = {
				page: page + 1,
				limit: limit,
			};
		}

		if (startIndex > 0) {
			result.previous = {
				page: page - 1,
				limit: limit,
			};
		}
		try {
			result.results = await model
				.find(filter)
				.sort(sorted)
				.limit(limit)
				.skip(startIndex);
			res.paginatedResult = result;
			next();
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	};
}
