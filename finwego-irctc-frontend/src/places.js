import * as R from 'ramda';
import { generatePath } from 'react-router-dom';

import { kebabCase } from 'lodash';

function makePlace(path, validate = () => null) {
	const place = { spec: path };
	place.to = (opts = {}) => {
		const { params, ...location } = opts;
		const pathname = generatePath(path, params);
		console.assert(pathname, `Was unable to perform reverse lookup for '${place.spec}'.`);
		validate(params, location);
		return R.merge({ pathname }, location);
	};
	place.path = place.spec;
	return place;
}

function nest(parent, name, path = '', validate = () => null) {
	const reservedNames = ['to', 'path', 'spec', 'reverse', 'match', 'ast'];
	console.assert(!R.contains(name, reservedNames), `Cannot use reserved name '${name}'`);

	if (!path) {
		path = `${kebabCase(name)}/`;
	}

	const child = makePlace(`${parent.spec}${path}`, validate);
	parent[name] = child;

	return child;
}

const index = makePlace(`/`);

nest(index, 'home');

export default {
	index
};
